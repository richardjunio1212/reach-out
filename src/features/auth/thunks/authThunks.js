import { auth, db } from '@/config/firebaseConfig';
import { formatFirebaseAuthError } from '@/utils/formatError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        throw new Error(
          'Your email is not verified. A verification email has been sent to your inbox.',
        );
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists())
        throw new Error('User profile not found in Firestore.');

      const userData = userDoc.data();

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...userData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const registerStudent = createAsyncThunk(
  'auth/registerStudent',
  async (
    { email, password, firstName, lastName, contactNumber, studentNumber },
    thunkAPI,
  ) => {
    try {
      const displayName = `${firstName} ${lastName}`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'student',
        studentNumber,
        firstName,
        lastName,
        email,
        contactNumber,
      });

      return {
        uid: user.uid,
        email,
        displayName,
        studentNumber,
        firstName,
        lastName,
        contactNumber,
        role: 'student',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const registerTeacher = createAsyncThunk(
  'auth/registerTeacher',
  async ({ email, password, firstName, lastName, contactNumber }, thunkAPI) => {
    try {
      const displayName = `${firstName} ${lastName}`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'teacher',
        firstName,
        lastName,
        email,
        contactNumber,
      });

      return {
        uid: user.uid,
        email,
        displayName,
        firstName,
        lastName,
        contactNumber,
        role: 'teacher',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const registerCounselor = createAsyncThunk(
  'auth/registerCounselor',
  async ({ email, password, firstName, lastName, contactNumber }, thunkAPI) => {
    try {
      const displayName = `${firstName} ${lastName}`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'counselor',
        firstName,
        lastName,
        email,
        contactNumber,
      });

      return {
        uid: user.uid,
        email,
        displayName,
        firstName,
        lastName,
        contactNumber,
        role: 'counselor',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const editStudent = createAsyncThunk(
  'auth/editStudent',
  async ({ firstName, lastName, contactNumber, studentNumber }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'student',
        studentNumber,
        firstName,
        lastName,
        email: user.email,
        contactNumber,
      });

      return {
        uid: user.uid,
        displayName,
        studentNumber,
        firstName,
        lastName,
        contactNumber,
        role: 'student',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const editTeacher = createAsyncThunk(
  'auth/editTeacher',
  async ({ firstName, lastName, contactNumber }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'teacher',
        firstName,
        lastName,
        email: user.email,
        contactNumber,
      });

      return {
        uid: user.uid,
        displayName,
        firstName,
        lastName,
        contactNumber,
        role: 'teacher',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const editCounselor = createAsyncThunk(
  'auth/editCounselor',
  async ({ firstName, lastName, contactNumber }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        role: 'counselor',
        firstName,
        lastName,
        email: user.email,
        contactNumber,
      });

      return {
        uid: user.uid,
        displayName,
        firstName,
        lastName,
        contactNumber,
        role: 'counselor',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user is currently logged in.');

      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error('User not found in the database.');
      }

      const userData = userDocSnap.data();

      return {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        ...userData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, thunkAPI) => {
    try {
      if (!email) {
        throw new Error(
          'An email address is required to send the password reset link.',
        );
      }

      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(formatFirebaseAuthError(error.message));
    }
  },
);

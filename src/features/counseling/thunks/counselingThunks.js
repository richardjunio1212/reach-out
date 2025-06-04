import { auth, db } from '@/config/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
} from 'firebase/firestore';

export const createCounseling = createAsyncThunk(
  'counseling/createCounseling',
  async ({ studentId, remarks }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const now = Timestamp.now();

      const docRef = await addDoc(collection(db, 'counselings'), {
        studentId,
        remarks,
        status: 'Pending',
        createdAt: now,
        updatedAt: now,
        createdBy: user.uid,
        updatedBy: user.uid,
      });

      return {
        id: docRef.id,
        studentId,
        remarks,
        status: 'Pending',
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
        createdBy: user.uid,
        updatedBy: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCounselingsByTeacher = createAsyncThunk(
  'counseling/fetchCounselingsByTeacher',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const q = query(
        collection(db, 'counselings'),
        where('createdBy', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);

      const data = [];

      for (const docSnap of querySnapshot.docs) {
        const referralData = docSnap.data();
        const studentId = referralData.studentId;

        let studentName = 'Unknown';
        let studentNumber = 'Unknown';

        if (studentId) {
          const studentRef = doc(db, 'users', studentId);
          const studentDoc = await getDoc(studentRef);
          if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            if (studentData.role === 'student') {
              studentName = `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim();
              studentNumber = studentData.studentNumber || 'N/A';
            }
          }
        }

        data.push({
          id: docSnap.id,
          ...referralData,
          studentName,
          studentNumber,
          createdAt: referralData.createdAt.toDate(),
          updatedAt: referralData.updatedAt.toDate(),
        });
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCounseling = createAsyncThunk(
  'counseling/updateCounseling',
  async ({ id, updates }, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user found.');

      const now = Timestamp.now();
      await updateDoc(doc(db, 'counselings', id), {
        ...updates,
        updatedAt: now,
        updatedBy: user.uid,
      });

      return { id, ...updates, updatedAt: now.toDate(), updatedBy: user.uid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

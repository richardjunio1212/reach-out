import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '@/config/firebaseConfig';
import { setUserFromStorage } from '@/features/auth/authSlice';
import { doc, getDoc } from 'firebase/firestore';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const publicPaths = ['/', '/register'];

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const isPublicPath = publicPaths.includes(pathname);

      if (!user) {
        dispatch(setUserFromStorage(null));
        if (!isPublicPath) navigate('/');
        return;
      }

      if (!user.emailVerified) {
        dispatch(setUserFromStorage(null));
        if (!isPublicPath) navigate('/');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          dispatch(setUserFromStorage(null));
          if (!isPublicPath) navigate('/');
          return;
        }

        const userData = userDoc.data();
        dispatch(
          setUserFromStorage({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            studentNumber: userData?.studentNumber,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
            contactNumber: userData?.contactNumber,
            role: userData?.role,
          }),
        );

        // Prevent logged-in users from accessing login/register
        if (isPublicPath) {
          if (userData.role === 'student') {
            navigate('/student');
          } else if (userData.role === 'teacher') {
            navigate('/teacher');
          } else if (userData.role === 'counselor') {
            navigate('/counselor');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(setUserFromStorage(null));
        if (!isPublicPath) navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, pathname]);
};

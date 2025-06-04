import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export function useAvailableStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const usersRef = collection(db, 'users');
        const studentsQuery = query(usersRef, where('role', '==', 'student'));
        const studentsSnapshot = await getDocs(studentsQuery);

        const allStudents = studentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const counselingRef = collection(db, 'counselings');
        const pendingCounselingQuery = query(
          counselingRef,
          where('status', '==', 'Pending'),
        );
        const counselingSnapshot = await getDocs(pendingCounselingQuery);

        const pendingStudentIds = new Set(
          counselingSnapshot.docs.map((doc) => doc.data().studentId),
        );

        const availableStudents = allStudents.filter(
          (student) => !pendingStudentIds.has(student.id),
        );

        setStudents(availableStudents);
      } catch (error) {
        console.error('Error fetching available students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableStudents();
  }, []);

  return { students, loading };
}

import { createBrowserRouter } from 'react-router-dom';
import StudentLayout from '@/components/layouts/StudentLayout';
import TeacherLayout from '@/components/layouts/TeacherLayout';
import CounselorLayout from '@/components/layouts/CounselorLayout';
import PageNotFound from '@/pages/PageNotFound';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StudentDashboardPage from '@/pages/student/StudentDashboardPage';
import TeacherDashboardPage from '@/pages/teacher/TeacherDashboardPage';
import CounselorDashboardPage from '@/pages/counselor/CounselorDashboardPage';
import StudentSettingPage from '@/pages/student/StudentSettingPage';
import TeacherSettingPage from '@/pages/teacher/TeacherSettingPage';
import CounselorSettingPage from '@/pages/counselor/CounselorSettingPage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import TeacherCreateReferralPage from '@/pages/teacher/TeacherCreateReferralPage';
import TeacherReferralHistoryPage from '@/pages/teacher/TeacherReferralHistoryPage';

const AppRouter = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/student',
    element: <StudentLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StudentDashboardPage />,
      },
      {
        path: 'settings',
        element: <StudentSettingPage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: '/teacher',
    element: <TeacherLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TeacherDashboardPage />,
      },
      {
        path: 'create-referral',
        element: <TeacherCreateReferralPage />,
      },
      {
        path: 'referral-history',
        element: <TeacherReferralHistoryPage />,
      },
      {
        path: 'settings',
        element: <TeacherSettingPage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: '/counselor',
    element: <CounselorLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CounselorDashboardPage />,
      },
      {
        path: 'settings',
        element: <CounselorSettingPage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
    ],
  },
]);

export { AppRouter };

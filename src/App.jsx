import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './context/ThemeProvider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';
import { fetchCurrentUser } from './features/auth/thunks/authThunks';
import LoadingPage from './pages/LoadingPage';

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchCurrentUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {loading ? (
        <LoadingPage />
      ) : (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={AppRouter} />
        </ThemeProvider>
      )}
    </>
  );
}

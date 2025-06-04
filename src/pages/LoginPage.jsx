import LoginForm from '@/features/auth/components/LoginForm';
import { useAuthInit } from '@/hooks/useAuthInit';

export default function LoginPage() {
  useAuthInit();

  return (
    <div className="relative container min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col items-center justify-center p-10 lg:flex">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginForm />
        </div>
      </div>

      <div className="from-primary/90 to-primary/100 relative hidden h-full flex-col bg-gradient-to-br p-10 lg:flex">
        <div className="from-primary/10 to-primary/30 absolute inset-0 bg-gradient-to-br via-transparent" />
      </div>
    </div>
  );
}

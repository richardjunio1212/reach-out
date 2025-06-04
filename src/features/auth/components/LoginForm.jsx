import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loginSchema } from '../utils/authFormSchema';
import { forgotPassword, loginUser } from '../thunks/authThunks';
import { toast } from 'sonner';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      toast.success('Login Successfully');
    } catch (err) {
      toast.error(err || 'Login failed. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    const forgotEmail = form.getValues('email');

    if (!forgotEmail) {
      toast.error('Please enter your email address to reset your password.');
      return;
    }

    try {
      await dispatch(forgotPassword({ email: forgotEmail })).unwrap();

      toast.success('Password reset email sent! Please check your inbox.');
    } catch (err) {
      toast.error(err || 'Forgot Password failed. Please try again.');
    }
  };
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Login to continue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 text-right">
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {error && <p className="mt-2 text-center text-red-600">{error}</p>}

            <p className="text-center">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-blue-600">
                Click here
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

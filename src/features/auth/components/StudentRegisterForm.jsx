import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { studentRegisterSchema } from '../utils/authFormSchema';
import { registerStudent } from '../thunks/authThunks';
import { toast } from 'sonner';

export default function StudentRegisterForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(studentRegisterSchema),
    defaultValues: {
      studentNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const {
        studentNumber,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
      } = values;

      await dispatch(
        registerStudent({
          studentNumber,
          firstName,
          lastName,
          email,
          contactNumber,
          password,
        }),
      ).unwrap();

      toast.success('Registration successful!');
      form.reset();
    } catch (err) {
      toast.error(err || 'Registration failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Student Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {[
              ['studentNumber', 'Student Number'],
              ['firstName', 'First Name'],
              ['lastName', 'Last Name'],
              ['email', 'Email'],
              ['contactNumber', 'Contact Number'],
              ['password', 'Password'],
              ['confirmPassword', 'Confirm Password'],
            ].map(([name, label]) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        type={
                          name.includes('password')
                            ? 'password'
                            : name === 'email'
                              ? 'email'
                              : 'text'
                        }
                        placeholder={label}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            {error && <p className="mt-2 text-center text-red-600">{error}</p>}

            <p className="text-center">
              Already have an account?{' '}
              <Link to="/" className="text-blue-600">
                Click here
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

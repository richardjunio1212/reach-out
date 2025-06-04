import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
import { changePasswordSchema } from '../utils/authFormSchema';
import { changePassword } from '../thunks/authThunks';
import { toast } from 'sonner';

export default function ChangePasswordForm() {
const dispatch = useDispatch();
const { loading, error } = useSelector((state) => state.auth);

const form = useForm({
  resolver: zodResolver(changePasswordSchema),
  defaultValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
});

console.error(error)
const onSubmit = async (values) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = values;

    await dispatch(
      changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    ).unwrap();

    toast.success('Password updated successful!');
  } catch (err) {
    toast.error(err || 'Change Password failed. Please try again.');
  }
};

return (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-center text-2xl">Change Password</CardTitle>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {[
            ['currentPassword', 'Current Password'],
            ['newPassword', 'New Password'],
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
                    <Input type="text" placeholder={label} {...field} />
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
            {loading ? 'Saving...' : 'Save'}
          </Button>

          {error && <p className="mt-2 text-center text-red-600">{error}</p>}
        </form>
      </Form>
    </CardContent>
  </Card>
);
}

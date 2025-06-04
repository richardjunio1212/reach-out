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
import { studentEditSchema } from '../utils/authFormSchema';
import { editStudent } from '../thunks/authThunks';
import { toast } from 'sonner';

export default function StudentEditForm() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const form = useForm({
    resolver: zodResolver(studentEditSchema),
    defaultValues: {
      studentNumber: user?.studentNumber || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      contactNumber: user?.contactNumber || '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const { studentNumber, firstName, lastName, contactNumber } = values;

      await dispatch(
        editStudent({
          studentNumber,
          firstName,
          lastName,
          contactNumber,
        }),
      ).unwrap();

      toast.success('Student updated successful!');
    } catch (err) {
      toast.error(err || 'Edit Student failed. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Profile Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {[
              ['studentNumber', 'Student Number'],
              ['firstName', 'First Name'],
              ['lastName', 'Last Name'],
              ['contactNumber', 'Contact Number'],
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

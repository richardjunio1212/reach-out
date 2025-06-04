import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createCounselingSchema } from '../utils/counselinFormSchema';
import { createCounseling } from '../thunks/counselingThunks';
import { toast } from 'sonner';
import { useAvailableStudents } from '../hooks/useAvailableStudents';
import { Check, ChevronsUpDown } from 'lucide-react';

export default function CreateReferralForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.counseling);
  const { students, loading: studentsLoading } = useAvailableStudents();

  const form = useForm({
    resolver: zodResolver(createCounselingSchema),
    defaultValues: {
      studentId: '',
      remarks: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const { studentId, remarks } = values;

      await dispatch(
        createCounseling({
          studentId,
          remarks,
        }),
      ).unwrap();

      toast.success('Create Referral successful!');
      form.reset();
    } catch (err) {
      toast.error(err || 'Create Referral failed. Please try again.');
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Counseling Referral</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={studentsLoading}
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                            studentsLoading && 'cursor-not-allowed opacity-50',
                          )}
                        >
                          {studentsLoading
                            ? 'Loading students...'
                            : field.value
                              ? (() => {
                                  const student = students.find(
                                    (s) => s.id === field.value,
                                  );
                                  return student
                                    ? `${student.firstName} ${student.lastName} (${student.studentNumber})`
                                    : 'Select student';
                                })()
                              : 'Select student'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search student by name or student number..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No student found.</CommandEmpty>
                          <CommandGroup>
                            {students.map((student) => (
                              <CommandItem
                                value={`${student.firstName} ${student.lastName} ${student.studentNumber}`}
                                key={student.id}
                                onSelect={() => {
                                  form.setValue('studentId', student.id);
                                }}
                              >
                                {student.firstName} {student.lastName} (
                                {student.studentNumber})
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    student.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter remarks or reasons for counseling"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Submitting...' : 'Submit Referral'}
            </Button>

            {error && <p className="mt-2 text-center text-red-600">{error}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

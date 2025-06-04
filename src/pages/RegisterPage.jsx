import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StudentRegisterForm from '@/features/auth/components/StudentRegisterForm';
import TeacherRegisterForm from '@/features/auth/components/TeacherRegisterForm';
import CounselorRegisterForm from '@/features/auth/components/CounselorRegisterForm';
import { useAuthInit } from '@/hooks/useAuthInit';

export default function RegisterPage() {
  useAuthInit();
  return (
    <div className="relative container min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="from-primary/90 to-primary/100 relative hidden h-full flex-col bg-gradient-to-br p-10 lg:flex">
        <div className="from-primary/10 to-primary/30 absolute inset-0 bg-gradient-to-br via-transparent" />
      </div>

      <div className="relative h-full flex-col items-center justify-center p-10 lg:flex">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <div className="flex min-h-screen items-center justify-center p-4">
            <Tabs defaultValue="student" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="counselor">Counselor</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <StudentRegisterForm />
              </TabsContent>
              <TabsContent value="teacher">
                <TeacherRegisterForm />
              </TabsContent>
              <TabsContent value="counselor">
                <CounselorRegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

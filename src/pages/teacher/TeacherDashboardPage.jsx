import { Button } from '@/components/ui/button';
import TeacherReferralHistory from '@/features/counseling/components/teacher-referral-history/TeacherReferralHistory';
import { Link } from 'react-router-dom';

export default function TeacherDashboardPage() {
  return (
    <div>
      <div className='flex items-center justify-between gap-4'>
        <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>

        <Link to="/teacher/create-referral">
          <Button>Create Referral</Button>
        </Link>
      </div>
      <TeacherReferralHistory />
    </div>
  );
}

import CounselorEditForm from '@/features/auth/components/CounselorEditForm';
import { useAuthInit } from '@/hooks/useAuthInit';

export default function CounselorSettingPage() {
  useAuthInit();
  return (
    <div>
      <CounselorEditForm />
    </div>
  );
}

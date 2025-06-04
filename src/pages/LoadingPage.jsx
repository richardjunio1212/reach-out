import { LoaderCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function LoadingPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="flex items-center space-x-4 p-6 shadow-lg">
        <LoaderCircle className="text-primary h-6 w-6 animate-spin" />
        <CardContent className="text-muted-foreground p-0 text-sm">
          Loading, please wait...
        </CardContent>
      </Card>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-red-100 opacity-75"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white">
                404
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold">Page Not Found</h1>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" asChild>
            <Button>Go Home</Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="text-muted-foreground mt-8 text-sm">
        <p>Error code: 404 | Please check the URL and try again</p>
      </div>
    </div>
  );
}

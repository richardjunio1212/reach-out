import { useDispatch, useSelector } from 'react-redux';
import { useAuthInit } from '@/hooks/useAuthInit';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '../ui/button';
import { logoutUser } from '@/features/auth/thunks/authThunks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import ProfilePic from '@/assets/img/default/profile-pic.jpg';
import { ModeToggle } from '../ui/mode-toggle';

export default function CounselorLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useAuthInit();

  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    await dispatch(logoutUser());
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/counselor" className="flex items-center gap-2">
            <span className="font-semibold">Reach Out</span>
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={ProfilePic} alt={user?.name} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-col items-start">
                  <div className="text-muted-foreground text-xs">
                    {user?.email}
                  </div>
                </DropdownMenuItem>
                <Link to="/counselor/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    Settings
                  </Button>
                </Link>
                <Link to="/counselor/change-password">
                  <Button variant="ghost" className="w-full justify-start">
                    Change Password
                  </Button>
                </Link>
                <DropdownMenuItem>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

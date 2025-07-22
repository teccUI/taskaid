import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { logout, user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="font-bold text-xl">TaskAid</div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-9 w-9 p-0"
            >
              <User className="h-4 w-4" />
            </Button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-lg">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user?.email}
                </div>
                <hr className="my-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setShowDropdown(false);
                    toggleTheme();
                  }}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  Theme: {isDark ? 'Light' : 'Dark'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, User, LogOut, Settings, PlusCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-gradient-card border-b shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 transition-smooth hover:scale-105"
          >
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient-hero">
              SportScheduler
            </span>
          </Link>

          {/* Navigation items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="transition-smooth hover:bg-accent">
                Dashboard
              </Button>
            </Link>
            <Link to="/create-session">
              <Button variant="ghost" className="transition-smooth hover:bg-accent">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </Link>
            <Link to="/my-sessions">
              <Button variant="ghost" className="transition-smooth hover:bg-accent">
                My Sessions
              </Button>
            </Link>
            {user.isAdmin && (
              <>
                <Link to="/create-sport">
                  <Button variant="ghost" className="transition-smooth hover:bg-accent">
                    Create Sport
                  </Button>
                </Link>
                <Link to="/reports">
                  <Button variant="ghost" className="transition-smooth hover:bg-accent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Reports
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full transition-smooth hover:scale-105"
              >
                <Avatar className="h-10 w-10 shadow-soft">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 mt-2 bg-card shadow-card rounded-xl"
              align="end"
            >
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {user.isAdmin && (
                    <span className="text-xs bg-gradient-primary text-primary-foreground px-2 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="transition-smooth hover:bg-accent">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="transition-smooth hover:bg-accent">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-destructive transition-smooth hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
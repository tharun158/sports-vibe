import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, BarChart3, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-gradient-card/80 backdrop-blur-sm border-b shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient-hero">
                SportScheduler
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="transition-smooth hover:bg-accent">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-primary p-6 rounded-full shadow-hero">
                <Trophy className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-hero mb-6">
              Organize Sports Sessions
              <br />
              <span className="text-primary">Like Never Before</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Create, manage, and join sport sessions with ease. Connect with players in your area,
              organize teams, and keep track of all your sporting activities in one place.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link to="/signup">
                <Button className="btn-primary text-lg px-8 py-4 group">
                  Start Organizing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-4 transition-smooth hover:bg-accent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in">
            <div className="bg-gradient-card p-8 rounded-xl shadow-card card-hover">
              <div className="bg-gradient-primary p-3 rounded-full w-fit mb-4">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Create sport sessions with just a few clicks. Set dates, times, venues, and team requirements effortlessly.
              </p>
            </div>

            <div className="bg-gradient-card p-8 rounded-xl shadow-card card-hover">
              <div className="bg-gradient-secondary p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Player Management</h3>
              <p className="text-muted-foreground">
                Organize teams, track participants, and manage player slots with intelligent team balancing.
              </p>
            </div>

            <div className="bg-gradient-card p-8 rounded-xl shadow-card card-hover">
              <div className="bg-gradient-primary p-3 rounded-full w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics & Reports</h3>
              <p className="text-muted-foreground">
                Track session popularity, player engagement, and sport trends with comprehensive reporting.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 animate-bounce-in">
            <div className="bg-gradient-card p-12 rounded-2xl shadow-hero max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gradient-hero mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of sports enthusiasts who are already organizing amazing sessions.
              </p>
              <Link to="/signup">
                <Button className="btn-primary text-lg px-12 py-4">
                  Create Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SessionCard from "@/components/SessionCard";
import Navbar from "@/components/Navbar";
import { PlusCircle, Search, Filter, Trophy } from "lucide-react";

interface Session {
  id: string;
  title: string;
  sport: string;
  venue: string;
  datetime: string;
  teamA: string;
  teamB: string;
  slotsTotal: number;
  slotsFilled: number;
  status: 'active' | 'cancelled' | 'completed';
  cancelReason?: string;
  createdBy: string;
  isCreator: boolean;
  hasJoined: boolean;
}

// Mock data for demo
const mockSessions: Session[] = [
  {
    id: "1",
    title: "Friday Night Football",
    sport: "Football",
    venue: "Central Park Field A",
    datetime: "2024-01-26T19:00:00",
    teamA: "Red Team",
    teamB: "Blue Team",
    slotsTotal: 22,
    slotsFilled: 18,
    status: "active",
    createdBy: "Mike Johnson",
    isCreator: false,
    hasJoined: false
  },
  {
    id: "2",
    title: "Weekend Cricket Match",
    sport: "Cricket",
    venue: "Sports Complex Ground 1",
    datetime: "2024-01-27T14:00:00",
    teamA: "Eagles",
    teamB: "Lions",
    slotsTotal: 22,
    slotsFilled: 15,
    status: "active",
    createdBy: "Sarah Williams",
    isCreator: false,
    hasJoined: true
  },
  {
    id: "3",
    title: "Basketball Tournament",
    sport: "Basketball",
    venue: "Community Center Court",
    datetime: "2024-01-28T16:00:00",
    teamA: "Sharks",
    teamB: "Warriors",
    slotsTotal: 10,
    slotsFilled: 10,
    status: "active",
    createdBy: "John Doe",
    isCreator: true,
    hasJoined: false
  }
];

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>(mockSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: localStorage.getItem('token') === 'admin-token'
  };

  useEffect(() => {
    let filtered = sessions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.venue.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sport filter
    if (sportFilter !== "all") {
      filtered = filtered.filter(session => session.sport === sportFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "upcoming") {
        filtered = filtered.filter(session => 
          session.status === "active" && new Date(session.datetime) > new Date()
        );
      } else if (statusFilter === "past") {
        filtered = filtered.filter(session => 
          new Date(session.datetime) < new Date()
        );
      } else {
        filtered = filtered.filter(session => session.status === statusFilter);
      }
    }

    setFilteredSessions(filtered);
  }, [sessions, searchTerm, sportFilter, statusFilter]);

  const handleJoinSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, hasJoined: true, slotsFilled: session.slotsFilled + 1 }
        : session
    ));
  };

  const handleCancelSession = (sessionId: string, reason: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const, cancelReason: reason }
        : session
    ));
  };

  const sports = Array.from(new Set(sessions.map(s => s.sport)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-hero">
                Welcome back, {user.name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover and join exciting sport sessions in your area
              </p>
            </div>
            <Link to="/create-session">
              <Button className="btn-primary animate-bounce-in">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Session
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-gradient-card p-6 rounded-xl shadow-card animate-slide-in">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sessions, sports, or venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger className="w-full sm:w-48 transition-smooth">
                  <SelectValue placeholder="Filter by sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  {sports.map(sport => (
                    <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 transition-smooth">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => (
              <div 
                key={session.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in"
              >
                <SessionCard
                  session={session}
                  onJoin={handleJoinSession}
                  onCancel={handleCancelSession}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No sessions found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or create a new session
            </p>
            <Link to="/create-session">
              <Button className="btn-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Session
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in">
          <div className="bg-gradient-primary text-primary-foreground p-6 rounded-xl shadow-card">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold">
              {sessions.filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-gradient-secondary text-secondary-foreground p-6 rounded-xl shadow-card">
            <h3 className="text-lg font-semibold mb-2">Joined Sessions</h3>
            <p className="text-3xl font-bold">
              {sessions.filter(s => s.hasJoined).length}
            </p>
          </div>
          <div className="bg-gradient-card p-6 rounded-xl shadow-card border">
            <h3 className="text-lg font-semibold mb-2">Available Sports</h3>
            <p className="text-3xl font-bold text-primary">
              {sports.length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
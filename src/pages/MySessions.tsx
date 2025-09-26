import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SessionCard from "@/components/SessionCard";
import Navbar from "@/components/Navbar";
import { User, Users, Trophy, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

// Mock data
const mockCreatedSessions: Session[] = [
  {
    id: "3",
    title: "Basketball Tournament",
    sport: "Basketball",
    venue: "Community Center Court",
    datetime: "2024-01-28T16:00:00",
    teamA: "Sharks",
    teamB: "Warriors",
    slotsTotal: 10,
    slotsFilled: 8,
    status: "active",
    createdBy: "John Doe",
    isCreator: true,
    hasJoined: false
  },
  {
    id: "4",
    title: "Tennis Doubles Match",
    sport: "Tennis",
    venue: "City Tennis Courts",
    datetime: "2024-01-29T10:00:00",
    teamA: "Court Kings",
    teamB: "Net Ninjas",
    slotsTotal: 4,
    slotsFilled: 4,
    status: "active",
    createdBy: "John Doe",
    isCreator: true,
    hasJoined: false
  },
  {
    id: "5",
    title: "Saturday Soccer",
    sport: "Football",
    venue: "Recreation Ground",
    datetime: "2024-01-20T14:00:00",
    teamA: "Titans",
    teamB: "Phoenix",
    slotsTotal: 22,
    slotsFilled: 20,
    status: "cancelled",
    cancelReason: "Weather conditions were unsafe due to heavy rain and waterlogged field.",
    createdBy: "John Doe",
    isCreator: true,
    hasJoined: false
  }
];

const mockJoinedSessions: Session[] = [
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
    id: "6",
    title: "Volleyball Championship",
    sport: "Volleyball",
    venue: "Beach Courts",
    datetime: "2024-01-30T18:00:00",
    teamA: "Spikers",
    teamB: "Blockers",
    slotsTotal: 12,
    slotsFilled: 10,
    status: "active",
    createdBy: "Alex Johnson",
    isCreator: false,
    hasJoined: true
  }
];

const MySessions = () => {
  const [createdSessions, setCreatedSessions] = useState<Session[]>(mockCreatedSessions);
  const [joinedSessions, setJoinedSessions] = useState<Session[]>(mockJoinedSessions);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: localStorage.getItem('token') === 'admin-token'
  };

  const handleCancelSession = (sessionId: string, reason: string) => {
    setCreatedSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const, cancelReason: reason }
        : session
    ));
  };

  const EmptyState = ({ type }: { type: 'created' | 'joined' }) => (
    <div className="text-center py-12 animate-fade-in">
      <div className="bg-gradient-card p-8 rounded-xl shadow-card max-w-md mx-auto">
        {type === 'created' ? (
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        ) : (
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        )}
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          {type === 'created' ? 'No sessions created yet' : 'No sessions joined yet'}
        </h3>
        <p className="text-muted-foreground mb-6">
          {type === 'created' 
            ? 'Start by creating your first sport session' 
            : 'Browse available sessions and join the fun!'
          }
        </p>
        <Link to={type === 'created' ? '/create-session' : '/dashboard'}>
          <Button className="btn-primary">
            <PlusCircle className="h-4 w-4 mr-2" />
            {type === 'created' ? 'Create Session' : 'Browse Sessions'}
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient-hero mb-2">
            My Sessions
          </h1>
          <p className="text-muted-foreground">
            Manage your created sessions and track sessions you've joined
          </p>
        </div>

        <Card className="shadow-card bg-gradient-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Session Overview
            </CardTitle>
            <CardDescription>
              View all your sessions in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="created" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="created" className="transition-smooth">
                  <User className="h-4 w-4 mr-2" />
                  Created by Me ({createdSessions.length})
                </TabsTrigger>
                <TabsTrigger value="joined" className="transition-smooth">
                  <Users className="h-4 w-4 mr-2" />
                  Joined by Me ({joinedSessions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="created" className="mt-0">
                {createdSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {createdSessions.map((session, index) => (
                      <div 
                        key={session.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className="animate-fade-in"
                      >
                        <SessionCard
                          session={session}
                          onCancel={handleCancelSession}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="created" />
                )}
              </TabsContent>

              <TabsContent value="joined" className="mt-0">
                {joinedSessions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {joinedSessions.map((session, index) => (
                      <div 
                        key={session.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className="animate-fade-in"
                      >
                        <SessionCard session={session} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState type="joined" />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-in">
          <div className="bg-gradient-primary text-primary-foreground p-4 rounded-xl shadow-card">
            <h3 className="text-sm font-medium mb-1">Sessions Created</h3>
            <p className="text-2xl font-bold">{createdSessions.length}</p>
          </div>
          <div className="bg-gradient-secondary text-secondary-foreground p-4 rounded-xl shadow-card">
            <h3 className="text-sm font-medium mb-1">Sessions Joined</h3>
            <p className="text-2xl font-bold">{joinedSessions.length}</p>
          </div>
          <div className="bg-gradient-card p-4 rounded-xl shadow-card border">
            <h3 className="text-sm font-medium mb-1 text-success">Active Sessions</h3>
            <p className="text-2xl font-bold text-success">
              {[...createdSessions, ...joinedSessions].filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="bg-gradient-card p-4 rounded-xl shadow-card border">
            <h3 className="text-sm font-medium mb-1 text-warning">Cancelled Sessions</h3>
            <p className="text-2xl font-bold text-warning">
              {createdSessions.filter(s => s.status === 'cancelled').length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MySessions;
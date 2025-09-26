import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BarChart3, TrendingUp, Users, Trophy, Activity, Calendar } from "lucide-react";

// Mock data for charts
const sessionCountData = [
  { month: "Jan", sessions: 45, active: 42, cancelled: 3 },
  { month: "Feb", sessions: 52, active: 48, cancelled: 4 },
  { month: "Mar", sessions: 61, active: 56, cancelled: 5 },
  { month: "Apr", sessions: 58, active: 54, cancelled: 4 },
  { month: "May", sessions: 67, active: 63, cancelled: 4 },
  { month: "Jun", sessions: 73, active: 68, cancelled: 5 }
];

const sportPopularityData = [
  { sport: "Football", sessions: 156, participants: 2184, growth: "+12%" },
  { sport: "Cricket", sessions: 134, participants: 1876, growth: "+8%" },
  { sport: "Basketball", sessions: 98, participants: 1372, growth: "+15%" },
  { sport: "Tennis", sessions: 76, participants: 912, growth: "+5%" },
  { sport: "Volleyball", sessions: 54, participants: 648, growth: "+22%" },
  { sport: "Baseball", sessions: 42, participants: 546, growth: "+3%" }
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("6months");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: localStorage.getItem('token') === 'admin-token'
  };

  const totalSessions = sessionCountData.reduce((sum, month) => sum + month.sessions, 0);
  const totalParticipants = sportPopularityData.reduce((sum, sport) => sum + sport.participants, 0);
  const averageParticipants = Math.round(totalParticipants / totalSessions);

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-background">
        <Navbar user={user} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-hero mb-2">
                  Platform Reports
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive analytics and insights for the SportScheduler platform
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-in">
            <Card className="bg-gradient-primary text-primary-foreground shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium">Total Sessions</p>
                    <p className="text-3xl font-bold">{totalSessions}</p>
                  </div>
                  <Activity className="h-8 w-8 text-primary-foreground/80" />
                </div>
                <div className="flex items-center mt-2 text-primary-foreground/80">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-secondary-foreground shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary-foreground/80 text-sm font-medium">Total Participants</p>
                    <p className="text-3xl font-bold">{totalParticipants.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-secondary-foreground/80" />
                </div>
                <div className="flex items-center mt-2 text-secondary-foreground/80">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+8% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">Avg. Participants</p>
                    <p className="text-3xl font-bold text-success">{averageParticipants}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-success" />
                </div>
                <div className="flex items-center mt-2 text-success">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+5% from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">Active Sports</p>
                    <p className="text-3xl font-bold text-primary">{sportPopularityData.length}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center mt-2 text-warning">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+2 new sports added</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <Card className="shadow-card bg-gradient-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Detailed Analytics
              </CardTitle>
              <CardDescription>
                In-depth analysis of sessions, sports popularity, and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sessions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="sessions">Session Analytics</TabsTrigger>
                  <TabsTrigger value="sports">Sport Popularity</TabsTrigger>
                </TabsList>

                <TabsContent value="sessions">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Monthly Session Counts</h3>
                    
                    {/* Simple bar chart representation */}
                    <div className="space-y-4">
                      {sessionCountData.map((month) => (
                        <div key={month.month} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{month.month}</span>
                            <span className="text-sm text-muted-foreground">
                              {month.sessions} sessions ({month.active} active, {month.cancelled} cancelled)
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className="bg-gradient-primary h-3 rounded-full relative"
                              style={{ 
                                width: `${Math.min((month.sessions / Math.max(...sessionCountData.map(m => m.sessions))) * 100, 100)}%` 
                              }}
                            >
                              <div
                                className="bg-destructive h-3 rounded-r-full absolute right-0"
                                style={{ 
                                  width: `${(month.cancelled / month.sessions) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <h4 className="font-medium text-success mb-2">Completion Rate</h4>
                        <p className="text-2xl font-bold text-success">92.3%</p>
                        <p className="text-xs text-success/80">Sessions completed successfully</p>
                      </div>
                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <h4 className="font-medium text-warning mb-2">Cancellation Rate</h4>
                        <p className="text-2xl font-bold text-warning">7.7%</p>
                        <p className="text-xs text-warning/80">Sessions cancelled</p>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <h4 className="font-medium text-primary mb-2">Growth Rate</h4>
                        <p className="text-2xl font-bold text-primary">+12%</p>
                        <p className="text-xs text-primary/80">Month over month</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sports">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Sport Popularity Rankings</h3>
                    
                    <div className="space-y-4">
                      {sportPopularityData.map((sport, index) => (
                        <div key={sport.sport} className="bg-accent/30 rounded-lg p-4 transition-smooth hover:bg-accent/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-gradient-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold">{sport.sport}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {sport.sessions} sessions • {sport.participants} participants
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-success">{sport.growth}</p>
                              <p className="text-xs text-muted-foreground">Growth</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Participation Rate</span>
                              <span>{Math.round((sport.participants / sport.sessions))} avg per session</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-secondary h-2 rounded-full"
                                style={{ 
                                  width: `${Math.min((sport.sessions / Math.max(...sportPopularityData.map(s => s.sessions))) * 100, 100)}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-card border rounded-lg p-6 mt-6">
                      <h4 className="font-semibold mb-4">Sport Category Insights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-primary">Team Sports (70%)</p>
                          <p className="text-muted-foreground">Football, Cricket, Basketball, Volleyball, Baseball</p>
                        </div>
                        <div>
                          <p className="font-medium text-secondary">Individual Sports (30%)</p>
                          <p className="text-muted-foreground">Tennis, Badminton, Table Tennis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Reports;
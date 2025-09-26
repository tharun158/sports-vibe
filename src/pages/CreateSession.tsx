import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Users, Trophy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateSession = () => {
  const [formData, setFormData] = useState({
    title: "",
    sport: "",
    venue: "",
    date: "",
    time: "",
    teamA: "",
    teamB: "",
    slotsTotal: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: localStorage.getItem('token') === 'admin-token'
  };

  // Mock sports data
  const sports = [
    "Football", "Cricket", "Basketball", "Tennis", "Volleyball", 
    "Baseball", "Hockey", "Rugby", "Badminton", "Table Tennis"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.title || !formData.sport || !formData.venue || !formData.date || !formData.time) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const sessionDateTime = new Date(`${formData.date}T${formData.time}`);
    if (sessionDateTime <= new Date()) {
      toast({
        title: "Invalid date/time",
        description: "Session date and time must be in the future.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Session created successfully!",
      description: `${formData.title} has been scheduled for ${formData.date} at ${formData.time}.`,
    });

    navigate('/dashboard');
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-card bg-gradient-card animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-3 rounded-full shadow-soft">
                <Plus className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gradient-hero">
              Create New Session
            </CardTitle>
            <CardDescription>
              Set up a new sport session for players to join
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Session Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Session Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Friday Night Football"
                    value={formData.title}
                    onChange={handleChange}
                    className="transition-smooth focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sport" className="text-sm font-medium">
                    Sport *
                  </Label>
                  <Select value={formData.sport} onValueChange={(value) => handleSelectChange('sport', value)}>
                    <SelectTrigger className="transition-smooth">
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map(sport => (
                        <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Add any additional details about the session..."
                    value={formData.description}
                    onChange={handleChange}
                    className="transition-smooth focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
              </div>

              {/* Date and Venue */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-secondary" />
                  When & Where
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium">
                      Time *
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue" className="text-sm font-medium">
                    Venue *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="venue"
                      name="venue"
                      placeholder="e.g., Central Park Field A"
                      value={formData.venue}
                      onChange={handleChange}
                      className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Teams and Slots */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-success" />
                  Teams & Players
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamA" className="text-sm font-medium">
                      Team A Name
                    </Label>
                    <Input
                      id="teamA"
                      name="teamA"
                      placeholder="e.g., Red Team"
                      value={formData.teamA}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamB" className="text-sm font-medium">
                      Team B Name
                    </Label>
                    <Input
                      id="teamB"
                      name="teamB"
                      placeholder="e.g., Blue Team"
                      value={formData.teamB}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slotsTotal" className="text-sm font-medium">
                    Total Player Slots
                  </Label>
                  <Input
                    id="slotsTotal"
                    name="slotsTotal"
                    type="number"
                    placeholder="e.g., 22"
                    min="2"
                    max="50"
                    value={formData.slotsTotal}
                    onChange={handleChange}
                    className="transition-smooth focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty to set no limit on participants
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                  ) : (
                    <>
                      Create Session
                      <Plus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateSession;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Trophy, Plus, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateSport = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    minPlayers: "",
    maxPlayers: "",
    equipment: ""
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Sport name required",
        description: "Please enter a name for the sport.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (formData.minPlayers && formData.maxPlayers) {
      const min = parseInt(formData.minPlayers);
      const max = parseInt(formData.maxPlayers);
      if (min > max) {
        toast({
          title: "Invalid player range",
          description: "Minimum players cannot be greater than maximum players.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Sport created successfully!",
      description: `${formData.name} has been added to the available sports.`,
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

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-background">
        <Navbar user={user} />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-card bg-gradient-card animate-scale-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-primary p-3 rounded-full shadow-soft">
                  <Trophy className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gradient-hero">
                Create New Sport
              </CardTitle>
              <CardDescription>
                Add a new sport to the platform for players to organize sessions
              </CardDescription>
              <div className="flex items-center justify-center mt-2">
                <Zap className="h-4 w-4 text-warning mr-1" />
                <span className="text-sm text-warning font-medium">Admin Only</span>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    Sport Details
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Sport Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Soccer, Basketball, Cricket"
                      value={formData.name}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the sport, rules, or special requirements..."
                      value={formData.description}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Player Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-secondary" />
                    Player Requirements
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPlayers" className="text-sm font-medium">
                        Minimum Players
                      </Label>
                      <Input
                        id="minPlayers"
                        name="minPlayers"
                        type="number"
                        placeholder="e.g., 10"
                        min="1"
                        max="50"
                        value={formData.minPlayers}
                        onChange={handleChange}
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxPlayers" className="text-sm font-medium">
                        Maximum Players
                      </Label>
                      <Input
                        id="maxPlayers"
                        name="maxPlayers"
                        type="number"
                        placeholder="e.g., 22"
                        min="1"
                        max="50"
                        value={formData.maxPlayers}
                        onChange={handleChange}
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Leave empty if there are no specific player count requirements
                  </p>
                </div>

                {/* Equipment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Equipment & Requirements</h3>

                  <div className="space-y-2">
                    <Label htmlFor="equipment" className="text-sm font-medium">
                      Required Equipment
                    </Label>
                    <Textarea
                      id="equipment"
                      name="equipment"
                      placeholder="List any equipment players need to bring or that will be provided..."
                      value={formData.equipment}
                      onChange={handleChange}
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Popular Sports Examples */}
                <div className="bg-accent/30 rounded-lg p-4">
                  <h4 className="font-medium text-sm mb-2">Popular Sports Examples:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <span>• Football/Soccer</span>
                    <span>• Basketball</span>
                    <span>• Cricket</span>
                    <span>• Tennis</span>
                    <span>• Volleyball</span>
                    <span>• Baseball</span>
                    <span>• Hockey</span>
                    <span>• Rugby</span>
                    <span>• Badminton</span>
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
                        Create Sport
                        <Trophy className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default CreateSport;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SessionCardProps {
  session: {
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
  };
  onJoin?: (sessionId: string) => void;
  onCancel?: (sessionId: string, reason: string) => void;
}

const SessionCard = ({ session, onJoin, onCancel }: SessionCardProps) => {
  const { toast } = useToast();

  const handleJoin = () => {
    if (onJoin) {
      onJoin(session.id);
      toast({
        title: "Joined session!",
        description: `You've successfully joined ${session.title}`,
      });
    }
  };

  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = formatDateTime(session.datetime);
  const slotsAvailable = session.slotsTotal - session.slotsFilled;
  const isPastSession = new Date(session.datetime) < new Date();

  const getStatusBadge = () => {
    switch (session.status) {
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return isPastSession ? 
          <Badge variant="secondary">Past</Badge> : 
          <Badge className="bg-success text-success-foreground">Active</Badge>;
    }
  };

  return (
    <Card className="card-hover bg-gradient-card animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-bold">{session.title}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground font-medium">{session.sport}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-secondary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-secondary" />
            <span className="truncate">{session.venue}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-secondary" />
            <span>{session.slotsFilled}/{session.slotsTotal} players</span>
          </div>
        </div>

        <div className="bg-accent/30 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">{session.teamA}</span>
            <span className="text-muted-foreground">vs</span>
            <span className="font-medium">{session.teamB}</span>
          </div>
        </div>

        {session.status === 'cancelled' && session.cancelReason && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <p className="text-sm text-destructive font-medium">Cancelled</p>
            <p className="text-xs text-destructive/80">{session.cancelReason}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Created by {session.createdBy}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        {session.status === 'active' && !isPastSession && (
          <div className="flex gap-2 w-full">
            {!session.isCreator && !session.hasJoined && slotsAvailable > 0 && (
              <Button 
                onClick={handleJoin}
                className="btn-primary flex-1"
              >
                Join Session
              </Button>
            )}
            {session.hasJoined && !session.isCreator && (
              <Button 
                variant="outline" 
                className="flex-1 transition-smooth"
                disabled
              >
                Already Joined
              </Button>
            )}
            {session.isCreator && (
              <Button 
                variant="outline" 
                className="transition-smooth hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  const reason = prompt("Please provide a reason for cancellation:");
                  if (reason && onCancel) {
                    onCancel(session.id, reason);
                  }
                }}
              >
                Cancel Session
              </Button>
            )}
            {slotsAvailable === 0 && !session.hasJoined && (
              <Button 
                variant="outline" 
                className="flex-1"
                disabled
              >
                Session Full
              </Button>
            )}
          </div>
        )}
        {slotsAvailable > 0 && session.status === 'active' && !isPastSession && (
          <p className="text-xs text-success mt-2">
            {slotsAvailable} slot{slotsAvailable !== 1 ? 's' : ''} available
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
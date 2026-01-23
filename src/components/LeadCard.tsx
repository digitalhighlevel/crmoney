import React from 'react';
import { Lead } from '@/types';
import { MoreHorizontal, Phone, Car, Clock, Tag, MessageSquare, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
  isOverlay?: boolean;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onClick, isOverlay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const isOverdue = React.useMemo(() => {
    if (!lead.appointmentDate) return false;
    const apptDate = new Date(lead.appointmentDate);
    const now = new Date();
    return apptDate < now && !lead.appointmentConfirmed && (lead.status === 'visita' || lead.status === 'agendamento');
  }, [lead]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(lead)}
      className={cn(
        "group relative transition-all cursor-pointer border-border/40 hover:border-primary/50 overflow-hidden",
        isOverdue ? "border-destructive/30 bg-destructive/5" : "bg-card",
        isDragging && !isOverlay ? "opacity-30 scale-95" : "opacity-100 scale-100",
        isOverlay ? "shadow-2xl ring-2 ring-primary/20 rotate-1 scale-105" : "hover:shadow-xl"
      )}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="p-4 pb-2 space-y-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
              <AvatarImage src={lead.avatarUrl} alt={lead.name} />
              <AvatarFallback className="font-bold">{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h4 className="text-sm font-black text-foreground leading-tight truncate pr-2" title={lead.name}>
                {lead.name}
              </h4>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-bold uppercase tracking-widest flex items-center gap-1">
                {lead.source}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3 space-y-3">
        {/* Car Interest Section */}
        <div className="bg-muted/30 rounded-lg p-2 border border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Car className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-bold text-foreground truncate">
              {lead.interestedCar} <span className="opacity-40">{lead.interestedYear}</span>
            </span>
          </div>
          {lead.tradeIn?.hasTradeIn && (
            <div className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-flex items-center gap-1 border border-blue-100 uppercase">
              🔄 Troca: {lead.tradeIn.model}
            </div>
          )}
        </div>

        {/* Tags Row */}
        {lead.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lead.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-[9px] h-4 font-black uppercase tracking-tight bg-primary/5 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Info Grid */}
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground pt-1">
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {lead.phone}
          </div>
          {lead.comments?.length > 0 && (
            <div className="flex items-center gap-1 text-primary">
              <MessageSquare className="w-3 h-3" />
              {lead.comments.length}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-1 flex items-center justify-between border-t border-border/30 bg-muted/10">
        <div className="flex items-center gap-2">
          {lead.appointmentDate ? (
            <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase", isOverdue ? "text-destructive" : "text-amber-600")}>
              <Clock className="w-3 h-3" />
              {new Date(lead.appointmentDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase">
              <Calendar className="w-3 h-3" />
              Sem agenda
            </div>
          )}
        </div>

        <Badge className={cn(
          "text-[9px] font-black uppercase tracking-tighter border-none",
          lead.status === 'sucesso' ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-sm shadow-primary/20'
        )}>
          {lead.status === 'atendimento' ? 'Lead' : lead.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
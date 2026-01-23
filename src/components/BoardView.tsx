import React from 'react';
import { Lead, LeadStatus } from '@/types';
import { COLUMNS } from '@/constants';
import { LeadCard } from '@/components/LeadCard';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    defaultDropAnimationSideEffects,
    useDroppable,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface BoardViewProps {
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
    onUpdateStatus: (id: string, status: LeadStatus) => void;
    onReorder: (activeId: string, overId: string) => void;
}

const KanbanColumn = ({ column, leads, onLeadClick }: { column: any, leads: Lead[], onLeadClick: (l: Lead) => void }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div
            className="flex flex-col w-[320px] h-full"
        >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-6 min-w-[24px] px-1 font-black shadow-sm bg-background border-border/60">
                        {leads.length}
                    </Badge>
                    <h2 className="font-black uppercase tracking-widest text-[11px] text-foreground/80">{column.title}</h2>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Cards Container - The entire area is now droppable */}
            <ScrollArea className="flex-1 pr-3 -mr-3">
                <div
                    ref={setNodeRef}
                    className="space-y-4 pb-20 min-h-full"
                >
                    <SortableContext
                        id={column.id}
                        items={leads.map(l => l.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {leads.map(lead => (
                            <LeadCard
                                key={lead.id}
                                lead={lead}
                                onClick={onLeadClick}
                            />
                        ))}

                        {leads.length === 0 && (
                            <div className="h-40 rounded-3xl border-2 border-dashed border-border/20 flex flex-col items-center justify-center text-muted-foreground/30 gap-3 group transition-all">
                                <div className="p-3 rounded-full bg-muted/20 group-hover:scale-110 transition-transform">
                                    <Plus className="w-6 h-6 opacity-30" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Arraste para cá</span>
                            </div>
                        )}
                    </SortableContext>
                </div>
            </ScrollArea>
        </div>
    );
};

export const BoardView: React.FC<BoardViewProps> = ({
    leads,
    onLeadClick,
    onUpdateStatus,
    onReorder
}) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeLead = leads.find(l => l.id === activeId);
        if (!activeLead) return;

        // Se estiver sobre uma coluna vazia ou sobre outro card
        const isOverColumn = COLUMNS.some(col => col.id === overId);
        let targetStatus: LeadStatus | null = null;

        if (isOverColumn) {
            targetStatus = overId as LeadStatus;
        } else {
            const overLead = leads.find(l => l.id === overId);
            if (overLead) {
                targetStatus = overLead.status;
            }
        }

        if (targetStatus && activeLead.status !== targetStatus) {
            onUpdateStatus(activeId, targetStatus);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            onReorder(active.id as string, over.id as string);
        }

        setActiveId(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <ScrollArea className="h-full w-full">
                <div className="flex h-full gap-8 p-10 min-w-max">
                    {COLUMNS.map(column => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            leads={leads.filter(l => l.status === column.id)}
                            onLeadClick={onLeadClick}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <DragOverlay dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                    styles: {
                        active: {
                            opacity: '0.5',
                        },
                    },
                }),
            }}>
                {activeLead ? (
                    <LeadCard lead={activeLead} onClick={() => { }} isOverlay />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

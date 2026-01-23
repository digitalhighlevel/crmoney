import React from 'react';
import { User, Bell, Shield, Lock, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const SettingsView: React.FC = () => {
    return (
        <ScrollArea className="h-full">
            <div className="p-10 max-w-4xl mx-auto space-y-10">
                <div className="flex items-end justify-between border-b pb-8">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter">SETTINGS</h2>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Core configuration and engine parameters</p>
                    </div>
                    <Button className="gap-2 font-black text-[10px] uppercase tracking-widest px-8 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                        <Save className="w-3 h-3" strokeWidth={3} /> Save All
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1 space-y-2">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">Organization</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">Identity and public records for your dealership.</p>
                    </div>
                    <div className="md:col-span-2">
                        <Card className="border-border/50 shadow-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Company Name</label>
                                        <Input defaultValue="Deer Cell Motors" className="bg-muted/10 h-11 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tax ID / CNPJ</label>
                                        <Input defaultValue="00.000.000/0001-99" className="bg-muted/10 h-11 font-medium" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator className="opacity-50" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1 space-y-2">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">AI Intelligence</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">Neural parameters and sales conversion behavior.</p>
                    </div>
                    <div className="md:col-span-2">
                        <Card className="border-border/50 shadow-sm overflow-hidden">
                            <CardHeader className="bg-muted/10 border-b p-8 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Shield className="w-5 h-5" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold">Sales Engine Config</CardTitle>
                                        <CardDescription className="text-xs">Manage how the AI interacts with leads.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-center justify-between group">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-foreground">Aggressiveness Level</p>
                                        <p className="text-xs text-muted-foreground">Sets the tone of the IA when asking for phone/whatsapp.</p>
                                    </div>
                                    <div className="flex bg-muted/30 p-1 rounded-lg border border-border/50">
                                        {['Chill', 'Balanced', 'Aggressive'].map(level => (
                                            <button
                                                key={level}
                                                className={cn(
                                                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all",
                                                    level === 'Balanced' ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="opacity-30" />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-foreground">Auto-Scheduling</p>
                                        <p className="text-xs text-muted-foreground">Allow AI to confirm store visits autonomously.</p>
                                    </div>
                                    <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-background transition-transform shadow-sm"></span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

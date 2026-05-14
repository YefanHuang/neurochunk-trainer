"use client";

import { useState } from "react";
import { Mic, Square, Play, Pause, FastForward } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { WaveformVisualizer } from "./WaveformVisualizer";

export function AudioPlayer() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(33); // Mock progress

  const toggleRecording = () => {
    if (isPlaying) setIsPlaying(false);
    setIsRecording(!isRecording);
  };

  const togglePlayback = () => {
    if (isRecording) setIsRecording(false);
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card/60 backdrop-blur-md border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Neural Shadowing Mode
        </CardTitle>
        <CardDescription>Listen to the reference audio and chunk tapping</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <WaveformVisualizer isRecording={isRecording} isPlaying={isPlaying} />
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>00:12</span>
            <span>01:45</span>
          </div>
          <Slider value={[progress]} max={100} step={1} className="w-full" onValueChange={(v) => { const val = Array.isArray(v) ? v[0] : v; setProgress(val as number); }} />
        </div>

        <div className="flex justify-center items-center gap-6 pt-4">
          <Button 
            variant={isRecording ? "destructive" : "secondary"}
            size="icon" 
            className="h-14 w-14 rounded-full transition-transform active:scale-95"
            onClick={toggleRecording}
          >
            {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>

          <Button 
            variant="default"
            size="icon" 
            className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 transition-transform active:scale-95 shadow-lg shadow-blue-900/50"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </Button>

          <Button 
            variant="secondary"
            size="icon" 
            className="h-14 w-14 rounded-full transition-transform active:scale-95"
          >
            <FastForward className="h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

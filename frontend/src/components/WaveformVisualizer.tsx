"use client";

import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  isRecording: boolean;
  isPlaying: boolean;
}

export function WaveformVisualizer({ isRecording, isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // We simulate waveform when recording or playing
      if (isRecording || isPlaying) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let i = 0; i < width; i++) {
          const x = i;
          const noise = Math.random() * 0.5 + 0.5;
          // Create a dynamic wave effect
          const y = height / 2 + Math.sin(i * 0.05 + time) * 30 * noise * (isRecording ? 1.5 : 1);
          ctx.lineTo(x, y);
        }

        // Stroke style
        ctx.strokeStyle = isRecording ? "#ef4444" : "#3b82f6"; // Red for recording, blue for playing
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        // Idle line
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = "#4b5563"; // gray
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 0.1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRecording, isPlaying]);

  return (
    <div className="w-full relative h-32 bg-secondary rounded-lg overflow-hidden border border-border shadow-inner">
      <canvas
        ref={canvasRef}
        width={800}
        height={128}
        className="w-full h-full object-cover"
      />
      {isRecording && (
        <div className="absolute top-2 right-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs text-red-500 font-mono tracking-widest">REC</span>
        </div>
      )}
    </div>
  );
}

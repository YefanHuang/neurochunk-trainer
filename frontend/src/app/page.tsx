import { AudioPlayer } from "@/components/AudioPlayer";
import { BrainCircuit, Activity, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <main className="z-10 w-full max-w-5xl flex flex-col items-center gap-12 text-center">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm font-medium mb-4">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span>MiMo API V2.5 Powered</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Chunk</span> Trainer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master L2 listening through neuro-scientific audio chunking, predictive processing, and rhythmic synchronization.
          </p>
        </header>

        <div className="w-full">
          <AudioPlayer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-8">
          <FeatureCard 
            icon={<Activity className="w-6 h-6 text-blue-400" />}
            title="Real-time Tapping"
            description="Tap to the rhythm of speech chunks to train your brain's boundary detection."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            title="Predictive Shadowing"
            description="Anticipate and vocalize the missing chunks before they are spoken."
          />
          <FeatureCard 
            icon={<BrainCircuit className="w-6 h-6 text-purple-400" />}
            title="Prosody Evaluation"
            description="Multi-dimensional scoring of your rhythm, stress, and pitch contours."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors">
      <div className="mb-4 bg-background/50 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

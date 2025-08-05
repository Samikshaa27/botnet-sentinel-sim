import { Shield, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyber-green rounded-full animate-pulse-glow delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-cyber-orange rounded-full animate-pulse-glow delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Shield className="w-24 h-24 text-cyber-blue animate-pulse-glow" />
            <div className="absolute inset-0 w-24 h-24 border-2 border-cyber-blue rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
          IoT Botnet Detection
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Advanced CNN-based simulation for detecting and analyzing IoT botnet attacks in real-time
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-cyber hover:opacity-90 text-lg px-8 py-3">
            Start Simulation
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10">
            Learn More
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm">
            <Cpu className="w-12 h-12 text-cyber-blue mb-4" />
            <h3 className="text-xl font-semibold mb-2">CNN Analysis</h3>
            <p className="text-muted-foreground text-center">
              Deep learning neural networks for pattern recognition
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm">
            <Activity className="w-12 h-12 text-cyber-green mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-muted-foreground text-center">
              Live network traffic analysis and threat detection
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm">
            <Shield className="w-12 h-12 text-cyber-orange mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
            <p className="text-muted-foreground text-center">
              Multi-layer protection against sophisticated attacks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import Hero from "@/components/Hero";
import SimulationControl from "@/components/SimulationControl";
import ResultsVisualization from "@/components/ResultsVisualization";
import TechnicalOverview from "@/components/TechnicalOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Hero />
      <SimulationControl />
      <ResultsVisualization />
      <TechnicalOverview />
    </div>
  );
};

export default Index;

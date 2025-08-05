import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SimulationControl = () => {
  console.log("SimulationControl component rendering");
  const [isRunning, setIsRunning] = useState(false);
  const [confidence, setConfidence] = useState([75]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const handleStartSimulation = () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a network traffic file first",
        variant: "destructive",
      });
      return;
    }
    setIsRunning(true);
    toast({
      title: "Simulation started",
      description: "CNN model is analyzing the network traffic data",
    });
  };

  const handleStopSimulation = () => {
    setIsRunning(false);
    toast({
      title: "Simulation paused",
      description: "Analysis has been temporarily stopped",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setUploadedFile(null);
    toast({
      title: "Simulation reset",
      description: "All parameters have been reset to default values",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-cyber-blue">Simulation Control Panel</h2>
          <p className="text-muted-foreground text-lg">Configure and monitor your IoT botnet detection simulation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* File Upload */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyber-blue" />
                Data Upload
              </CardTitle>
              <CardDescription>Upload network traffic data for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Network Traffic File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.pcap,.json"
                  onChange={handleFileUpload}
                  className="mt-2"
                />
                {uploadedFile && (
                  <p className="text-sm text-cyber-green mt-2">
                    ✓ {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="data-source">Data Source</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time Traffic</SelectItem>
                    <SelectItem value="sample">Sample Dataset</SelectItem>
                    <SelectItem value="custom">Custom Upload</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Model Configuration */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-cyber-blue">CNN Model Configuration</CardTitle>
              <CardDescription>Adjust detection parameters and thresholds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="model-type">Model Architecture</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select CNN model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resnet">ResNet-50</SelectItem>
                    <SelectItem value="vgg">VGG-16</SelectItem>
                    <SelectItem value="custom">Custom CNN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Detection Confidence Threshold: {confidence[0]}%</Label>
                <Slider
                  value={confidence}
                  onValueChange={setConfidence}
                  max={100}
                  min={10}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="batch-size">Batch Size</Label>
                <Input
                  id="batch-size"
                  type="number"
                  placeholder="32"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!isRunning ? (
            <Button
              onClick={handleStartSimulation}
              size="lg"
              className="bg-gradient-cyber hover:opacity-90 px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          ) : (
            <Button
              onClick={handleStopSimulation}
              size="lg"
              variant="destructive"
              className="px-8"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause Analysis
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10 px-8"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimulationControl;
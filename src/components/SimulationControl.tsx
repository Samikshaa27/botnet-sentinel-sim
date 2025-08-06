import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Play, Pause, RotateCcw, Download, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useDataProcessor } from "@/hooks/useDataProcessor";
import FileUploadGuide from "@/components/FileUploadGuide";

const SimulationControl = () => {
  console.log("SimulationControl component rendering");
  const [confidence, setConfidence] = useState([75]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [modelType, setModelType] = useState("resnet");
  const [dataSource, setDataSource] = useState("custom");
  const { toast } = useToast();
  const { 
    isProcessing, 
    progress, 
    currentStep, 
    results, 
    stats, 
    error, 
    processFile, 
    resetResults, 
    exportResults 
  } = useDataProcessor();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['.csv', '.json'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or JSON file containing network traffic data",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 50MB",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      resetResults(); // Clear previous results
      toast({
        title: "File uploaded successfully",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB) is ready for analysis`,
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
    
    processFile(uploadedFile, confidence[0]);
  };

  const handleReset = () => {
    setUploadedFile(null);
    resetResults();
    toast({
      title: "Simulation reset",
      description: "All parameters and results have been cleared",
    });
  };

  const handleExportResults = (format: 'json' | 'csv') => {
    exportResults(format);
  };

  const handleLoadSampleData = () => {
    // Create a sample CSV data
    const sampleData = `timestamp,sourceIP,destinationIP,protocol,packetSize,flags,duration,bytes,packets
2024-01-15T14:32:15Z,192.168.1.100,8.8.8.8,TCP,1200,ACK,2.5,15000,120
2024-01-15T14:32:16Z,192.168.1.101,10.0.0.1,UDP,64,SYN,0.1,500,50
2024-01-15T14:32:17Z,192.168.1.102,172.16.0.1,TCP,1500,ACK,5.2,25000,200
2024-01-15T14:32:18Z,192.168.1.103,8.8.4.4,TCP,800,FIN,1.8,8000,80
2024-01-15T14:32:19Z,192.168.1.104,192.168.1.1,ICMP,32,ACK,0.5,1000,10`;
    
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const file = new File([blob], 'sample-network-traffic.csv', { type: 'text/csv' });
    
    setUploadedFile(file);
    resetResults();
    toast({
      title: "Sample data loaded",
      description: "Sample network traffic data is ready for analysis",
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
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time Traffic</SelectItem>
                    <SelectItem value="sample">Sample Dataset</SelectItem>
                    <SelectItem value="custom">Custom Upload</SelectItem>
                  </SelectContent>
                </Select>
                {dataSource === "sample" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={handleLoadSampleData}
                  >
                    Load Sample Data
                  </Button>
                )}
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
                <Select value={modelType} onValueChange={setModelType}>
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
                  disabled={isProcessing}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Only threats with confidence above this threshold will be reported
                </p>
              </div>

              <div>
                <Label htmlFor="batch-size">Batch Size</Label>
                <Input
                  id="batch-size"
                  type="number"
                  placeholder="32"
                  className="mt-2"
                  disabled={isProcessing}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Upload Guide */}
        <div className="mt-8 max-w-4xl mx-auto">
          <FileUploadGuide />
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <Card className="mt-8 border-cyber-blue bg-card">
            <CardHeader>
              <CardTitle className="text-cyber-blue">Processing Network Traffic</CardTitle>
              <CardDescription>{currentStep}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="mt-8 border-destructive bg-card">
            <CardHeader>
              <CardTitle className="text-destructive">Processing Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        {stats && !isProcessing && (
          <Card className="mt-8 border-cyber-green bg-card">
            <CardHeader>
              <CardTitle className="text-cyber-green">Analysis Complete</CardTitle>
              <CardDescription>
                Processed {results.length} network traffic records in {(stats.processingTime / 1000).toFixed(2)} seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-blue">{stats.totalDevices}</div>
                  <div className="text-sm text-muted-foreground">Total Devices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-red">{stats.threatsBlocked}</div>
                  <div className="text-sm text-muted-foreground">Threats Blocked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-orange">{stats.underMonitoring}</div>
                  <div className="text-sm text-muted-foreground">Under Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-green">{stats.cleanDevices}</div>
                  <div className="text-sm text-muted-foreground">Clean Devices</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportResults('json')}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportResults('csv')}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!isProcessing ? (
            <Button
              onClick={handleStartSimulation}
              size="lg"
              className="bg-gradient-cyber hover:opacity-90 px-8"
              disabled={!uploadedFile}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="px-8"
              disabled
            >
              <Pause className="w-5 h-5 mr-2" />
              Processing...
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="border-cyber-orange text-cyber-orange hover:bg-cyber-orange/10 px-8"
            disabled={isProcessing}
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
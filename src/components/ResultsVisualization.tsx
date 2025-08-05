import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const ResultsVisualization = () => {
  const detectionResults = [
    { id: 1, device: "Smart Camera #1", threat: "DDoS Botnet", confidence: 92, status: "blocked", timestamp: "2024-01-15 14:32:15" },
    { id: 2, device: "IoT Sensor #7", threat: "Mirai Variant", confidence: 87, status: "blocked", timestamp: "2024-01-15 14:30:42" },
    { id: 3, device: "Smart Thermostat", threat: "Suspicious Traffic", confidence: 65, status: "monitoring", timestamp: "2024-01-15 14:28:18" },
    { id: 4, device: "Security Camera #3", threat: "Bashlite Botnet", confidence: 94, status: "blocked", timestamp: "2024-01-15 14:25:33" },
    { id: 5, device: "Smart Light Hub", threat: "Clean Traffic", confidence: 98, status: "safe", timestamp: "2024-01-15 14:22:07" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <XCircle className="w-4 h-4 text-cyber-red" />;
      case "monitoring":
        return <AlertTriangle className="w-4 h-4 text-cyber-orange" />;
      case "safe":
        return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      blocked: "destructive",
      monitoring: "secondary",
      safe: "default",
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-cyber-blue">Detection Results</h2>
          <p className="text-muted-foreground text-lg">Real-time analysis of IoT network traffic</p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Devices</p>
                  <p className="text-2xl font-bold text-cyber-blue">1,247</p>
                </div>
                <TrendingUp className="w-8 h-8 text-cyber-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  <p className="text-2xl font-bold text-cyber-red">23</p>
                </div>
                <XCircle className="w-8 h-8 text-cyber-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Under Monitoring</p>
                  <p className="text-2xl font-bold text-cyber-orange">7</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-cyber-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clean Devices</p>
                  <p className="text-2xl font-bold text-cyber-green">1,217</p>
                </div>
                <CheckCircle className="w-8 h-8 text-cyber-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detection Results Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-cyber-blue">Recent Detection Events</CardTitle>
            <CardDescription>Latest threats identified by the CNN model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detectionResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg bg-background/50"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-semibold">{result.device}</h4>
                      <p className="text-sm text-muted-foreground">{result.threat}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Progress value={result.confidence} className="w-20" />
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>

                    {getStatusBadge(result.status)}

                    <div className="text-xs text-muted-foreground">
                      {result.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Showing latest 5 detections. <span className="text-cyber-blue cursor-pointer hover:underline">View all results</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResultsVisualization;
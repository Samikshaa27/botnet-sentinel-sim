import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useDataProcessor } from "@/hooks/useDataProcessor";

const ResultsVisualization = () => {
  console.log("ResultsVisualization component rendering");
  const { results, stats } = useDataProcessor();
  
  // Use real results if available, otherwise show sample data
  const detectionResults = results.length > 0 ? results.slice(0, 10) : [
    { id: "sample-1", device: "Smart Camera #1", threat: "DDoS Botnet", confidence: 92, status: "blocked" as const, timestamp: "2024-01-15 14:32:15", features: { packetRate: 1200, byteRate: 15000, protocolDistribution: { TCP: 1 }, suspiciousPatterns: ["High packet rate"] } },
    { id: "sample-2", device: "IoT Sensor #7", threat: "Mirai Variant", confidence: 87, status: "blocked" as const, timestamp: "2024-01-15 14:30:42", features: { packetRate: 800, byteRate: 12000, protocolDistribution: { UDP: 1 }, suspiciousPatterns: ["Suspicious TCP flags"] } },
    { id: "sample-3", device: "Smart Thermostat", threat: "Suspicious Traffic", confidence: 65, status: "monitoring" as const, timestamp: "2024-01-15 14:28:18", features: { packetRate: 400, byteRate: 8000, protocolDistribution: { TCP: 1 }, suspiciousPatterns: ["Unusual packet sizes"] } },
    { id: "sample-4", device: "Security Camera #3", threat: "Bashlite Botnet", confidence: 94, status: "blocked" as const, timestamp: "2024-01-15 14:25:33", features: { packetRate: 1500, byteRate: 18000, protocolDistribution: { TCP: 1 }, suspiciousPatterns: ["High bandwidth usage"] } },
    { id: "sample-5", device: "Smart Light Hub", threat: "Clean Traffic", confidence: 98, status: "safe" as const, timestamp: "2024-01-15 14:22:07", features: { packetRate: 50, byteRate: 2000, protocolDistribution: { TCP: 1 }, suspiciousPatterns: [] } },
  ];

  // Use real stats if available, otherwise show sample stats
  const displayStats = stats || {
    totalDevices: 1247,
    threatsBlocked: 23,
    underMonitoring: 7,
    cleanDevices: 1217
  };

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
                  <p className="text-2xl font-bold text-cyber-blue">{displayStats.totalDevices.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-cyber-red">{displayStats.threatsBlocked}</p>
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
                  <p className="text-2xl font-bold text-cyber-orange">{displayStats.underMonitoring}</p>
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
                  <p className="text-2xl font-bold text-cyber-green">{displayStats.cleanDevices.toLocaleString()}</p>
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
            <CardDescription>
              {results.length > 0 
                ? `Latest threats identified by the CNN model (showing ${Math.min(detectionResults.length, 10)} of ${results.length} results)`
                : "Sample detection results - upload data to see real analysis"
              }
            </CardDescription>
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
                      {result.features.suspiciousPatterns.length > 0 && (
                        <p className="text-xs text-cyber-orange mt-1">
                          Patterns: {result.features.suspiciousPatterns.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                      <div>Packet Rate: {result.features.packetRate.toFixed(1)}/s</div>
                      <div>Byte Rate: {(result.features.byteRate / 1024).toFixed(1)} KB/s</div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Progress value={result.confidence} className="w-20" />
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>

                    {getStatusBadge(result.status)}

                    <div className="text-xs text-muted-foreground">
                      {new Date(result.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {results.length > 0 
                  ? `Showing latest ${Math.min(detectionResults.length, 10)} detections of ${results.length} total results.`
                  : "Upload network traffic data to see real-time detection results."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResultsVisualization;
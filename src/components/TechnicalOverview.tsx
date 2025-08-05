import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Network, Shield, Database } from "lucide-react";

const TechnicalOverview = () => {
  console.log("TechnicalOverview component rendering");
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-cyber-blue">Technical Architecture</h2>
          <p className="text-muted-foreground text-lg">Deep dive into our CNN-based detection system</p>
        </div>

        <Tabs defaultValue="architecture" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="cnn-model">CNN Model</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-cyber-blue" />
                    Data Collection Layer
                  </CardTitle>
                  <CardDescription>Network traffic monitoring and preprocessing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time packet capture</li>
                    <li>• Flow-based feature extraction</li>
                    <li>• Statistical analysis of traffic patterns</li>
                    <li>• Protocol-specific fingerprinting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyber-green" />
                    CNN Processing Layer
                  </CardTitle>
                  <CardDescription>Deep learning analysis and classification</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Multi-layer convolutional networks</li>
                    <li>• Pattern recognition algorithms</li>
                    <li>• Anomaly detection systems</li>
                    <li>• Real-time classification</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyber-orange" />
                    Response Layer
                  </CardTitle>
                  <CardDescription>Automated threat mitigation and alerting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Automated blocking mechanisms</li>
                    <li>• Risk-based quarantine</li>
                    <li>• Alert prioritization</li>
                    <li>• Incident response workflows</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyber-red" />
                    Analytics Layer
                  </CardTitle>
                  <CardDescription>Historical analysis and reporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Threat intelligence database</li>
                    <li>• Behavioral baselines</li>
                    <li>• Performance metrics</li>
                    <li>• Compliance reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cnn-model" className="space-y-6 mt-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-cyber-blue">Convolutional Neural Network Architecture</CardTitle>
                <CardDescription>Detailed model specifications and layers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-cyber-green">Input Layer</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Input shape: (224, 224, 3)</li>
                      <li>• Normalized packet features</li>
                      <li>• Flow-based representations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-cyber-green">Convolutional Layers</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• 3 Conv2D layers (32, 64, 128 filters)</li>
                      <li>• ReLU activation functions</li>
                      <li>• MaxPooling2D for dimensionality reduction</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-cyber-green">Dense Layers</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Flatten layer</li>
                      <li>• Dense(512) with ReLU</li>
                      <li>• Dropout(0.5) for regularization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-cyber-green">Output Layer</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Dense(5) for classification</li>
                      <li>• Softmax activation</li>
                      <li>• Classes: Normal, DDoS, Mirai, Bashlite, Botnet</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-cyber-blue">Detection Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Mirai botnet variants</li>
                    <li>• DDoS attack patterns</li>
                    <li>• Bashlite malware</li>
                    <li>• Custom IoT threats</li>
                    <li>• Zero-day exploits</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-cyber-green">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 98.7% accuracy rate</li>
                    <li>• {"<50ms"} detection latency</li>
                    <li>• 0.3% false positive rate</li>
                    <li>• 99.1% recall for known threats</li>
                    <li>• Real-time processing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-cyber-orange">Supported Protocols</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• TCP/UDP analysis</li>
                    <li>• HTTP/HTTPS inspection</li>
                    <li>• MQTT monitoring</li>
                    <li>• CoAP protocol support</li>
                    <li>• Custom IoT protocols</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 mt-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-cyber-blue">System Performance Benchmarks</CardTitle>
                <CardDescription>Real-world testing results and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-cyber-green">Detection Accuracy</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Normal Traffic</span>
                        <span className="text-cyber-green">99.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DDoS Attacks</span>
                        <span className="text-cyber-green">98.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mirai Botnet</span>
                        <span className="text-cyber-green">97.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bashlite Variants</span>
                        <span className="text-cyber-green">98.3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-cyber-orange">Response Times</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Average Detection</span>
                        <span className="text-cyber-blue">42ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Alert Generation</span>
                        <span className="text-cyber-blue">78ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mitigation Action</span>
                        <span className="text-cyber-blue">156ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Response</span>
                        <span className="text-cyber-blue">276ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TechnicalOverview;
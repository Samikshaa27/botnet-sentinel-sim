import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FileText, Database, AlertCircle } from "lucide-react";

const FileUploadGuide = () => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyber-blue" />
          Data Upload Guide
        </CardTitle>
        <CardDescription>
          Learn how to format your network traffic data for optimal analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supported Formats */}
        <div>
          <h4 className="font-semibold mb-3 text-cyber-green">Supported File Formats</h4>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">CSV</Badge>
            <Badge variant="outline">JSON</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Maximum file size: 50MB. For larger datasets, consider splitting into multiple files.
          </p>
        </div>

        {/* CSV Format */}
        <div>
          <h4 className="font-semibold mb-3 text-cyber-blue">CSV Format Requirements</h4>
          <div className="bg-muted p-3 rounded-md font-mono text-sm">
            <div className="text-cyber-green">timestamp,sourceIP,destinationIP,protocol,packetSize,flags,duration,bytes,packets</div>
            <div>2024-01-15T14:32:15Z,192.168.1.100,8.8.8.8,TCP,1200,ACK,2.5,15000,120</div>
            <div>2024-01-15T14:32:16Z,192.168.1.101,10.0.0.1,UDP,64,SYN,0.1,500,50</div>
          </div>
        </div>

        {/* JSON Format */}
        <div>
          <h4 className="font-semibold mb-3 text-cyber-orange">JSON Format Requirements</h4>
          <div className="bg-muted p-3 rounded-md font-mono text-sm">
            <div>[</div>
            <div className="ml-2">{"{"}</div>
            <div className="ml-4">"timestamp": "2024-01-15T14:32:15Z",</div>
            <div className="ml-4">"sourceIP": "192.168.1.100",</div>
            <div className="ml-4">"destinationIP": "8.8.8.8",</div>
            <div className="ml-4">"protocol": "TCP",</div>
            <div className="ml-4">"packetSize": 1200,</div>
            <div className="ml-4">"flags": "ACK",</div>
            <div className="ml-4">"duration": 2.5,</div>
            <div className="ml-4">"bytes": 15000,</div>
            <div className="ml-4">"packets": 120</div>
            <div className="ml-2">{"}"}</div>
            <div>]</div>
          </div>
        </div>

        {/* Field Descriptions */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Database className="w-4 h-4" />
            Field Descriptions
          </h4>
          <div className="space-y-2 text-sm">
            <div><strong>timestamp:</strong> ISO 8601 format (e.g., 2024-01-15T14:32:15Z)</div>
            <div><strong>sourceIP:</strong> Source IP address (e.g., 192.168.1.100)</div>
            <div><strong>destinationIP:</strong> Destination IP address (e.g., 8.8.8.8)</div>
            <div><strong>protocol:</strong> Network protocol (TCP, UDP, ICMP, etc.)</div>
            <div><strong>packetSize:</strong> Size of the packet in bytes</div>
            <div><strong>flags:</strong> TCP flags or packet flags (ACK, SYN, FIN, etc.)</div>
            <div><strong>duration:</strong> Connection duration in seconds</div>
            <div><strong>bytes:</strong> Total bytes transferred</div>
            <div><strong>packets:</strong> Total number of packets</div>
          </div>
        </div>

        {/* Important Notes */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Missing fields will be filled with default values. 
            For best results, ensure all fields are present and properly formatted. 
            The CNN model performs better with complete data sets.
          </AlertDescription>
        </Alert>

        {/* Data Quality Tips */}
        <div>
          <h4 className="font-semibold mb-3 text-cyber-green">Data Quality Tips</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Include diverse traffic patterns for comprehensive analysis</li>
            <li>• Ensure timestamps are in chronological order</li>
            <li>• Remove any personally identifiable information</li>
            <li>• Include both normal and suspicious traffic samples</li>
            <li>• Validate IP addresses are in correct format</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadGuide;
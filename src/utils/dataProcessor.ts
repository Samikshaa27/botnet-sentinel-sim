export interface NetworkTrafficData {
  timestamp: string;
  sourceIP: string;
  destinationIP: string;
  protocol: string;
  packetSize: number;
  flags: string;
  duration: number;
  bytes: number;
  packets: number;
}

export interface ProcessedResult {
  id: string;
  device: string;
  threat: string;
  confidence: number;
  status: 'safe' | 'monitoring' | 'blocked';
  timestamp: string;
  features: {
    packetRate: number;
    byteRate: number;
    protocolDistribution: Record<string, number>;
    suspiciousPatterns: string[];
  };
}

export interface AnalysisStats {
  totalDevices: number;
  threatsBlocked: number;
  underMonitoring: number;
  cleanDevices: number;
  processingTime: number;
  accuracy: number;
}

export class DataProcessor {
  private cnnModel: CNNModel;

  constructor() {
    this.cnnModel = new CNNModel();
  }

  async processFile(file: File): Promise<{
    results: ProcessedResult[];
    stats: AnalysisStats;
  }> {
    const startTime = Date.now();
    
    try {
      // Parse the uploaded file
      const rawData = await this.parseFile(file);
      
      // Extract features from network traffic
      const features = this.extractFeatures(rawData);
      
      // Run CNN analysis
      const predictions = await this.cnnModel.predict(features);
      
      // Generate results
      const results = this.generateResults(rawData, predictions);
      
      // Calculate statistics
      const stats = this.calculateStats(results, Date.now() - startTime);
      
      return { results, stats };
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Failed to process the uploaded file. Please ensure it\'s in the correct format.');
    }
  }

  private async parseFile(file: File): Promise<NetworkTrafficData[]> {
    const text = await file.text();
    const extension = file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'csv':
        return this.parseCSV(text);
      case 'json':
        return this.parseJSON(text);
      case 'pcap':
        throw new Error('PCAP files require specialized parsing. Please convert to CSV or JSON format.');
      default:
        throw new Error('Unsupported file format. Please use CSV or JSON files.');
    }
  }

  private parseCSV(text: string): NetworkTrafficData[] {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        const values = line.split(',');
        return {
          timestamp: values[0] || new Date().toISOString(),
          sourceIP: values[1] || `192.168.1.${100 + index}`,
          destinationIP: values[2] || '8.8.8.8',
          protocol: values[3] || 'TCP',
          packetSize: parseInt(values[4]) || Math.floor(Math.random() * 1500),
          flags: values[5] || 'ACK',
          duration: parseFloat(values[6]) || Math.random() * 10,
          bytes: parseInt(values[7]) || Math.floor(Math.random() * 10000),
          packets: parseInt(values[8]) || Math.floor(Math.random() * 100)
        };
      });
  }

  private parseJSON(text: string): NetworkTrafficData[] {
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      return data.map(item => ({
        timestamp: item.timestamp || new Date().toISOString(),
        sourceIP: item.sourceIP || item.src_ip || '192.168.1.100',
        destinationIP: item.destinationIP || item.dst_ip || '8.8.8.8',
        protocol: item.protocol || 'TCP',
        packetSize: item.packetSize || item.packet_size || 1000,
        flags: item.flags || 'ACK',
        duration: item.duration || 1.0,
        bytes: item.bytes || 5000,
        packets: item.packets || 50
      }));
    }
    throw new Error('JSON file must contain an array of network traffic records');
  }

  private extractFeatures(data: NetworkTrafficData[]): number[][] {
    return data.map(record => [
      record.packetSize / 1500, // Normalized packet size
      record.duration,
      record.bytes / 10000, // Normalized bytes
      record.packets / 100, // Normalized packet count
      record.protocol === 'TCP' ? 1 : record.protocol === 'UDP' ? 0.5 : 0,
      this.calculatePacketRate(record),
      this.calculateByteRate(record),
      this.detectSuspiciousPatterns(record)
    ]);
  }

  private calculatePacketRate(record: NetworkTrafficData): number {
    return record.duration > 0 ? record.packets / record.duration : 0;
  }

  private calculateByteRate(record: NetworkTrafficData): number {
    return record.duration > 0 ? record.bytes / record.duration : 0;
  }

  private detectSuspiciousPatterns(record: NetworkTrafficData): number {
    let suspiciousScore = 0;
    
    // High packet rate (potential DDoS)
    if (this.calculatePacketRate(record) > 1000) suspiciousScore += 0.3;
    
    // Unusual packet sizes
    if (record.packetSize < 64 || record.packetSize > 1400) suspiciousScore += 0.2;
    
    // High byte rate
    if (this.calculateByteRate(record) > 100000) suspiciousScore += 0.3;
    
    // Suspicious flags
    if (record.flags.includes('SYN') && record.flags.includes('FIN')) suspiciousScore += 0.2;
    
    return Math.min(suspiciousScore, 1.0);
  }

  private generateResults(data: NetworkTrafficData[], predictions: number[]): ProcessedResult[] {
    const threatTypes = ['Clean Traffic', 'DDoS Botnet', 'Mirai Variant', 'Bashlite Botnet', 'Suspicious Traffic'];
    
    return data.map((record, index) => {
      const predictionIndex = predictions[index];
      const confidence = Math.floor(Math.random() * 30 + 70); // 70-100% confidence
      const threat = threatTypes[predictionIndex] || 'Unknown Threat';
      
      let status: 'safe' | 'monitoring' | 'blocked' = 'safe';
      if (predictionIndex > 0) {
        status = confidence > 85 ? 'blocked' : 'monitoring';
      }

      return {
        id: `detection-${index + 1}`,
        device: this.generateDeviceName(record.sourceIP),
        threat,
        confidence,
        status,
        timestamp: record.timestamp,
        features: {
          packetRate: this.calculatePacketRate(record),
          byteRate: this.calculateByteRate(record),
          protocolDistribution: { [record.protocol]: 1 },
          suspiciousPatterns: this.getSuspiciousPatterns(record)
        }
      };
    });
  }

  private generateDeviceName(ip: string): string {
    const deviceTypes = ['Smart Camera', 'IoT Sensor', 'Smart Thermostat', 'Security Camera', 'Smart Light Hub', 'Router', 'Smart TV'];
    const hash = ip.split('.').reduce((acc, part) => acc + parseInt(part), 0);
    const deviceType = deviceTypes[hash % deviceTypes.length];
    const deviceNumber = (hash % 99) + 1;
    return `${deviceType} #${deviceNumber}`;
  }

  private getSuspiciousPatterns(record: NetworkTrafficData): string[] {
    const patterns: string[] = [];
    
    if (this.calculatePacketRate(record) > 1000) patterns.push('High packet rate');
    if (record.packetSize < 64) patterns.push('Unusually small packets');
    if (record.packetSize > 1400) patterns.push('Unusually large packets');
    if (this.calculateByteRate(record) > 100000) patterns.push('High bandwidth usage');
    if (record.flags.includes('SYN') && record.flags.includes('FIN')) patterns.push('Suspicious TCP flags');
    
    return patterns;
  }

  private calculateStats(results: ProcessedResult[], processingTime: number): AnalysisStats {
    const totalDevices = new Set(results.map(r => r.device)).size;
    const threatsBlocked = results.filter(r => r.status === 'blocked').length;
    const underMonitoring = results.filter(r => r.status === 'monitoring').length;
    const cleanDevices = results.filter(r => r.status === 'safe').length;
    
    return {
      totalDevices,
      threatsBlocked,
      underMonitoring,
      cleanDevices,
      processingTime,
      accuracy: Math.min(95 + Math.random() * 4, 99.9) // Simulated accuracy between 95-99.9%
    };
  }
}

// Simplified CNN Model simulation
class CNNModel {
  async predict(features: number[][]): Promise<number[]> {
    // Simulate CNN processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return features.map(feature => {
      // Simulate CNN prediction based on features
      const suspiciousScore = feature[7]; // Suspicious patterns score
      const packetRate = feature[5];
      const byteRate = feature[6];
      
      // Simple rule-based classification for simulation
      if (suspiciousScore > 0.7 || packetRate > 0.8 || byteRate > 0.9) {
        return Math.floor(Math.random() * 3) + 1; // Threat classes 1-3
      }
      return 0; // Clean traffic
    });
  }
}
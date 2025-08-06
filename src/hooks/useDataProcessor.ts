import { useState, useCallback } from 'react';
import { DataProcessor, ProcessedResult, AnalysisStats } from '@/utils/dataProcessor';
import { useToast } from '@/hooks/use-toast';

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  currentStep: string;
  results: ProcessedResult[];
  stats: AnalysisStats | null;
  error: string | null;
}

export const useDataProcessor = () => {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    currentStep: '',
    results: [],
    stats: null,
    error: null
  });

  const { toast } = useToast();
  const dataProcessor = new DataProcessor();

  const processFile = useCallback(async (file: File, confidenceThreshold: number = 75) => {
    setState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      currentStep: 'Initializing...',
      error: null
    }));

    try {
      // Step 1: File validation
      setState(prev => ({ ...prev, progress: 10, currentStep: 'Validating file format...' }));
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 2: Parsing data
      setState(prev => ({ ...prev, progress: 25, currentStep: 'Parsing network traffic data...' }));
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: Feature extraction
      setState(prev => ({ ...prev, progress: 45, currentStep: 'Extracting traffic features...' }));
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 4: CNN analysis
      setState(prev => ({ ...prev, progress: 65, currentStep: 'Running CNN threat detection...' }));
      
      const { results, stats } = await dataProcessor.processFile(file);

      // Step 5: Filtering results by confidence threshold
      setState(prev => ({ ...prev, progress: 85, currentStep: 'Filtering results by confidence threshold...' }));
      const filteredResults = results.filter(result => result.confidence >= confidenceThreshold);

      // Step 6: Finalizing
      setState(prev => ({ ...prev, progress: 100, currentStep: 'Analysis complete!' }));
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        isProcessing: false,
        results: filteredResults,
        stats: {
          ...stats,
          threatsBlocked: filteredResults.filter(r => r.status === 'blocked').length,
          underMonitoring: filteredResults.filter(r => r.status === 'monitoring').length,
          cleanDevices: filteredResults.filter(r => r.status === 'safe').length
        },
        currentStep: ''
      }));

      toast({
        title: "Analysis Complete",
        description: `Processed ${results.length} network traffic records. Found ${filteredResults.filter(r => r.status !== 'safe').length} potential threats.`,
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: 0,
        currentStep: ''
      }));

      toast({
        title: "Processing Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const resetResults = useCallback(() => {
    setState({
      isProcessing: false,
      progress: 0,
      currentStep: '',
      results: [],
      stats: null,
      error: null
    });
  }, []);

  const exportResults = useCallback((format: 'json' | 'csv' = 'json') => {
    if (state.results.length === 0) {
      toast({
        title: "No Results to Export",
        description: "Please process a file first before exporting results.",
        variant: "destructive",
      });
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === 'json') {
      content = JSON.stringify({
        analysis: {
          timestamp: new Date().toISOString(),
          stats: state.stats,
          results: state.results
        }
      }, null, 2);
      filename = `botnet-analysis-${Date.now()}.json`;
      mimeType = 'application/json';
    } else {
      const headers = ['ID', 'Device', 'Threat', 'Confidence', 'Status', 'Timestamp', 'Packet Rate', 'Byte Rate', 'Suspicious Patterns'];
      const csvRows = [
        headers.join(','),
        ...state.results.map(result => [
          result.id,
          result.device,
          result.threat,
          result.confidence,
          result.status,
          result.timestamp,
          result.features.packetRate.toFixed(2),
          result.features.byteRate.toFixed(2),
          `"${result.features.suspiciousPatterns.join('; ')}"`
        ].join(','))
      ];
      content = csvRows.join('\n');
      filename = `botnet-analysis-${Date.now()}.csv`;
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: `Analysis results exported as ${filename}`,
    });
  }, [state.results, state.stats, toast]);

  return {
    ...state,
    processFile,
    resetResults,
    exportResults
  };
};
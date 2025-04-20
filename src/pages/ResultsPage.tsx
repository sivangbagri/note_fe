"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Mic,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/services/api";
import type { TranscriptData } from "@/types";

const ResultsPage = () => {
  const location = useLocation();
  const { resultData } = location.state as { resultData: TranscriptData };

  const { transcriptId } = useParams<{ transcriptId: string }>();

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);

  const handleExportPdf = async () => {
    if (!transcriptId) return;

    setExportingPdf(true);

    try {
      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = api.getExportPdfUrl(transcriptId, resultData.summary);
      link.setAttribute("download", "meeting_summary.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "PDF Export Started",
        description: "Your PDF with sentimental analysis is being generated and will download shortly.",
      });
    } catch (err) {
      console.error("Error exporting PDF:", err);
      toast({
        title: "Export Failed",
        description: "There was an error exporting the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setExportingPdf(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-64">
  //       <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
  //       <p className="text-slate-600">Loading transcript data...</p>
  //     </div>
  //   );
  // }

  if (error || !resultData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-slate-700 text-lg mb-2">Something went wrong</p>
        <p className="text-slate-600 mb-6">
          {error || "Could not load transcript data"}
        </p>
        <Link to="/record">
          <Button>Try Again</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Meeting Results</h1>
        <Button
          onClick={handleExportPdf}
          className="bg-blue-600 hover:bg-blue-700 flex items-center text-white cursor-pointer"
          disabled={exportingPdf}
        >
          {exportingPdf ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export PDF
        </Button>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center">
        <Clock className="h-5 w-5 text-blue-600 mr-2" />
        <span className="text-slate-700">
          Meeting duration:{" "}
          <span className="font-medium">
            {Math.floor(resultData.duration / 60)}m{" "}
            {Math.round(resultData.duration % 60)}s
          </span>
        </span>
        <span className="mx-3 text-slate-400">|</span>
        <FileText className="h-5 w-5 text-blue-600 mr-2" />
        <span className="text-slate-700">
          Transcript ID:{" "}
          <span className="font-medium">
            {resultData.transcript_id.substring(0, 8)}...
          </span>
        </span>
      </div>

      <Tabs defaultValue="summary" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                <span className="bg-blue-100 p-1 rounded-full mr-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                </span>
                Overview
              </h3>
              <ul className="space-y-2">{resultData.summary.overview}</ul>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                <span className="bg-blue-100 p-1 rounded-full mr-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </span>
                Key Points
              </h3>
              <ul className="space-y-2">
                {resultData.summary.key_points?.map(
                  (item, index) =>
                    item && (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">→</span>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    )
                )}
              </ul>
            </Card>
          </div>

          {resultData.summary.action_items.length > 0 && (
            <Card className="p-5 mt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                Action Items
              </h3>
              <ul className="space-y-2">
                {resultData.summary.action_items.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-slate-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          <Card className="p-5 mt-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Full Summary
            </h3>
            <ul className="space-y-2">{resultData.summary.full_summary}</ul>
          </Card>
        </TabsContent>

        <TabsContent value="transcript" className="pt-4">
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Full Transcript
            </h3>
            <div className="bg-white border border-slate-200 rounded-md p-4 max-h-96 overflow-y-auto">
              <p className="text-slate-700 whitespace-pre-line">
                {resultData.transcript}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Link to="/record">
          <Button
            variant="outline"
            className="flex items-center cursor-pointer"
          >
            <Mic className="h-4 w-4 mr-2" />
            Record Another
          </Button>
        </Link>

        <Link to="/search">
          <Button
            variant="outline"
            className="flex items-center cursor-pointer"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Transcripts
          </Button>
        </Link>
      </div>

      <Toaster />
    </div>
  );
};

export default ResultsPage;

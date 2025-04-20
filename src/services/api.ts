import type { SearchResult, Summary } from "@/types";

const API_BASE_URL = "http://127.0.0.1:8000";

export interface TranscriptionResponse {
  transcript_id: string;
  transcript: string;
  summary: {
    main_points: string[];
    action_items: string[];
    key_insights: string[];
  };
  duration: number;
}

export interface SearchResponse {
  results: SearchResult[];
  count: number;
}

export const api = {
  /**
   * Upload audio file for transcription and summarization
   */
  uploadAudio: async (
    file: File,
    language?: string
  ): Promise<TranscriptionResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const url = language
      ? `${API_BASE_URL}/upload_audio?language=${encodeURIComponent(language)}`
      : `${API_BASE_URL}/upload_audio`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to upload audio");
    }
    const data = await response.json();
    console.log("response\n", data);
    return data;
  },

  /**
   * Search for keywords within stored transcripts
   */
  searchTranscripts: async (query: string): Promise<SearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Search failed");
    }

    return response.json();
  },

  /**
   * Get the URL for exporting a transcript as PDF
   */
  getExportPdfUrl: (transcriptId: string, summary: Summary): string => {
    return `${API_BASE_URL}/export_pdf?transcript_id=${encodeURIComponent(
      transcriptId
    )}&summary=${JSON.stringify(summary)}`;
  },
};

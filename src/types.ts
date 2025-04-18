export interface SearchResult {
  transcript_id: string;
  sentence_idx: number;
  text: string;
  created_at: string;
  title: string;
}

export interface Summary {
  overview:string
  key_points: string[];
  action_items: string[];
  full_summary: string;
}

export interface TranscriptData {
  transcript_id: string;
  transcript: string;
  summary: Summary;
  duration: number;
}

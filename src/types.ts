export interface SearchResult {
    id: string
    transcript_id: string
    text: string
    timestamp: string
    context: string
  }
  
  export interface Summary {
    main_points: string[]
    action_items: string[]
    key_insights: string[]
  }
  
  export interface TranscriptData {
    transcript_id: string
    transcript: string
    summary: Summary
    duration: number
  }
  
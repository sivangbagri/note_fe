"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, FileText, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { api } from "@/services/api";
import type { SearchResult } from "@/types";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await api.searchTranscripts(searchQuery);
      setResults(response.results);
    } catch (error) {
      console.error("Error searching transcripts:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const navigateToTranscript = (transcriptId: string) => {
    navigate(`/results/${transcriptId}`);
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchQuery.trim()) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Search Transcripts
      </h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for keywords in transcripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 text-white cursor-pointer"
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </form>

      {hasSearched && (
        <div className="mb-4 text-slate-600">
          {isSearching ? (
            <p>Searching transcripts...</p>
          ) : (
            <p>
              Found {results.length} results for "{searchQuery}"
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <Card
            key={result.sentence_idx}
            className="p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm text-slate-500">
                  Transcript ID: {result.transcript_id}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-slate-500">
                  {new Date(result.created_at).toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <div
              className="text-lg text-blue-700 font-medium mb-2"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(result.text),
              }}
            />

            <div
              className="text-slate-600 text-sm mb-3 bg-slate-50 p-2 rounded"
              dangerouslySetInnerHTML={{
                __html: highlightSearchTerm(result.title),
              }}
            />

            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
              onClick={() => navigateToTranscript(result.transcript_id)}
            >
              View Full Transcript
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Card>
        ))}

        {hasSearched && !isSearching && results.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <SearchIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">
              No results found
            </h3>
            <p className="text-slate-500 mb-4">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

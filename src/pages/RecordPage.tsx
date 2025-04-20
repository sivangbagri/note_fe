"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Square, Upload, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/services/api";

const RecordPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);

        // Stop all tracks from the stream
        stream.getTracks().forEach((track) => track.stop());
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if file is an audio file
      if (!file.type.startsWith("audio/")) {
        toast({
          title: "Invalid file",
          description: "Please select an audio file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      setAudioBlob(null); // Clear recorded audio if any
    }
  };

  const uploadAudio = async () => {
    const fileToUpload =
      selectedFile ||
      (audioBlob
        ? new File([audioBlob], "recording.wav", { type: "audio/wav" })
        : null);

    if (!fileToUpload) {
      toast({
        title: "No audio",
        description: "Please record audio or select a file first",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Call the actual API
      const data = await api.uploadAudio(
        fileToUpload,
        selectedLanguage || undefined
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Navigate to results page with the transcript ID
      setTimeout(() => {
        navigate(`/results/${data.transcript_id}`, {
          state: { resultData: data },
        });
      }, 500);
    } catch (error) {
      console.error("Error uploading audio:", error);
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error uploading your audio. Please try again.",
        variant: "destructive",
      });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Record or Upload Meeting
      </h1>

      <Card className="p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Record Audio
          </h2>

          <div className="flex flex-col items-center">
            {isRecording ? (
              <>
                <div className="text-2xl font-mono mb-4 text-blue-700">
                  {formatTime(recordingTime)}
                </div>
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
                  <Mic className="h-8 w-8 text-red-600" />
                </div>
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                  className="flex items-center"
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </Button>
              </>
            ) : (
              <Button
                onClick={startRecording}
                className="bg-blue-600 hover:bg-blue-700 flex items-center text-white cursor-pointer"
                disabled={isUploading}
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            )}

            {audioBlob && !isRecording && (
              <div className="mt-4 w-full">
                <p className="text-sm text-slate-600 mb-2">Preview:</p>
                <audio controls className="w-full">
                  <source
                    src={URL.createObjectURL(audioBlob)}
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Or Upload Audio File
          </h2>

          <div className="flex flex-col items-center">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-50 text-blue rounded-lg shadow-lg tracking-wide border border-blue-200 cursor-pointer hover:bg-blue-100">
              <Upload className="w-8 h-8 text-blue-600" />
              <span className="mt-2 text-base leading-normal text-blue-600">
                Select audio file
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="audio/*"
                disabled={isUploading}
              />
            </label>

            {selectedFile && (
              <div className="mt-4 text-sm text-slate-600">
                Selected file:{" "}
                <span className="font-medium">{selectedFile.name}</span> (
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 mt-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Language (Optional)
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            Select a language or leave empty for auto-detection
          </p>
          <select
            className="w-full p-2 border border-slate-300 rounded-md"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            disabled={isUploading}
          >
            <option value="">Auto-detect</option>
            <option value="en">English</option>
            <option value="zh">Mandarin</option>
            <option value="yue">Cantonese</option>
          </select>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={uploadAudio}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-lg text-white"
          disabled={isUploading || (!audioBlob && !selectedFile)}
        >
          {isUploading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Upload and Process"
          )}
        </Button>
      </div>

      {isUploading && (
        <div className="mt-6">
          <p className="font-bold text-sm text-slate-600 mb-2">
            {uploadProgress < 100
              ? `${Number(uploadProgress)}%`
              : "Complete! Redirecting..."}
          </p>
          <Progress value={uploadProgress} className="h-5 my-3" />
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default RecordPage;

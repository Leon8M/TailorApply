"use client";
import { useState } from "react";
import copy from 'clipboard-copy';
import { improveResume } from "../utils/api";
import DownloadButton from "./DownloadButton";

export default function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [userQualifications, setUserQualifications] = useState("");
  const [resume, setResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResume = async () => {
    if (!jobDescription.trim() || !userQualifications.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { improvedText, error } = await improveResume(jobDescription, userQualifications);
      if (error) throw new Error(error);
      setResume(improvedText);
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Resume Generator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Job Description
          </label>
          <textarea
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Your Qualifications
          </label>
          <textarea
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
            placeholder="List your skills, experience, and education..."
            value={userQualifications}
            onChange={(e) => setUserQualifications(e.target.value)}
            rows={6}
          />
        </div>

        <button
          onClick={generateResume}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${isLoading 
            ? 'bg-gray-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-lg'}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : 'Generate Resume'}
        </button>

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {resume && (
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">Your Custom Resume</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => copy(resume)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Copy to Clipboard
                </button>
                <DownloadButton content={resume} filename="tailored-resume.pdf" />
              </div>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <pre className="whitespace-pre-wrap font-sans text-gray-100">{resume}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
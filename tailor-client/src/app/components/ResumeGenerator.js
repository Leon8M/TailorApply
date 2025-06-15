"use client";
import { use, useState } from "react";
import copy from 'clipboard-copy';
import { improveResume } from "../utils/api";

export default function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResume = async () => {
    setIsLoading(true);
    const { improvedText } = await improveResume(jobDescription);
    setResume(improvedText);
    setIsLoading(false);
  };

  return (
    <div>
      <textarea
        placeholder="Paste job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={generateResume} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Resume"}
      </button>
      {resume && (
        <div>
          <pre>{resume}</pre>
          <button onClick={() => copy(resume)}>Copy to Clipboard</button>
          <DownloadButton content={resume} filename="resume.pdf" />
        </div>
      )}
    </div>
  );
}
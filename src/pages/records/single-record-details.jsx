import React, { useState } from "react";

// import component
import RecordDetailsHeader from "./components/record-details-header";
import FileUploadModal from "./components/file-upload-modal";

// import ReactMarkdown
import ReactMarkdown from "react-markdown";

// import Icons
import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";

// import  react Router
import { useLocation, useNavigate } from "react-router-dom";

// import context Api
import { useGlobalContext } from "../../context";

// import GeminiAI
import { GoogleGenerativeAI } from "@google/generative-ai";

// import environmental variable
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

const SingleRecordDetails = () => {
  const { state } = useLocation();
  //   console.log(state);

  // state to store analysis results
  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );

  // destructure useNavigate
  const { navigate } = useNavigate;

  // destructure useGlobalContext
  const {
    file,
    setFile,
    uploading,
    setUploading,
    uploadSuccess,
    setUploadSuccess,
    processing,
    // setProcessing,
    updateRecord,
    handleOpenModal,
    handleCloseModal,
    isModalOpen,
    filename,
    setFilename,
    filetype,
    setFileType,
  } = useGlobalContext();

  // function to upload a file from the upload modal
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileType(file.type);
    setFilename(file.name);
    setFile(file);
  };

  // read the file as a base64 encoded string
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // function to handle the file upload file and send a prompt to the Gemini AI
  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    // initialize GenerativeAI API key
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      // return the file as base64 encoded string
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        { inlineData: { data: base64Data, mimeType: filetype } },
      ];

      // getting the Generative model from google generative AI
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // creating the prompt variable
      const prompt = `You are an expert health and any disease diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatments. Give a detailed treatment plan for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable.`;

      // variable to hold results
      const results = await model.generateContent([prompt, imageParts]);

      // variable to get the response
      const response = await results.response;

      // variable to get text from response
      const text = response.text();

      setAnalysisResult(text);

      // function to update the record table with our analysis results
      const updatedRecord = await updateRecord({
        documentID: state.id,
        analysisResult: text,
        kanbanRecords: "",
      });
      setUploadSuccess(true);
      handleCloseModal(false); // Close the modal after a successful upload
      setFilename("");
      setFile(null);
      setFileType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
      handleCloseModal(false);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-[26px]">
        <button
          type="button"
          onClick={handleOpenModal}
          className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-modal_bg dark:text-white dark:hover:bg-neutral-800"
        >
          <IconFileUpload />
          Upload Reports
        </button>

        <FileUploadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onFileChange={handleFileChange}
          onFileUpload={handleFileUpload}
          uploading={uploading}
          uploadSuccess={uploadSuccess}
          filename={filename}
        />
        <RecordDetailsHeader recordName={state.recordName} />

        <div className="w-full">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-modal_bg">
                  <div className="border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                      Personalized AI-Driven Treatment Plan
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      A tailored medical strategy leveraging advanced AI
                      insights.
                    </p>
                  </div>

                  <div className="flex w-full flex-col px-6 py-4 text-white">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Analyze Result
                      </h2>
                      <div className="space-y-2">
                        {/* {analysisResult} */}
                        <ReactMarkdown>{analysisResult}</ReactMarkdown>
                        {/* {rendering results } */}
                      </div>
                    </div>
                    <div className="mt-5 grid gap-2 sm:flex">
                      <button
                        type="button"
                        // onClick={processTreatmentPlan}
                        className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                      >
                        View Treatment plan
                        <IconChevronRight size={20} />
                        {/* {processing && (
                          <IconProgress
                            size={10}
                            className="mr-3 h-5 w-5 animate-spin"
                          />
                        )} */}
                        {processing && (
                          <IconProgress
                            size={10}
                            className="mr-3 h-5 w-5 animate-spin"
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        <span className="font-semibold text-gray-800 dark:text-neutral-200"></span>
                      </p>
                    </div>
                    <div>
                      <div className="inline-flex gap-x-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRecordDetails;

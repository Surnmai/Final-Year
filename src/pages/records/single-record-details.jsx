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
  // console.log(state);

  // state to store analysis results
  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );

  // destructure useNavigate
  const navigate = useNavigate();

  // destructure useGlobalContext
  const {
    file,
    setFile,
    uploading,
    setUploading,
    uploadSuccess,
    setUploadSuccess,
    processing,
    setProcessing,
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
    // console.log(e.target.files[0]);

    const file = e.target.files[0];
    setFileType(file.type);
    setFilename(file.name);
    setFile(file);
  };

  // read the file as a base64 encoded string from the file state when changed
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the data URL prefix
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // console.log(readFileAsBase64);

  // function to handle the file upload file and send a prompt to the Gemini AI
  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    // initialize GenerativeAI API key
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    try {
      // return the file as base64 encoded string
      const base64Data = await readFileAsBase64(file);

      // return image or document type
      const imageParts = [
        { inlineData: { data: base64Data, mimeType: filetype } },
      ];

      // getting the Generative model from google generative AI
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      // creating the prompt variable
      const prompt = `You are an expert health and any disease diagnosis analyst. You can tell the kind of disease based on the symptoms provided. Use your knowledge base to answer questions about giving personalized recommended treatments. Give a detailed treatment plan and what the disease might be for me, make it more readable, clear and easy to understand make it paragraphs to make it more readable.`;

      // variable to hold results
      const results = await model.generateContent([prompt, imageParts]);

      // variable to get the response
      const response = await results.response;

      // variable to get text from response
      const text = response.text();

      // get the text generated and pass it here
      setAnalysisResult(text);

      // function assigned to a varaible to update the record table with our analysis results
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

  // process treatment function
  const processTreatmentPlan = async () => {
    setProcessing(true);

    // initialize GenerativeAI API key
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    // gemini - 1.5 - flash - latest
    // getting the Generative model from google generative AI
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // creating the prompt variable
    const prompt = `Your role and goal is to be an that will be using this treatment plan ${analysisResult} to create Columns:
                - Todo: Tasks that need to be started
                - Doing: Tasks that are in progress
                - Done: Tasks that are completed
          
                Each task should include a brief description. The tasks should be categorized appropriately based on the stage of the treatment process.
          
                Please provide the results in the following  format for easy front-end display no quotating or what so ever just pure the structure below:

                {
                  "columns": [
                    { "id": "todo", "title": "Todo" },
                    { "id": "doing", "title": "Work in progress" },
                    { "id": "done", "title": "Done" }
                  ],
                  "tasks": [
                    { "id": "1", "columnId": "todo", "content": "Example task 1" },
                    { "id": "2", "columnId": "todo", "content": "Example task 2" },
                    { "id": "3", "columnId": "doing", "content": "Example task 3" },
                    { "id": "4", "columnId": "doing", "content": "Example task 4" },
                    { "id": "5", "columnId": "done", "content": "Example task 5" }
                  ]
                }
                            
                `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // const text = response.text();

    let text = response.text();

    // Clean the response by removing markdown code block markers
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // parse the string to JSON
    const parsedResponse = JSON.parse(text);

    // console.log(text);
    // console.log(parsedResponse);

    // update the record with the generated kabbanboard data
    const updatedRecord = await updateRecord({
      documentID: state.id,
      kanbanRecords: text,
    });
    // console.log(updatedRecord);

    navigate("/screening-schedules", { state: parsedResponse });
    setProcessing(false);
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
                        Analyzed Result
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
                        onClick={processTreatmentPlan}
                        className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                      >
                        View Treatment plan
                        <IconChevronRight size={20} />
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

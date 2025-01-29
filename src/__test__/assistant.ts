// https://platform.openai.com/docs/assistants/tools/file-search?lang=node.js

import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
// import "dotenv/config";

// const apiKey = process.env.OPENAI_API_KEY;
const apiKeyPath = path.join(__dirname, '../../.env/openai_key');
const apiKey = fs.readFileSync(apiKeyPath, 'utf8');
const apiBaseUrl = "https://api.openai.com/v1";

// ✅ **Step 1: Create an Assistant**
const createAssistant = async (): Promise<string> => {
    const response = await axios.post(
        `${apiBaseUrl}/assistants`,
        {
            // model: "gpt-4-turbo",
            model: "gpt-4o-mini",
            name: "Document Assistant",
            instructions: "Answer questions based on uploaded files.",
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "OpenAI-Beta": "assistants=v2"
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );
    console.log("✅ Assistant Created:", response.data.id);
    return response.data.id;
};

// ✅ **Step 2: Upload a File**
const uploadFile = async (filePath: string): Promise<string> => {
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", fileStream);
    formData.append("purpose", "assistants");

    const response = await axios.post(`${apiBaseUrl}/files`, formData, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            ...formData.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    });

    console.log("✅ File Uploaded:", response.data.id);
    return response.data.id;
};

// ✅ **Step 3: Create a Thread and Attach File**
const createThread = async (fileId: string): Promise<string> => {
    const response = await axios.post(
        `${apiBaseUrl}/threads`,
        {
            // file_ids: [fileId],
            // messages: [
            //     {
            //         role: "user",
            //         content: "Here is a document for reference.",
            //         file_ids: [fileId],
            //     },
            // ],
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "OpenAI-Beta": "assistants=v2"
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        }
    );
    console.log("✅ Thread Created:", response.data.id);
    return response.data.id;
};

// ✅ **Step 4: Ask a Question**
const askQuestion = async (threadId: string, assistantId: string, question: string, fileId: string) => {
    // Start a run (a new conversation session)
    const runResponse = await axios.post(
        `${apiBaseUrl}/threads/${threadId}/runs`,
        { 
            assistant_id: assistantId,
            additional_instructions: "Use the uploaded document to answer queries.",
            tools: [{ type: "file_search" }],
            // file_ids: [fileId],
        },
        { 
            headers: { 
                Authorization: `Bearer ${apiKey}`, 
                "Content-Type": "application/json", 
                "OpenAI-Beta": "assistants=v2" 
            } 
        }
    );

    console.log("✅ Run Started:", runResponse.data.id);

    // Wait for completion
    // let runStatus = "";
    // do {
    //     await new Promise((resolve) => setTimeout(resolve, 2000));
    //     const statusResponse = await axios.get(`${apiBaseUrl}/threads/${threadId}/runs/${runResponse.data.id}`, {
    //         headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
    //     });
    //     runStatus = statusResponse.data.status;
    //     console.log("⏳ Run Status:", runStatus);
    // } while (runStatus !== "completed");

    // Fetch Messages
    const messagesResponse = await axios.post(
        `${apiBaseUrl}/threads/${threadId}/messages`, 
        {
            role: "user",
            content: question,
        },
        {
            headers: { 
                Authorization: `Bearer ${apiKey}`, 
                "OpenAI-Beta": "assistants=v2" 
        }
    });

    const answer = messagesResponse.data.data[0]?.content;
    console.log("✅ Assistant Answer:", answer);
    return answer;
};

const checkAvailableModels = async () => {
    const response = await axios.get("https://api.openai.com/v1/models", {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    console.log("✅ Available Models:", response.data);
};

// ✅ **Run Everything**
(async () => {
    // checkAvailableModels();
    try {
        // const assistantId = await createAssistant();
        // const filePath = path.join(__dirname, "large_document.pdf");
        // const filePath = path.join(__dirname, '../../.env/bioMedEncText.txt');
        // const fileId = await uploadFile(filePath);
        const assistantId = 'asst_AlIpsP68CDDYLQ24GjXSqeKa';
        const fileId = 'file-QapcnGU3SfMKQmGyDEuZAH';
        const threadId = await createThread(fileId);
        // const answer = await askQuestion(threadId, assistantId, "Summarize this document.");
        const q = "find entries for ion channel related diseases."
        const answer = await askQuestion(threadId, assistantId, q, fileId);
        console.log("💡 Answer:", answer);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Axios Error:", error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error("❌ General Error:", error.message);
        } else {
            console.error("❌ Unknown Error:", error);
        }    
    }
})();

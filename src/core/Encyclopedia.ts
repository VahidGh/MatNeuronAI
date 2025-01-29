import * as pdfjsLib from 'pdfjs-dist';
import fs from 'fs';
import { LLMAnalyzer } from './LLMAnalyzer';

export class Encyclopedia {

    fetchEntries(topics: string[]): string[] {
        console.log(`Fetching entries for topics: ${topics.join(", ")}`);
        return topics.map(topic => `${topic} entry`);
    }
    
    async pdfToText(pdfPath: string, outputFilePath: string): Promise<void> {
        console.log(`Text is going to be extracted from ${pdfPath}`);
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        const numPages = pdf.numPages;
        console.log('Number of pages: ', numPages);
        let textContent = '';
        
        // Loop through each page and extract text
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            textContent += content.items.map((item: any) => item.str).join(' ') + '\n';
        }
        
        // return textContent;
        fs.writeFileSync(outputFilePath, textContent, 'utf8');
        console.log(`Text extracted and saved to ${outputFilePath}`);
    };
    
    async handlePdfTextQuery(filePath: string, apiKey: string, query: string) {
        try {
            // Step 1: Extract text from the PDF
            const extractedText = fs.readFileSync(filePath, 'utf8');
            // console.log('Extracted Text from file:', extractedText);
            
            // Step 2: Create a prompt combining the extracted text with the user query
            const prompt = `${extractedText}\n\nQuestion: ${query}\nAnswer:`;
            
            // Step 3: Send the prompt to OpenAI and get the response
            const llm = new LLMAnalyzer();
            const answer = await llm.queryTextOpenAI(prompt, apiKey);
            console.log('OpenAI Answer:', answer);
        } catch (error) {
            console.error('Error:', error);
        }
    };

}
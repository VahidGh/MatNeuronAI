/* MatNeuronAI - A TypeScript library for generating and integrating code from various sources */

import { Encyclopedia } from "./Encyclopedia";
import { CodeFetcher } from "./CodeFetcher";
import { MathDetector } from "./MathDetector";
import { CodeManager } from "./CodeManager";
import { Executor } from "./Executor";
import { LLMAnalyzer } from "./LLMAnalyzer";
import fs from 'fs';
import path from 'path';

export class MatNeuronAI {
    private encyclopedia: Encyclopedia;
    private codeFetcher: CodeFetcher;
    private mathDetector: MathDetector;
    private codeManager: CodeManager;
    private executor: Executor;
    private llmAnalyzer: LLMAnalyzer;

    constructor() {
        console.log("MatNeuronAI initialized");
        this.encyclopedia = new Encyclopedia();
        this.codeFetcher = new CodeFetcher();
        this.mathDetector = new MathDetector();
        this.codeManager = new CodeManager();
        this.executor = new Executor();
        this.llmAnalyzer = new LLMAnalyzer();
    }

    defineTopic(topic: string): void {
        console.log(`Topic defined: ${topic}`);

        // const enc = new Encyclopedia();
        const bioMedEncTextPath = path.join(__dirname, '../../.env/bioMedEncText.txt');
        // const bioMedEncPdfPath = path.join(__dirname, '../../.env/Encyclopedia\ of\ Biomaterials\ and\ Biomedical\ Engineering.pdf');
        const bioMedEncPdfPath = '/Users/vghayoomie/Desktop/books/Encyclopedia\ of\ Biomaterials\ and\ Biomedical\ Engineering.pdf';

        if (fs.existsSync(bioMedEncTextPath)) {
            console.log('The file exists locally.');
        } else {
            console.log('The file does not exist locally.');
            this.encyclopedia.pdfToText(bioMedEncPdfPath,bioMedEncTextPath);
        }
        this.encyclopedia.handlePdfTextQuery(bioMedEncTextPath,'',topic);
    }

    async suggestEntries(topic: string): Promise<string[]> {
        const bestMatches = await this.llmAnalyzer.analyzeTopic(topic);
        return this.encyclopedia.fetchEntries(bestMatches);
    }

    annotateEntry(entry: string): void {
        console.log(`Annotated entry: ${entry}`);
    }

    defineDetails(entry: string, details: string[]): void {
        console.log(`Details for ${entry}: ${details.join(", ")}`);
    }

    fetchSampleCode(topic: string): Record<string, string> {
        return this.codeFetcher.fetchSampleCode(topic);
    }

    detectMathematicalSimulation(code: string): boolean {
        return this.mathDetector.detect(code);
    }

    suggestMathEntries(): string[] {
        return this.mathDetector.suggestMathEntries();
    }

    annotateMathFunction(mathFunction: string): void {
        console.log(`Annotated mathematical function: ${mathFunction}`);
    }

    manageCode(action: string, code: string): void {
        this.codeManager.manage(action, code);
    }

    executeCode(language: string, code: string): void {
        this.executor.execute(language, code);
    }
}

export default MatNeuronAI;

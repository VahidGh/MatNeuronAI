export class CodeFetcher {
    fetchSampleCode(topic: string): Record<string, string> {
        console.log(`Fetching sample code for topic: ${topic}`);
        return {
            Python: `# Sample Python code for ${topic}\ndef example():\n    pass`,
            JavaScript: `// Sample JavaScript code for ${topic}\nfunction example() {}`
        };
    }
}
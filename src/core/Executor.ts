export class Executor {
    execute(language: string, code: string): void {
        console.log(`Executing code in ${language}:\n${code}`);
    }
}
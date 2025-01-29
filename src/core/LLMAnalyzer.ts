import axios from 'axios';
import fs from 'fs';
import path from 'path';

export class LLMAnalyzer {
    async analyzeTopic(topic: string): Promise<string[]> {
        console.log(`Analyzing topic using LLM: ${topic}`);
        // Simulated response from LLM API (replace with actual API call)
        return [
            `${topic} - Wikipedia`,
            `${topic} - Encyclopedia of Biomaterials`,
            `${topic} - Klein's Encyclopedia`
        ];
    }

    async queryTextOpenAI(prompt: string, apiKey: string = ''): Promise<string> {

        if(apiKey === ''){
            const apiKeyPath = path.join(__dirname, '../../.env/openai_key');
            const apiKey = fs.readFileSync(apiKeyPath, 'utf8');
        }

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.5,
                stream: true,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        response.data.on('data', (chunk: any) => {
            // Handle each chunk of data as it arrives
            console.log(chunk.toString());
        });
        
        // const response = await axios.post(
        //     'https://api.openai.com/v1/completions',
        //     {
        //         model: 'text-davinci-003',
        //         prompt: prompt,
        //         max_tokens: 100,
        //         temperature: 0.5,
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${apiKey}`,
        //             'Content-Type': 'application/json',
        //         },
        //         maxBodyLength: Infinity,
        //         maxContentLength: Infinity,
        //     }
        // );
    
        return response.data.choices[0].text.trim();
    };

    async queryChatOpenAI(prompt: string, apiKey: string = ''): Promise<string> {

        if(apiKey === ''){
            const apiKeyPath = path.join(__dirname, '../../.env/openai_key');
            const apiKey = fs.readFileSync(apiKeyPath, 'utf8');
        }

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        return response.data.choices[0].text.trim();
    };
}

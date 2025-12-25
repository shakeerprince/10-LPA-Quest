// Google Gemini API Client
// Get your free API key from: https://aistudio.google.com

// Using gemini-2.0-flash - currently available model (Dec 2024)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface GeminiResponse {
    candidates: {
        content: {
            parts: { text: string }[];
        };
    }[];
    error?: {
        code: number;
        message: string;
        status: string;
    };
}

// System prompt for 10 LPA Quest AI Mentor
const SYSTEM_PROMPT = `You are an AI Mentor for "10 LPA Quest" - a gamified job preparation tracker for someone aiming to crack a 10 LPA (₹10 Lakh Per Annum) tech job in 6 months.

Your role is to help with:
1. **DSA (Data Structures & Algorithms)** - Explain concepts, solve LeetCode problems, analyze time/space complexity
2. **Web Development** - React, Next.js, Node.js, databases, APIs
3. **System Design** - Architecture patterns, scalability, databases
4. **Interview Prep** - Behavioral questions, coding interviews, HR rounds
5. **Career Guidance** - Resume tips, job search strategies, negotiation

Guidelines:
- Be encouraging and motivating - this is a challenging journey!
- Provide clear, concise explanations with examples
- When explaining code, use proper formatting with code blocks
- For DSA problems, always explain the approach before the solution
- Use simple language, avoiding unnecessary jargon
- Keep responses focused and actionable
- Use emojis occasionally to keep things fun 🚀

Remember: The user has 6 months to prepare. Encourage consistent daily practice!`;

// Track last request time for rate limiting
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 4000; // 4 seconds between requests (15 RPM limit)

// Sleep helper
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessageToGemini(
    messages: ChatMessage[],
    apiKey: string,
    mode: 'general' | 'dsa' | 'code-review' | 'interview' = 'general'
): Promise<string> {
    if (!apiKey) {
        throw new Error('API key is required. Please add your Gemini API key in Settings.');
    }

    // Throttle requests to avoid rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        await sleep(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    // Build conversation history
    const conversationHistory = messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
    }));

    // Add mode-specific context
    let modeContext = '';
    switch (mode) {
        case 'dsa':
            modeContext = '\n\nFocus on DSA topics. Explain algorithms step-by-step, provide time/space complexity, and suggest practice problems.';
            break;
        case 'code-review':
            modeContext = '\n\nThe user is asking for code review. Analyze the code for bugs, performance issues, best practices, and suggest improvements.';
            break;
        case 'interview':
            modeContext = '\n\nThis is interview preparation mode. Act like an interviewer, ask follow-up questions, and provide constructive feedback.';
            break;
    }

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT + modeContext }],
            },
            {
                role: 'model',
                parts: [{ text: "I'm your AI Mentor for the 10 LPA Quest! 🚀 I'm here to help you with DSA, coding, system design, and interview prep. Let's crush your goals together! What would you like to work on?" }],
            },
            ...conversationHistory,
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
        },
    };

    // Retry logic with exponential backoff
    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data: GeminiResponse = await response.json();

            if (!response.ok) {
                console.error('Gemini API Error:', data);

                // Check for quota exhaustion in error message
                const errorMessage = data.error?.message || '';
                const errorStatus = data.error?.status || '';

                if (errorStatus === 'RESOURCE_EXHAUSTED' || errorMessage.includes('quota')) {
                    throw new Error('⚠️ Your API key quota is exhausted for today. The free tier has a daily limit. Options:\n\n1. Wait until tomorrow (quota resets daily)\n2. Create a new API key at aistudio.google.com\n3. Enable billing for higher limits');
                }

                // Handle rate limiting with retry
                if (response.status === 429) {
                    const waitTime = Math.pow(2, attempt + 1) * 10000; // 20s, 40s, 80s
                    if (attempt < maxRetries - 1) {
                        console.log(`Rate limited. Waiting ${waitTime / 1000}s before retry...`);
                        await sleep(waitTime);
                        continue;
                    }
                    throw new Error(`Rate limit exceeded. The free Gemini API has a limit of ~15 requests per minute. Please wait a minute and try again. 💡 Tip: Consider upgrading to a paid API key for higher limits.`);
                }
                if (response.status === 400) {
                    throw new Error('Invalid API key or request. Please check your key in Settings.');
                }
                if (response.status === 403) {
                    throw new Error('API key does not have permission. Please check your key in Google AI Studio.');
                }
                if (response.status === 404) {
                    throw new Error('Model not found. Please try again later.');
                }
                if (response.status === 500 || response.status === 503) {
                    if (attempt < maxRetries - 1) {
                        await sleep(5000);
                        continue;
                    }
                    throw new Error('Gemini service is temporarily unavailable. Please try again in a few moments.');
                }
                throw new Error(data.error?.message || `API Error: ${response.status}`);
            }

            if (!data.candidates || data.candidates.length === 0) {
                throw new Error('No response generated. Please try again.');
            }

            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            lastError = error as Error;
            console.error(`Attempt ${attempt + 1} failed:`, error);

            // Don't retry for certain errors
            if (lastError.message.includes('API key') || lastError.message.includes('permission')) {
                throw lastError;
            }

            // Wait before retry for network errors
            if (attempt < maxRetries - 1) {
                await sleep(Math.pow(2, attempt) * 2000);
            }
        }
    }

    throw lastError || new Error('Failed to get response after multiple attempts. Please try again.');
}

// Quick prompts for different categories
export const QUICK_PROMPTS = {
    dsa: [
        "Explain Two Sum problem with optimal solution",
        "What's the difference between BFS and DFS?",
        "How does dynamic programming work?",
        "Explain sliding window technique",
        "What are the common sorting algorithms?",
    ],
    webdev: [
        "Explain React useEffect hook",
        "How does Next.js routing work?",
        "What is server-side rendering?",
        "Explain REST vs GraphQL",
        "How to optimize React performance?",
    ],
    systemDesign: [
        "Design a URL shortener system",
        "How to design a rate limiter?",
        "Explain database sharding",
        "What is load balancing?",
        "Design a chat application",
    ],
    interview: [
        "Common behavioral interview questions",
        "How to introduce yourself in interviews?",
        "Tell me about a challenging project",
        "How to negotiate salary?",
        "Questions to ask the interviewer",
    ],
};

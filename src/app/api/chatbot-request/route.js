import OpenAI from 'openai';
import { NextResponse as res} from 'next/server';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
});

export function GET(req) {
    return res.json({error: "Method GET not allowed."}, {status: 405})
};

export async function POST(req) {
    const { prompt, context, model} = await req.json();
    
    const result = await callAI(prompt, context, model);
    return res.json(result.choices[0].message, {status: 200});
};

async function callAI(prompt, context, model) {
    const setup = {
        model: model,
        messages: prompt.concat(context),
    };

    const result = await openai.chat.completions.create(setup);
    return result;
}
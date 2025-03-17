"use client"

import style from './page.module.css';
import Header from '@components/header/header';
import { useState, useRef } from 'react';
import OpenAI from 'openai';

export default function ChatbotLobby() {
    const MODELS = {
        "Mistral-7B-Instrcut": "mistralai/mistral-7b-instruct:free",
        "Qwen2-7B-Instruct": "qwen/qwen-2-7b-instruct:free",
        "OpenChat-3.5-7B": "openchat/openchat-7b:free",
        "HuggingFace:Zephyr-7B": "huggingfaceh4/zephyr-7b-beta:free"
    };
    const BASE_PROMPT = "You must write a concise and detailed response to the user's question. The user is the one you will be talking to.";
    const [chatLog, setChatLog] = useState([]);
    const [model, setModel] = useState("HuggingFace:Zephyr-7B");
    const promptInput = useRef();
    const textInput = useRef();

    async function sendText() {
        const inputEle = textInput.current;

        const input = inputEle.value;
        if (input === "") {
            console.log("Can't accept empty message.");
            return;
        };

        inputEle.value = "";
        
        let sysPrompt = promptInput.current.value;
        if (sysPrompt === "") {
            sysPrompt = "You are a helpfull assistant."
        };

        const message = {role: "user", content: input};
        const prompt = [{role: "system", content: BASE_PROMPT + "\n" + sysPrompt}];
        const context = chatLog.concat(message);
        console.log(prompt);

        inputEle.disabled = true;
        let result
        try {
            const res = await fetch('/api/chatbot-request', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                prompt: prompt,
                context: context,
                model: MODELS[model],
                }),
            })
            result = await res.json();
        } catch (err) {
            throw new Error("Failed to fetch the request.")
        };
        
        context.push(result);
        setChatLog(context);
        inputEle.disabled = false;
    };

    const updateInputAreaHeight = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    /**
     * @param {string} text - The string text to be formated.
     * @returns {string} The formated string.
     */
    function formatText(text) {
        const parts = text.split(/(\*{1,2}.*?\*{1,2})/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={index} className={style.messageBold}>{part.slice(2, -2)}</span>;
            } else if (part.startsWith('*') && part.endsWith('*')) {
                return <span key={index} className={style.messageItalic}>{part.slice(1, -1)}</span>;
            }
            return part;
        })
    };

    return (
        <>
            <Header />
            <div className={style.container}>
                <span style={{color: '#eee'}}>Current model: 
                    <select className={`${style.modelSelect}`} onChange={(e) => setModel(e.target.value)} value={model}>
                        <option value="HuggingFace:Zephyr-7B">HuggingFace:Zephyr-7B"</option>
                        <option value="Mistral-7B-Instrcut">Mistral-7B-Instrcut"</option>
                        <option value="Qwen2-7B-Instruct">Qwen2-7B-Instruct"</option>
                        <option value="OpenChat-3.5-7B">OpenChat-3.5-7B"</option>
                    </select>
                </span>
                <div className={style.chatPrompt}>
                    <label htmlFor="sysPrompt">Prompt</label>
                    <textarea id="sysPrompt" spellCheck="false" ref={promptInput}/>
                </div>
                <div className={style.chatLog}>
                    {chatLog.map((message, i) => {
                        return (
                            <div key={i} className={message.role === 'user'? `${style.messageUser}` : `${style.messageBot}`}>
                                {formatText(message.content)}
                            </div>
                        )
                    })}
                </div>
                <div className={style.inputField}>
                <textarea ref={textInput} spellCheck="false" onInput={updateInputAreaHeight} onKeyDown={(e) => {
                    if (e.key === 'Enter' && !event.ctrlKey && !event.altKey && !event.shiftKey) {event.preventDefault(); sendText();} }}
                />
                <button type="button" onClick={sendText}>Send</button>
                </div>
            </div>

        </>
    )
};
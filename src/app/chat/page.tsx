"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: "Hello! How can I assist you today?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content:
          "I'm your travel assistant. Tell me where you'd like to travel, and I'll help you plan your trip!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto pb-4 px-1">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${
                message.sender === "user"
                  ? "chat-bubble-user"
                  : "chat-bubble-ai"
              }`}
            >
              <p>{message.content}</p>
              <div
                className={`text-xs mt-1 text-muted-foreground ${
                  message.sender === "user" ? "text-right" : ""
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="border-t pt-4 sticky bottom-0 bg-background"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your guide..."
            className="flex-1 rounded-full border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-full p-2.5 hover:opacity-90"
            disabled={!input.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, Clock } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";
import { chatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useWelcomePopup } from "@/hooks/use-welcome-popup";
import WelcomePopup from "@/components/WelcomePopup";

type ChatRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isWelcomeOpen,
    isLoading: isWelcomeLoading,
    closeWelcomePopup,
  } = useWelcomePopup();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      content: t("chat.assist"),
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: (userMessage: Message) => {
      const chatMessages = messages.map((msg) => ({
        role:
          msg.sender === "user"
            ? ("user" as ChatRole)
            : ("assistant" as ChatRole),
        content: msg.content,
      }));

      return chatResponse([
        ...chatMessages,
        { role: "user" as ChatRole, content: userMessage.content },
      ]);
    },
    onSuccess: (data) => {
      if (!data) {
        toast.error(t("errors.error"));
        return;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: data.content || "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    mutate(userMessage);
  };

  return (
    <>
      <WelcomePopup
        isOpen={isWelcomeOpen && !isWelcomeLoading}
        onClose={closeWelcomePopup}
      />

      <div className="flex flex-col w-full mx-auto justify-between h-full">
        {/* Chat Header */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="p-2 rounded-full bg-primary/10">
            <MessageSquare className="text-primary h-6 w-6" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {t("chat.travelAssistant")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("chat.travelAssistantDescription")}
            </p>
          </div>
        </div>

        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto  py-3 space-y-6  scroll-smooth"
        >
          {messages.map((message, index) => {
            const isFirstMessageOfGroup =
              index === 0 || messages[index - 1].sender !== message.sender;
            const isLastMessageOfGroup =
              index === messages.length - 1 ||
              messages[index + 1].sender !== message.sender;

            return (
              <div
                key={message.id}
                className={cn(
                  "chat-message-container",
                  message.sender === "user" ? "justify-end" : "justify-start",
                  !isFirstMessageOfGroup && !isLastMessageOfGroup
                    ? "my-1"
                    : "my-3"
                )}
              >
                <div
                  className={cn(
                    "chat-bubble flex flex-col",
                    message.sender === "user"
                      ? "chat-bubble-user rounded-2xl rounded-tr-sm"
                      : "chat-bubble-ai rounded-2xl rounded-tl-sm",
                    "md:max-w-[70%] lg:max-w-[40%] max-w-[85%]",
                    "shadow-sm"
                  )}
                >
                  <p className="text-base">{message.content}</p>
                  <div
                    className={cn(
                      "text-xs mt-1.5",
                      message.sender === "user"
                        ? "text-right text-yellow-800"
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSendMessage}
          className="flex-end border-t pt-4 sticky bottom-0 bg-background"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.askGuide")}
              className="flex-1 rounded-full border px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground rounded-full p-4 hover:opacity-90 transition-colors"
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;

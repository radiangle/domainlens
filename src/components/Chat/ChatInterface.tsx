"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "@/components/ui";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { mockChatMessages } from "@/data/mockData";
import type { ChatMessage } from "@/lib/types";

interface ChatInterfaceProps {
  systemPrompt?: string;
}

export function ChatInterface({ systemPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load mock messages with staggered timing for demo effect
    const loadMessages = async () => {
      for (let i = 0; i < mockChatMessages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMessages((prev) => [
          ...prev,
          {
            ...mockChatMessages[i],
            id: `msg-${i}`,
            timestamp: Date.now(),
          },
        ]);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (content: string) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "agent",
        content:
          "I understand your question. Based on my analysis of the steel sample characteristics you've described, I would recommend performing additional electrochemical testing to confirm the diagnosis. Would you like me to elaborate on the specific testing procedures?",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card accentColor="cyan" className="flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary">
                Steel Defect Analysis Agent
              </h3>
              <p className="text-xs text-text-muted">
                Powered by DomainLens
              </p>
            </div>
          </div>
          <Badge color="cyan" size="sm">
            Online
          </Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message, index) => (
            <Message key={message.id} message={message} index={index} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-background-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="pt-4 border-t border-border">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </Card>
    </motion.div>
  );
}

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users } from "lucide-react";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import OpenMenu from "./_components/openMenu";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

export default function ChatPage({
  params
}: {
    params: {id : string}
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "I saw your ad for the Laptop v23",
      sender: "user",
      timestamp: "6:21 PM",
    },
    {
      id: "2",
      content: "is it still available?",
      sender: "user",
      timestamp: "6:21 PM",
    },
    {
      id: "3",
      content: "Yes, the Laptop v23 is definitely in stock",
      sender: "store",
      timestamp: "6:22 PM",
    },
    {
      id: "4",
      content:
        "Great! That sounds exactly what I need. Can you tell me a little more about the specs? Does it have good RAM and storage?",
      sender: "user",
      timestamp: "6:23 PM",
    },
    {
      id: "5",
      content:
        "It comes standard with 16GB of DDR4 RAM and a spacious 512GB SSD.",
      sender: "store",
      timestamp: "6:24 PM",
    },
    {
      id: "6",
      content:
        "I'd like to go ahead and order the Laptop v23 with the dedicated graphics card, Thank you.",
      sender: "user",
      timestamp: "6:25 PM",
    },
    {
      id: "6",
      content:
        "I'd like to go ahead and order the Laptop v23 with the dedicated graphics card, Thank you.",
      sender: "user",
      timestamp: "6:25 PM",
    },
    {
      id: "6",
      content: `Your branch is a safe place to make changes. If you make a mistake, you can revert your changes or push additional changes to fix the mistake. Your changes will not end up on the default branch until you merge your branch.
  
        Commit and push your changes to your branch. Give each commit a descriptive message to help you and future contributors understand what changes the commit contains. For example, fix typo or increase rate limit.
        
        Ideally, each commit contains an isolated, complete change. This makes it easy to revert your changes if you decide to take a different approach. For example, if you want to rename a variable and add some tests, put the variable rename in one commit and the tests in another commit. Later, if you want to keep the tests but revert the variable rename, you can revert the specific commit that contained the variable rename. If you put the variable rename and tests in the same commit or spread the variable rename across multiple commits, you would spend more effort reverting your changes.
        
        By committing and pushing your changes, you back up your work to remote storage. This means that you can access your work from any device. It also means that your collaborators can see your work, answer questions, and make suggestions or contributions.
        
        Continue to make, commit, and push changes to your branch until you are ready to ask for`,
      sender: "user",
      timestamp: "6:25 PM",
    },
    {
      id: "7",
      content: `Your branch is a safe place to make changes. If you make a mistake, you can revert your changes or push additional changes to fix the mistake. Your changes will not end up on the default branch until you merge your branch.
  
  Commit and push your changes to your branch. Give each commit a descriptive message to help you and future contributors understand what changes the commit contains. For example, fix typo or increase rate limit.
  
  Ideally, each commit contains an isolated, complete change. This makes it easy to revert your changes if you decide to take a different approach. For example, if you want to rename a variable and add some tests, put the variable rename in one commit and the tests in another commit. Later, if you want to keep the tests but revert the variable rename, you can revert the specific commit that contained the variable rename. If you put the variable rename and tests in the same commit or spread the variable rename across multiple commits, you would spend more effort reverting your changes.
  
  By committing and pushing your changes, you back up your work to remote storage. This means that you can access your work from any device. It also means that your collaborators can see your work, answer questions, and make suggestions or contributions.
  
  Continue to make, commit, and push changes to your branch until you are ready to ask for`,
      sender: "store",
      timestamp: "6:26 PM",
    },
    {
      id: "7",
      content:
        "You're very welcome! We're happy to help. If you have any questions in the meantime, please don't hesitate to reach out.",
      sender: "store",
      timestamp: "6:26 PM",
    },
  ]);



  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMsg: Message = {
        id: String(messages.length + 1),
        content: newMessage,
        sender: "user",
        timestamp: currentTime,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const isConsecutiveMessage = (index: number) => {
    if (index === 0) return false;
    return messages[index].sender === messages[index - 1].sender;
  };

  return (
    <div className="flex flex-col h-[80vh] relative px-4 bg-white rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 p-4 cursor-pointer transition-colors">
          <Avatar>
            <AvatarImage src={""} alt={"jkofnj"} />
            <AvatarFallback>{"Mo"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Mohamed {params.id}</h2>
            </div>
            {/* <span className="text-xs text-muted-foreground">04-05-2024</span> */}
          </div>
        </div>
        <OpenMenu />
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-4 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                } ${
                  isConsecutiveMessage(index)
                    ? message.sender === "user"
                      ? "rounded-3xl rounded-se-none" // رسالة مستخدم متتالية
                      : "rounded-3xl rounded-ss-none" // رسالة متجر متتالية
                    : message.sender === "user"
                    ? "rounded-3xl rounded-ee-none"
                    : "rounded-3xl rounded-es-none" // أول رسالة في التسلسل
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {/* {!isConsecutiveMessage(index) && ( */}
                <span className="text-xs text-muted-foreground block mt-1">
                  {message.timestamp}
                </span>
                {/* )} */}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message here..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

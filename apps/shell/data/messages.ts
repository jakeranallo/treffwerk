import type { Message } from "@/types"

export const messages: Message[] = [
  {
    id: "msg-001",
    title: "Welcome to Treffwerk",
    content: "Thank you for joining Treffwerk! Explore our tools and discover how they can help your community.",
    date: "2023-05-15T10:30:00Z",
    read: false,
  },
  {
    id: "msg-002",
    title: "New Tool Available: Heude",
    content: "We've just released Heude, a tool to help you track your daily mood and activities.",
    date: "2023-05-20T14:45:00Z",
    read: false,
    toolId: "heude",
  },
  {
    id: "msg-003",
    title: "Privacy Update",
    content: "We've updated our privacy policy to be even more transparent about how we protect your data.",
    date: "2023-06-01T09:15:00Z",
    read: false,
  },
]

import { v4 as uuidv4 } from "uuid"

// Generate a new user ID
export function generateUserId(): string {
  return uuidv4()
}

// Get the current user ID from localStorage
export function getUserId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("treffwerk-uuid")
}

// Set the user ID in localStorage
export function setUserId(id: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("treffwerk-uuid", id)
}

// Remove the user ID from localStorage
export function removeUserId(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("treffwerk-uuid")
}

// Check if the user is logged in
export function isLoggedIn(): boolean {
  return !!getUserId()
}

// Verify a user ID with the server (mock implementation)
export async function verifyUserId(id: string): Promise<boolean> {
  // In a real implementation, this would make a server request
  // For now, we'll just check if the ID exists in localStorage
  return id === getUserId()
}

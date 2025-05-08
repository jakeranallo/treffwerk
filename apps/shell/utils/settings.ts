// Define the structure of our settings
export interface UserSettings {
  theme: "light" | "dark"
  primaryColor: string
}

// Function to save settings to the server
export async function saveUserSettings(id: string, settings: UserSettings): Promise<boolean> {
  try {
    const response = await fetch("https://internal.users.n8n.cloud/webhook/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        settings,
      }),
      // Add these options to handle CORS and credentials
      mode: "cors",
      credentials: "omit",
    })

    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`)
      return false
    }

    const data = await response.json()
    return data.success || !!data.id
  } catch (error) {
    console.error("Failed to save settings:", error)
    // Don't throw the error, just return false to prevent app crashes
    return false
  }
}

// Function to retrieve settings from the server
export async function getUserSettings(id: string): Promise<UserSettings | null> {
  try {
    const response = await fetch("https://internal.users.n8n.cloud/webhook/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      // Add these options to handle CORS and credentials
      mode: "cors",
      credentials: "omit",
    })

    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`)
      return null
    }

    const data = await response.json()

    if (data && data.settings) {
      return data.settings as UserSettings
    }

    return null
  } catch (error) {
    console.error("Failed to retrieve settings:", error)
    // Don't throw the error, just return null to prevent app crashes
    return null
  }
}

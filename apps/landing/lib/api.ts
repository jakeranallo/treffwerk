export async function fetchDocumentContent(documentId: string) {
  try {
    const response = await fetch("https://docs.treffwerk.com/api/documents.info", {
      method: "POST",
      headers: {
        Authorization: "Bearer ol_api_BmMoMlChbmMCgovZuuU5wXOaCj1tPCJ4zZfzm0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: documentId }),
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.status}`)
    }

    const data = await response.json()

    // Extract text from the correct location in the response
    if (data.data?.text) {
      return data.data.text
    } else {
      return "Error: Unexpected response structure from API"
    }
  } catch (error) {
    return `Error loading content: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export async function listDocuments() {
  console.log("Starting API request to list documents")

  const requestUrl = "https://docs.treffwerk.com/api/documents.list"

  try {
    console.log("Sending request to Outline API documents.list...")

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer ol_api_BmMoMlChbmMCgovZuuU5wXOaCj1tPCJ4zZfzm0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      cache: "no-store",
    })

    console.log(`Response status: ${response.status}`)
    console.log(`Response status text: ${response.statusText}`)

    if (!response.ok) {
      // Try to get error details from response
      let errorDetails = ""
      try {
        const errorData = await response.text()
        errorDetails = errorData
      } catch (e) {
        errorDetails = "Could not parse error response"
      }

      console.error(`API Error: ${response.status} ${response.statusText}`)
      console.error(`Error details: ${errorDetails}`)

      throw new Error(`Failed to list documents: ${response.status} ${response.statusText}. Details: ${errorDetails}`)
    }

    const data = await response.json()
    console.log("Documents list received successfully")

    return data.data || []
  } catch (error) {
    console.error("Error listing documents:", error)
    throw error
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.MISTRAL_API_KEY

    console.log("API Key exists:", !!apiKey)
    if (apiKey) {
      console.log("API Key length:", apiKey.length)
      console.log("API Key preview:", apiKey.substring(0, 5) + "...")
    }

    if (!apiKey) {
      return NextResponse.json({ error: "Mistral API key not configured" }, { status: 500 })
    }

    // Add a system instruction to guide Mistral's responses for health-related queries
    const systemInstruction = `
      You are Tadashi AI, a personal healthcare companion. Your responses should be:
      1. Helpful and informative about general wellness
      2. Compassionate and supportive in tone
      3. Clear about not providing medical diagnosis
      4. Focused on general health advice and wellness tips
      5. Formatted in a clear, readable way with bullet points where appropriate
      
      If asked about serious medical conditions, remind the user to consult with a healthcare professional.
    `

    console.log("Calling Mistral API with prompt:", prompt.substring(0, 100) + "...")

    const response = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    )

    console.log("Mistral API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Mistral API error:", errorText)
      return NextResponse.json({ error: "Error from Mistral API", details: errorText }, { status: response.status })
    }

    const data = await response.json()

    // Extract the text from the response
    const responseText = data.choices?.[0]?.message?.content || ""

    if (!responseText) {
      return NextResponse.json({ error: "No response from Mistral", needsFallback: true }, { status: 200 })
    }

    return NextResponse.json({ response: responseText })
  } catch (error) {
    console.error("Error calling Mistral API:", error)
    return NextResponse.json({ error: "Failed to process request", needsFallback: true }, { status: 500 })
  }
}
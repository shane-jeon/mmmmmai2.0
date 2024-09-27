import type { NextApiRequest, NextApiResponse } from "next";
// import { events } from "fetch-event-stream"; // Assuming this is still part of the stream processing

// Define the response type
type RecipeResponseData = {
  message?: string;
  recipe?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponseData>
) {
  // Handle only POST requests
  if (req.method === "POST") {
    try {
      const { word } = req.body;

      // Validate input
      if (!word) {
        return res.status(400).json({ error: "Word (ingredient) is required" });
      }

      // Use the correct AI endpoint for Cloudflare Workers AI (LLaMA or similar)
      const eventStream = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.AI_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You generate bad recipes. The user is going to input ingredients, and you will provide the worst recipe ever.`,
              },
              { role: "user", content: word }, // User input
            ],
            stream: true, // Enable streaming for continuous data
          }),
        }
      );

      // Stream the AI response back to the client
      const reader = eventStream.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      if (!reader) {
        return res
          .status(500)
          .json({ error: "Failed to read from AI service" });
      }

      let recipe = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break; // End of the stream

        // Extract and clean up the "response" part from the event stream
        if (value) {
          const match = value.match(/data:\s*({.*})/); // Look for JSON-like responses
          if (match) {
            const parsedData = JSON.parse(match[1]);
            recipe += parsedData.response; // Append only the response part
          }
        }
      }

      // Send the cleaned-up recipe as a response
      return res.status(200).json({ message: "Recipe generated!", recipe });
    } catch (error) {
      console.error("Error processing recipe request:", error);
      return res
        .status(500)
        .json({ error: "Failed to process recipe request" });
    }
  } else {
    // Method not allowed for other than POST
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { events } from "fetch-event-stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { word } = req.body;

      if (!word) {
        return res.status(400).json({ error: "Word is required" });
      }

      // Use environment variables to access the AI service for generating the bad recipe
      const eventStream = await fetch(`${process.env.AI_ENDPOINT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You give bad recipes. The user is going to input ingredients, and you are going to provide the worst recipe ever.`,
            },
            { role: "user", content: word },
          ],
          stream: true,
        }),
      });

      // Stream the AI response back to the client
      const reader = eventStream.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();

      if (!reader) {
        return res
          .status(500)
          .json({ error: "Failed to get reader from stream" });
      }

      res.setHeader("Content-Type", "text/plain");

      while (true) {
        // Read from the stream
        const result = await reader.read();

        // Ensure the result is not undefined
        if (!result) {
          break;
        }

        const { value, done } = result;

        // Stop the loop if the stream is done
        if (done) {
          break;
        }

        // Write the AI-generated recipe chunks to the response
        if (value) {
          res.write(value);
        }
      }

      res.end(); // End the response
    } catch (error) {
      console.error("Error in AI processing:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

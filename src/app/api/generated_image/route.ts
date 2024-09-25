import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get the query parameter (the prompt for the image)
      const { q: prompt } = req.query;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // Use environment variables to access the AI service for generating an image
      const response = await fetch(`${process.env.AI_ENDPOINT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          // Include any other necessary parameters for the AI model here
        }),
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const imageBuffer = await response.arrayBuffer(); // Fetch image as buffer

      // Send the image as a PNG back to the client
      res.setHeader("Content-Type", "image/png");
      res.status(200).send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

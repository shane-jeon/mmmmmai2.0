import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recipe } = req.query;

  if (!recipe) {
    return res.status(400).json({ error: "Recipe is required" });
  }

  try {
    // Assuming you're using the AI service for generating an image based on the recipe
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: recipe, // Pass the recipe as a prompt to the image generation AI model
        }),
      }
    );

    const imageBuffer = await response.arrayBuffer(); // Get the image data as buffer

    res.setHeader("Content-Type", "image/png");
    res.status(200).send(Buffer.from(imageBuffer)); // Send the image as PNG
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}

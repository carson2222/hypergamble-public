import { ImageGenerateParams } from "openai/resources/images.mjs";

export function buildImgPrompt(prompt: string): ImageGenerateParams {
  return {
    model: "dall-e-2",
    prompt: `Generate an AI image that will suit for this apocalypse situation. If you spot any policy issues with the prompt, just change it so you will be able to generate it but make it as close as possible. ${prompt}`,
    size: "256x256",
  };
}

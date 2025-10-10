import axios from "axios";

const KRAIX_API_KEY = process.env.EXPO_PUBLIC_KRAIX_STUDIO_API_KEY;

type Message = {
  role: string;
  content: string;
};

export const AIChartModel = async (messages: Message[]) => {
  const URL = "https://api.kraixstudio.com/v1/ai/chat";

  const requestBody = {
    model: "gpt-4",
    messages: messages,
  };

  try {
    const response = await axios.post(URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KRAIX_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

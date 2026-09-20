const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function translateText(text, target, source) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: `Translate the user's text from ${source} to ${target}. Return only the translated text.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.error?.message || "Translation failed");
  }

  return data.choices[0].message.content.trim();
}
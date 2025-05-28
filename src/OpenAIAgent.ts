import { OpenAI } from "openai";
import type { ResponseInput } from "openai/resources/responses/responses.mjs";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // only for quick testing; better to proxy in production
});

type Contact = {
  name: string;
  accounts: string[];
};

export type RagInput = {
  contacts: Contact[];
};

export type RagOutput = {
  user: string;
  source: string;
  target: string;
  amount: number;
};

export async function parseTransferPrompt(prompt: string, data: RagInput): Promise<RagOutput> {
  const systemPrompt = `
You are an assistant that extracts structured data from user instructions.

Given the contacts and accounts data, extract the following from the user's prompt:
- user: the full name of the person mentioned
- source: the account name money is being transferred from
- target: the account name money is being transferred to
- amount: the amount being moved (as a number)

If no exact match can be found, infer the best possible mapping based on names and account types.

Output as JSON.
`;

  const input:ResponseInput = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `
Data:
${JSON.stringify(data, null, 2)}

Prompt:
"${prompt}"
      `,
    },
  ];

  const response = await client.responses.create({
    model: "gpt-4o-mini", 
    input,
    truncation: 'auto',
    temperature: 0.1,
  });

  const result = response.output_text;
  if (!result) {
    throw new Error("No result from OpenAI");
  }

  const clean = result
    .replace(/```json\s*/i, "")
    .replace(/```$/, "")
    .trim();
  // console.log({result, clean})
  return JSON.parse(clean);
}

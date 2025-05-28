import { useState } from "react";
import { parseTransferPrompt, type RagOutput } from "./OpenAIAgent";

const data = {
  contacts: [
    {
      name: "John Doe",
      accounts: ["current account abc John", "ISA 123 John"],
    },
    {
      name: "Jane Doe",
      accounts: ["current account abc Jane", "ISA 123 Jane"],
    },
  ],
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [formState, setFormState] = useState<RagOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await parseTransferPrompt(prompt, data);
      // setOutput(result);
      setFormState(result); // populate form with parsed output
    } catch (e) {
      console.error(e);
      console.log("Error parsing prompt.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof RagOutput, value: string | number) => {
    if (formState) {
      setFormState({
        ...formState,
        [field]: field === "amount" ? Number(value) : value,
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Transfer Agent</h2>

      {/* Contacts Display */}
      <div style={{ marginTop: 30 }}>
        <h3>Contacts</h3>
        <ul>
          {data.contacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}</strong>
              <ul>
                {contact.accounts.map((account, i) => (
                  <li key={i}>{account}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Input Prompt */}
      <textarea
        rows={4}
        style={{ width: "100%" }}
        placeholder="Enter a prompt like: take $400 from John's current account and put it into his ISA"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {/* Editable Output Form */}
      {formState && (
        <div style={{ marginTop: 30 }}>
          <h3>Parsed Transfer Details (Editable)</h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
            <label>
              User:
              <input
                type="text"
                value={formState.user}
                onChange={(e) => handleFormChange("user", e.target.value)}
              />
            </label>
            <label>
              Source Account:
              <input
                type="text"
                value={formState.source}
                onChange={(e) => handleFormChange("source", e.target.value)}
              />
            </label>
            <label>
              Target Account:
              <input
                type="text"
                value={formState.target}
                onChange={(e) => handleFormChange("target", e.target.value)}
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={formState.amount}
                onChange={(e) => handleFormChange("amount", e.target.value)}
              />
            </label>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

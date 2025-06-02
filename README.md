# AI Transfer Agent

A front-end application scaffolded with [Vite](https://vitejs.dev), designed to interface with OpenAI for a financial operation like a withdrawal or transfer

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/pjfrontend/ai-transfer-agent.git
cd ai-transfer-agent
npm install
```

## 💻 Development

Start a local development server with hot module replacement:

```bash
npm start
```

## 🛠 Build

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🔐 Environment Variables

To connect to the OpenAI API, create a `.env` file in the root of the project with the following content:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: Variables prefixed with `VITE_` are exposed to your Vite front-end app. Never expose secret keys that should remain server-side. For added security in production, proxy your API requests through a backend server.

# Baymax Website

A modern, responsive healthcare assistant web application built with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
It features an AI-powered chatbot, Gemini AI integration, health check form, and a clean, mobile-optimized UI.

## 🚀 Features
- **AI Chatbot** — Interactive assistant for health-related queries.
- **Gemini AI Integration** — AI-powered responses using Google Gemini API.
- **Health Check Form** — Collects user inputs for preliminary analysis.
- **Responsive Design** — Works seamlessly across devices.
- **Dark Mode Support** — Powered by a theme provider.
- **ShadCN/UI Components** — Modern and reusable UI elements.

## 📂 Project Structure

app/
├── page.tsx # Home page
├── about/ # About page
├── contact/ # Contact form
├── chatbot/ # AI chatbot page
├── gemini/ # Gemini AI page
├── health-check/ # Health check form
components/
├── navbar.tsx # Navigation bar
├── footer.tsx # Footer section
├── chat-bot.tsx # Chatbot UI
├── gemini-chat-box.tsx # Gemini chat UI
└── ui/ # ShadCN UI components


## 🛠️ Tech Stack
- **Frontend Framework:** [Next.js 14](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
- **Language:** TypeScript
- **AI Integration:** Google Gemini API

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/Sreejith-nair511/HealthXhub.git

# Navigate to the project folder
cd HealthXhub

# Install dependencies
pnpm install

🏃 Running the Project

# Start the development server
pnpm dev

The app will run at http://localhost:3000
⚙️ Environment Variables

Create a .env file in the root directory:

NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

📜 Scripts

    pnpm dev — Start development server

    pnpm build — Build for production

    pnpm start — Start production server

    pnpm lint — Lint code

📌 Deployment

You can deploy this project on Vercel with one click.
📄 License

This project is licensed under the MIT License.

Made with ❤️ by Sreejith Nair

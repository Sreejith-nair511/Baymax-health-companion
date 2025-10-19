# Tadashi AI - India's First Comprehensive Health Management Companion

<p align="center">
  <img src="public/images/tadashi-hello.gif" alt="Tadashi AI" width="200" />
</p>

<p align="center">
  <strong>An AI-powered healthcare companion inspired by Disney's Baymax</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#technology-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a>
</p>

## Overview

Tadashi AI is India's first comprehensive health management companion that combines the caring nature of Disney's Baymax with modern AI technology. Built with Next.js and TypeScript, it provides users with personalized health advice, symptom checking, wellness tracking, and a complete suite of 12 health management tools.

**🎉 Now in Open Beta - Special Release for Indian Users with 13 Language Support!**

## Features

### 🤖 AI-Powered Healthcare Assistant
- Interactive chatbot with health expertise
- Symptom analysis and general health advice
- Integration with Mistral AI for advanced responses
- Local fallback for offline functionality

### 🎙️ Voice Interaction
- Speech-to-Text (STT) capabilities
- Text-to-Speech (TTS) functionality
- Voice-activated health queries
- **Now available to all users during Open Beta!**

### 🌍 Indian Language Support (Open Beta)
- Support for 13 major Indian languages
- Hindi, Bengali, Telugu, Marathi, Tamil, Urdu, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese
- Language selector for personalized experience

### 🎨 Personalized Experience
- Multiple mood-based themes (Calm, Energetic, Focus, Relax)
- Dark/light mode support
- Animated UI with interactive elements
- Personalized health recommendations

### ♿ Enhanced Accessibility (Open Beta)
- Font size adjustment controls
- Visual aids with contextual GIFs
- Quick phrase buttons for common health concerns
- Simplified interface for low-literacy users

### 🔐 User Management
- Secure authentication system
- User profiles with health preferences
- **Temporarily disabled for Open Beta access**
- Session management

### 🏥 Healthcare Tools
- Health check assessments
- Wellness tracking
- Emergency response protocols
- Preventive care reminders

### 💊 Health Management Suite (Open Beta)
- **Reminders & Routine**: Medication, hydration, sleep and exercise alerts
- **AI Wellness Insights**: Detailed health analytics with charts and AI advice
- **SOS & Emergency**: One-touch emergency alert simulation
- **Symptom Checker**: AI-powered diagnosis and care recommendations
- **Mood & Mental Health Tracker**: Emotional trend analysis with ambient sound player
- **Nutrition & Diet Assistant**: Meal logging and dietary recommendations
- **Sleep Analysis**: Sleep cycle monitoring and quality insights
- **Fitness & Activity**: Step counting and workout tracking
- **Health Record Vault**: Secure storage for medical documents
- **Community & Support**: Discussion forum for health topics
- **AI Insights & Reports**: Comprehensive health analysis with PDF export
- **Language & Accessibility Settings**: 13 Indian languages with enhanced accessibility features

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Framer Motion, Lucide React
- **Backend**: Next.js API Routes
- **Database**: File-based JSON storage (development)
- **AI Integration**: Mistral AI API
- **Email**: Nodemailer
- **Voice**: Web Speech API
- **State Management**: React Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Mistral AI API key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sreejith-nair511/Moltres-005G.git
   cd Moltres-005G
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   MISTRAL_API_KEY=your_mistral_api_key
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Open Beta Access

During the open beta period, all features are available without authentication:
- Visit [http://localhost:3000/tts-stt](http://localhost:3000/tts-stt) to access voice features
- Use the language selector to choose your preferred Indian language
- Try the accessibility features designed for low-literacy users
- Explore the complete Health Management Suite with 12 specialized tools
- Access AI-generated health insights and reports
- Participate in the community health forum
- Customize your experience with comprehensive settings

### Building for Production

```bash
pnpm build
# or
npm run build
```

### Running Tests

```bash
# Run comprehensive system tests
node test-comprehensive.js

# Test database functionality
curl http://localhost:3000/api/init-db

# Test email functionality
curl -X POST http://localhost:3000/api/test-email -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"name\":\"Test User\"}"
```

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── chatbot/           # Chatbot page
│   ├── tts-stt/           # Voice features page
│   ├── reminders/          # Medication and health reminders
│   ├── wellness-insights/  # AI wellness analytics
│   ├── sos/                # Emergency simulation
│   ├── symptom-checker/    # Symptom diagnosis tool
│   ├── mood-tracker/       # Mental health monitoring
│   ├── nutrition/          # Diet and meal tracking
│   ├── sleep/              # Sleep analysis
│   ├── fitness/            # Activity tracking
│   ├── health-records/     # Medical document storage
│   ├── community/          # Health discussion forum
│   ├── insights/           # AI health reports
│   ├── settings/           # Language and accessibility
│   └── ...                # Other pages
├── components/            # React components
├── contexts/              # React context providers
├── data/                  # Database files
├── lib/                   # Utility functions
├── public/                # Static assets
└── styles/                # Global styles
```

## Contributing

We welcome contributions to Tadashi AI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Disney's Baymax character from Big Hero 6
- Built with Next.js and modern web technologies
- Powered by Mistral AI for advanced healthcare insights

## Support

For support, please open an issue on GitHub or contact the development team.

---

<p align="center">
  Made with ❤️ by the Tadashi AI Team
</p>
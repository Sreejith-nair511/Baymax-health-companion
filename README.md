# Tadashi AI - Healthcare Companion

Tadashi AI is a healthcare companion application built with Next.js 14, TypeScript, and Tailwind CSS. It features AI-powered health assistance using Mistral AI, Text-to-Speech (TTS) and Speech-to-Text (STT) capabilities, premium subscription features, and accessibility enhancements.

## Features

- **AI-Powered Health Assistance**: Using Mistral AI for healthcare responses
- **Voice Features**: Text-to-Speech (TTS) and Speech-to-Text (STT) functionality
- **Premium Subscription**: ₹49/month subscription for enhanced features
- **Accessibility**: Enhanced features for people with disabilities
- **Theming**: Different themes for different moods
- **Responsive Design**: Mobile-ready polished UI

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:
- `MISTRAL_API_KEY`: Your Mistral AI API key
- `EMAIL_USER`: Your email address for sending notifications
- `EMAIL_PASS`: Your email password or app-specific password

## Known Issues and Solutions

### Webpack Warnings

You may see warnings like:
```
Managed item ... isn't a directory or doesn't contain a package.json
```

These are harmless warnings related to optional SWC packages that Next.js checks for optimization. They don't affect functionality.

### CSS Diagnostic Warnings

Your IDE may show warnings about `@tailwind` and `@apply` directives. These are false positives as they are valid Tailwind CSS syntax.

To suppress these in VS Code, we've included a `.vscode/settings.json` file that disables CSS validation for these rules.

## Project Structure

- `/app` - Next.js 14 App Router pages and layouts
- `/components` - Reusable React components
- `/contexts` - React context providers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and libraries
- `/public` - Static assets and images
- `/styles` - Global styles and Tailwind configuration

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React
- Mistral AI API
- Web Speech API
- Nodemailer
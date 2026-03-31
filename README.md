# AI Content Reviewer & Chat

A Next.js-based AI application that allows users to upload and analyze various types of content (PDFs, videos, images, YouTube videos, and web pages) and then have interactive conversations about that content with an AI assistant.

## Features

- **Content Upload & Processing:**
  - PDF file analysis (text extraction)
  - Video file processing
  - Image analysis with AI vision
  - YouTube video transcript extraction
  - Web page content scraping

- **Interactive Chat:**
  - Real-time chat interface with message history
  - AI-powered Q&A about uploaded content
  - Context-aware responses based on processed content

- **Modern UI:**
  - Clean, responsive design built with Tailwind CSS and shadcn/ui
  - Intuitive upload interface
  - Scrollable chat with distinct user/AI message styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Processing Content

1. **Upload Files:** Use the file input to upload PDFs, videos, or images
2. **Add URLs:** Enter YouTube URLs for transcript analysis or web page URLs for content extraction
3. **Process:** Click "Process Content" to analyze the uploaded material

### Chatting About Content

Once content is processed:
- Ask questions about the uploaded content in the chat
- Get AI-powered insights, summaries, and analysis
- The AI maintains context of your processed content throughout the conversation

## Supported Content Types

- **PDFs:** Full text extraction and analysis
- **Videos:** Local video file processing
- **Images:** AI vision analysis and description
- **YouTube Videos:** Automatic transcript extraction
- **Web Pages:** Content scraping and text analysis

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **AI:** OpenAI API (GPT-4o-mini for chat, GPT-4.1 for vision)
- **Content Processing:** pdf-parse, youtube-transcript, cheerio
- **Deployment:** Ready for Vercel or other platforms

## API Endpoints

- `POST /api/process-content` - Processes uploaded files and URLs
- `POST /api/chat` - Handles chat messages with content context

## Contributing

Feel free to submit issues and pull requests to enhance content processing capabilities or add new features.
- **Deployment**: Ready for Vercel or other platforms

## API

The application uses a single API endpoint:

- `POST /api/chat` - Accepts a JSON payload with `messages` array and returns AI response

## Contributing

Feel free to submit issues and pull requests.

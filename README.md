# doTERRA Lead Quiz

A multilingual lead generation quiz application for doTERRA wellness and business opportunities. Built with React + Vite.

## Features

- 🌍 **15 Languages Support**: English, German, Hungarian, Italian, Spanish, French, Czech, Slovak, Polish, Slovenian, Greek, Japanese, Chinese, Korean, Portuguese
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Matrix-inspired UI**: Modern, professional interface with digital rain effects
- 📊 **Lead Management**: Integrated with Supabase for data storage
- 📞 **Phone Number Validation**: International phone number formatting
- 🔄 **Dynamic Language Switching**: Real-time language changes without page reload

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: TailwindCSS
- **Database**: Supabase
- **Phone Input**: react-phone-number-input
- **Languages**: 15 supported languages

## Database Setup

See `SUPABASE_SETUP.md` for detailed database configuration instructions.

# Personal Portfolio

A minimal, aesthetic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Designed with a calm, confident, product-engineer aesthetic.

## 🚀 Features

- **Minimal Design**: Clean, content-first layout with neutral colors
- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Subtle Animations**: Framer Motion with opacity + translate only (200-350ms)
- **Content First**: Grid-based layout emphasizing readability
- **Accessibility**: High contrast, keyboard navigable, mobile-first
- **Contact Form**: EmailJS integration for seamless email communication
- **Performance**: Optimized for speed and performance

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- EmailJS account (for contact form) - [Sign up here](https://www.emailjs.com/)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd personal-portfolio
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure EmailJS

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Customize Content

Update the following files with your personal information:

- **Hero Section**: `components/sections/Hero.tsx` - Update name and title
- **About Section**: `components/sections/About.tsx` - Update bio
- **Experience Section**: `components/sections/Experience.tsx` - Update experience
- **Projects Section**: `components/sections/Projects.tsx` - Add your projects
- **Footer**: `components/sections/Footer.tsx` - Update social links
- **Metadata**: `app/layout.tsx` - Update SEO metadata

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the three EmailJS variables

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in the project settings
6. Click "Deploy"

## 📁 Project Structure

```
personal-portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── animations/          # Animation utilities
│   │   ├── ScrollReveal.tsx
│   │   └── variants.ts
│   └── sections/            # Page sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design Philosophy

This portfolio follows a minimal, product-engineer aesthetic:

- **Neutral Colors**: Off-white or near-black backgrounds (respects system dark mode)
- **One Accent Color**: Blue (#2563eb) used sparingly
- **No Visual Gimmicks**: No gradients, glows, or particles
- **Large Spacing**: Generous whitespace for readability
- **Clean Typography**: System fonts with proper hierarchy
- **Content First**: Grid-based layout emphasizing content
- **Subtle Motion**: Animations support readability, never decoration

## 🔧 Customization

### Colors

The portfolio uses CSS variables that automatically adapt to light/dark mode. To customize:

Edit `app/globals.css`:

```css
:root {
  --color-accent: #2563eb;  /* Change accent color */
  --color-bg: #fafafa;      /* Light mode background */
  --color-text: #171717;    /* Light mode text */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0a;    /* Dark mode background */
    --color-text: #fafafa;  /* Dark mode text */
  }
}
```

### Animations

Animation variants are defined in `components/animations/variants.ts`. All animations use:
- Opacity + translate only
- Duration: 200-350ms
- Ease-out timing
- No spring physics

## 🔧 Troubleshooting

### EmailJS Not Working

- Verify your environment variables are set correctly
- Check that your EmailJS service is active
- Ensure your template has the correct variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://www.emailjs.com/)

---

Built with a focus on clarity, performance, and content.

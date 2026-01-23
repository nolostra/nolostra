# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up EmailJS (Optional - for contact form)
1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account
2. Create an email service and template
3. Copy your Service ID, Template ID, and Public Key
4. Create `.env.local` file:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Customize Your Content
Update these files with your information:
- `components/sections/Hero.tsx` - Your name and roles
- `components/sections/About.tsx` - Your bio and tech stack
- `components/sections/Projects.tsx` - Your projects
- `components/sections/Experience.tsx` - Your experience
- `components/sections/Footer.tsx` - Your social links
- `app/layout.tsx` - SEO metadata

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 📝 Notes

- The contact form will work once EmailJS is configured
- All 3D components are optimized and lazy-loaded
- The site is fully responsive and mobile-friendly
- All animations are performance-optimized

## 🎨 Customization Tips

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Update `app/layout.tsx` and `tailwind.config.ts`
- **Animations**: Modify `components/animations/variants.ts`

Happy building! 🎉


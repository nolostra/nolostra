# EmailJS Setup Guide

This guide will help you set up EmailJS for your contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Create an Email Service

1. Log in to your EmailJS dashboard
2. Go to **Email Services** → **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Custom SMTP**
4. Follow the setup instructions for your chosen provider
5. **Save the Service ID** - You'll see it in the format: `service_xxxxxxxxx`

## Step 3: Create an Email Template

1. Go to **Email Templates** → **Create New Template**
2. Set up your template:
   - **Template Name**: Contact Form (or any name you prefer)
   - **Subject**: New Contact Form Submission
   - **Content**: Use these variables:
     ```
     From: {{from_name}}
     Email: {{from_email}}
     
     Message:
     {{message}}
     ```
3. Click **Save**
4. **Save the Template ID** - You'll see it in the format: `template_xxxxxxxxx`

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find **Public Key** section
3. **Copy the Public Key** - It looks like: `xxxxxxxxxxxxxxxx`

## Step 5: Create .env.local File

1. In your project root (`/Users/saish/Desktop/portfolio/personal-portfolio/`), create a file named `.env.local`
2. Add the following content:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual values from Steps 2, 3, and 4

### Example:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact form on your site
3. Fill out and submit the form
4. Check your email inbox for the test message

## Important Notes

- **Never commit `.env.local` to Git** - It's already in `.gitignore`
- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the browser
- For GitHub Pages deployment, add these as **GitHub Secrets** (see DEPLOYMENT.md)

## Troubleshooting

### Form not sending emails
- Check browser console for errors
- Verify all three environment variables are set correctly
- Ensure EmailJS service is active and connected
- Check EmailJS dashboard for error logs

### "EmailJS configuration missing" error
- Make sure `.env.local` file exists in the project root
- Restart your development server after creating `.env.local`
- Verify variable names match exactly (case-sensitive)

### Emails not received
- Check spam folder
- Verify email service connection in EmailJS dashboard
- Check EmailJS usage limits (free tier: 200/month)

## File Location

Your `.env.local` file should be located at:
```
/Users/saish/Desktop/portfolio/personal-portfolio/.env.local
```

## Quick Reference

| Variable | Where to Find |
|----------|---------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Dashboard → Email Services → Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Dashboard → Email Templates → Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Dashboard → Account → General → Public Key |


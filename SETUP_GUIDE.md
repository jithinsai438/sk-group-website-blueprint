# SK Group of Connections - Setup Guide

This guide will help you get the website up and running quickly.

## ✅ Quick Start Checklist

- [ ] Install dependencies
- [ ] Set up environment variables (Razorpay keys)
- [ ] Run development server
- [ ] Test enquiry form
- [ ] Test payment gateway (optional)
- [ ] Deploy to production

## 📦 Step 1: Install Dependencies

```bash
# Using npm
npm install

# OR using bun (faster)
bun install
```

## 🔑 Step 2: Configure Razorpay (Payment Gateway)

### Option A: Skip Payment Integration (For Quick Testing)

The website will work without Razorpay keys. The payment gateway will use dummy keys for demonstration.

Just run:
```bash
npm run dev
```

### Option B: Full Razorpay Integration

1. **Create Razorpay Account**
   - Visit: https://dashboard.razorpay.com/signup
   - Sign up with business email
   - Complete verification

2. **Get API Keys**
   - Login to Razorpay Dashboard
   - Go to: Settings → API Keys
   - Click "Generate Test Key" (for development)
   - Copy both:
     - **Key ID** (starts with `rzp_test_`)
     - **Key Secret** (keep this secret!)

3. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```

4. **Add Your Keys to `.env.local`**
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
   RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
   ```

## 🚀 Step 3: Run Development Server

```bash
npm run dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

## 🧪 Step 4: Test the Website

### Test Navigation
- [ ] Click all navigation menu items
- [ ] Test mobile responsive menu
- [ ] Navigate between pages

### Test Enquiry Form
1. Go to Contact page (http://localhost:3000/contact)
2. Fill in all required fields:
   - Name, Email, Phone, City
   - Select a Division
   - Subject and Message
3. (Optional) Upload a test file
4. Submit the form
5. You should see a success message with Reference ID

### Test Payment Gateway (With Razorpay Keys)
1. After submitting enquiry, click "Proceed to Payment"
2. Select payment type
3. Click "Pay with Razorpay"
4. Use test card details:
   - **Card Number**: 4111 1111 1111 1111
   - **CVV**: Any 3 digits (e.g., 123)
   - **Expiry**: Any future date (e.g., 12/25)
   - **Name**: Any name
5. Complete payment
6. Verify success message

## 📧 Step 5: Email Integration (Optional)

The enquiry system currently logs to console. To enable actual emails:

### Using Nodemailer (SMTP)

1. **Install Nodemailer**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Add SMTP credentials to `.env.local`**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

3. **Update `src/app/api/enquiry/route.ts`**
   ```typescript
   import nodemailer from 'nodemailer'

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT || '587'),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   })

   // In the POST function, after generating referenceId:
   
   // Send email to company
   await transporter.sendMail({
     from: process.env.SMTP_USER,
     to: divisionEmail,
     subject: `New Enquiry: ${subject}`,
     html: `
       <h2>New Enquiry Received</h2>
       <p><strong>Reference ID:</strong> ${referenceId}</p>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>City:</strong> ${city}</p>
       <p><strong>Division:</strong> ${division}</p>
       <p><strong>Subject:</strong> ${subject}</p>
       <p><strong>Message:</strong> ${message}</p>
     `,
   })

   // Send confirmation to customer
   await transporter.sendMail({
     from: process.env.SMTP_USER,
     to: email,
     subject: `Enquiry Confirmation - ${referenceId}`,
     html: `
       <h2>Thank you for your enquiry!</h2>
       <p>Your reference ID is: <strong>${referenceId}</strong></p>
       <p>We will get back to you within 24-48 hours.</p>
     `,
   })
   ```

### Using SendGrid (Recommended for Production)

1. **Install SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get SendGrid API Key**
   - Sign up at https://sendgrid.com
   - Create API key
   - Add to `.env.local`:
     ```env
     SENDGRID_API_KEY=your_api_key_here
     ```

3. **Update API route** similar to Nodemailer example above

## 🌐 Step 6: Deploy to Production

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to your project on Vercel Dashboard
   - Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
     - `RAZORPAY_KEY_SECRET`
     - Any email credentials

5. **Redeploy**
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

**Netlify:**
```bash
# Build command
npm run build

# Publish directory
.next
```

**Vercel via GitHub:**
1. Push code to GitHub
2. Connect repository on Vercel
3. Vercel will auto-deploy on push

## 🎨 Customization Guide

### Change Company Colors

Edit `src/app/globals.css`:
```css
:root {
  --primary: oklch(0.205 0 0);  /* Change this for brand color */
}
```

### Update Division Content

1. **Homepage Division Cards**: Edit `src/app/page.tsx`
2. **About Page Details**: Edit `src/app/about/page.tsx`
3. **Footer Contacts**: Edit `src/components/Footer.tsx`

### Modify Payment Amounts

Edit `src/components/PaymentGateway.tsx`:
```typescript
const paymentAmounts: Record<string, number> = {
  consultation: 500,   // ₹500
  booking: 5000,       // ₹5,000
  sample: 1000         // ₹1,000
}
```

### Add Your Logo

1. Add logo file to `public/` folder
2. Edit `src/components/Header.tsx`:
   ```tsx
   import Image from "next/image"
   
   // Replace text logo with image
   <Image src="/logo.png" alt="SK Group" width={150} height={40} />
   ```

## 🔧 Troubleshooting

### Payment Gateway Not Loading
- Check if Razorpay keys are set in `.env.local`
- Verify keys start with `rzp_test_` (test mode) or `rzp_live_` (live mode)
- Clear browser cache and restart dev server

### Form Submission Errors
- Check browser console for errors
- Verify API route is working: http://localhost:3000/api/enquiry
- Check file size (max 10MB)

### Styling Issues
- Run `npm run dev` to ensure Tailwind is compiling
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

### Build Errors
```bash
# Clear everything and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## 📊 Go-Live Checklist

Before launching to production:

- [ ] Replace all dummy content with actual company information
- [ ] Add real contact phone numbers and addresses
- [ ] Set up production Razorpay account (live keys)
- [ ] Configure email service for enquiry notifications
- [ ] Test all forms and payment flows
- [ ] Add Google Analytics or tracking
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Add sitemap and robots.txt
- [ ] Test on multiple devices and browsers
- [ ] Set up error monitoring (Sentry, LogRocket)

## 🆘 Getting Help

If you encounter issues:

1. Check the main README.md for detailed documentation
2. Review error messages in browser console
3. Check server logs in terminal
4. Verify environment variables are set correctly
5. Ensure all dependencies are installed

## 📞 Support Contacts

For technical support or questions about the website setup, contact the development team.

---

**Happy Building! 🚀**

The SK Group of Connections website is now ready to serve your business needs.

# SK Group of Connections - Website

**Tagline:** Five Divisions, One Vision — Building India through Connection and Commitment

A comprehensive multi-division enterprise website built with Next.js 15, featuring construction, legal, PR, event management, and tissue manufacturing services.

## 🌟 Features

### Core Pages
- **Home Page**: Hero section with company tagline, divisions grid with interactive cards
- **About Page**: Company overview, mission, vision, core values, and detailed division information
- **Contact Page**: Multi-step enquiry form with file upload capability
- **Projects**: Placeholder for project portfolio
- **News & Updates**: Placeholder for company news and announcements
- **Join Us**: Career and partnership opportunities page

### Key Features

#### 1. **Multi-Step Enquiry System**
- Two-step form with validation
- Division-specific enquiry routing
- File upload support (PDF, DOC, DOCX, JPG, PNG - Max 10MB)
- Auto-generated reference ID
- Email confirmation system (ready for integration)
- Form data routing to division-specific emails:
  - `construction@skgroupconnections.in`
  - `legal@skgroupconnections.in`
  - `pr@skgroupconnections.in`
  - `events@skgroupconnections.in`
  - `tissues@skgroupconnections.in`

#### 2. **Payment Gateway Integration (Razorpay)**
- Consultation Fee: ₹500
- Booking Advance: ₹5,000
- Sample Order: ₹1,000
- Custom Amount Option
- Secure payment processing
- Payment verification system
- Order tracking with reference IDs

#### 3. **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly navigation
- Accessible UI components

#### 4. **Professional Components**
- Sticky navigation header
- Interactive division cards
- Success/error alerts
- Loading states
- Professional footer with contact information

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI + Radix UI
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Payment**: Razorpay
- **Animation**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ or Bun
- Razorpay Account (for payment integration)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sk-group-connections
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Razorpay credentials:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

4. **Run the development server**
```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔐 Razorpay Setup

### Getting Razorpay Keys

1. **Sign up for Razorpay**
   - Go to [https://dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)
   - Complete the registration process

2. **Access API Keys**
   - Login to Razorpay Dashboard
   - Navigate to **Settings** → **API Keys**
   - Generate Keys (Test Mode for development)
   - Copy **Key ID** and **Key Secret**

3. **Add Keys to Environment**
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Test Mode vs Live Mode
- **Test Mode**: Use for development and testing
  - Test cards: 4111 1111 1111 1111 (any CVV, future date)
  - No real money is charged
- **Live Mode**: For production
  - Complete KYC verification
  - Business documentation required
  - Real transactions processed

## 📧 Email Integration (Optional)

The enquiry system is ready for email integration. To enable emails:

1. **Choose an Email Service**
   - Nodemailer (SMTP)
   - SendGrid
   - AWS SES
   - Resend

2. **Update API Route**
   Edit `src/app/api/enquiry/route.ts` and implement email sending:
   ```typescript
   // Example with Nodemailer
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: 587,
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD
     }
   })
   ```

## 🗂️ Project Structure

```
src/
├── app/
│   ├── about/              # About page
│   ├── contact/            # Contact page with enquiry form
│   ├── join-us/            # Join Us page
│   ├── news/               # News & Updates page
│   ├── payment/            # Payment gateway page
│   ├── projects/           # Projects page
│   ├── api/
│   │   ├── enquiry/        # Enquiry submission API
│   │   └── payment/        # Payment APIs (create-order, verify)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with division contacts
│   ├── DivisionCard.tsx    # Division display card
│   ├── EnquiryForm.tsx     # Multi-step enquiry form
│   └── PaymentGateway.tsx  # Razorpay payment component
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Customization

### Colors & Branding
Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: oklch(0.205 0 0);        /* Primary brand color */
  --secondary: oklch(0.97 0 0);       /* Secondary color */
  --accent: oklch(0.97 0 0);          /* Accent color */
  /* ... other variables */
}
```

### Division Information
Update division details in:
- `src/app/page.tsx` (Homepage divisions grid)
- `src/app/about/page.tsx` (Detailed division information)
- `src/components/Footer.tsx` (Footer division links)

### Payment Amounts
Modify payment options in `src/components/PaymentGateway.tsx`:
```typescript
const paymentAmounts: Record<string, number> = {
  consultation: 500,    // Change amounts here
  booking: 5000,
  sample: 1000
}
```

## 📱 Pages Overview

### Home (`/`)
- Hero section with tagline and CTAs
- Five division cards with "Know More" and "Enquire Now"
- Call-to-action section

### About (`/about`)
- Company overview by Shashank Pasupuleti
- Mission and Vision cards
- Core values display
- Detailed division services list

### Contact (`/contact`)
- Multi-step enquiry form
- Division selection dropdown
- File upload functionality
- Success confirmation with reference ID
- Optional payment link

### Payment (`/payment`)
- Payment type selection
- Razorpay integration
- Secure payment processing
- Order confirmation

## 🔒 Security Features

- Environment variable protection
- Server-side payment verification
- File upload validation
- Form input sanitization
- HTTPS enforced (in production)

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel Dashboard:
- Settings → Environment Variables
- Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### Other Platforms
- **Netlify**: Deploy via Git integration
- **AWS Amplify**: Connect repository
- **Self-hosted**: Build with `npm run build` and serve with PM2/Nginx

## 📈 Future Enhancements

- [ ] Admin dashboard for enquiry management
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] CMS integration for content management
- [ ] Blog system for news and updates
- [ ] Project portfolio with image galleries
- [ ] Advanced analytics and tracking
- [ ] Multi-language support
- [ ] Live chat integration
- [ ] Email automation system
- [ ] GST invoice generation

## 👤 About the Founder

**Shashank Pasupuleti**  
Founder & CEO - SK Group of Connections

## 📞 Contact Information

- **Email**: info@skgroupconnections.in
- **Website**: [Coming Soon]
- **Location**: India

## 📄 License

© 2024 SK Group of Connections. All rights reserved.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for optimal performance and user experience.

---

**Note**: This is a production-ready template. Replace placeholder content, add actual contact details, and integrate with your preferred backend services for a complete solution.
# MAX TV PRO - Premium IPTV Streaming Service

A modern, SEO-optimized Next.js 14 website for MAX TV PRO IPTV service with full internationalization support (English/Arabic), dark theme, and comprehensive features.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **Internationalization** (i18n) with English and Arabic support
- **RTL Layout** support for Arabic language
- **SEO Optimized** with meta tags, structured data, and sitemaps
- **Dark Theme** with modern design system
- **Responsive Design** mobile-first approach
- **Analytics Integration** with Google Tag Manager
- **Form Validation** with Zod and React Hook Form
- **Security Headers** and rate limiting
- **WhatsApp Integration** with floating button
- **Performance Optimized** with Core Web Vitals focus

## 📁 Project Structure

```
max-tv-pro/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Homepage
│   │   ├── plans/          # Pricing plans
│   │   ├── install/        # Installation guides
│   │   ├── devices/        # Device compatibility
│   │   ├── faq/           # FAQ page
│   │   ├── blog/          # Blog section
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact form
│   │   └── legal/         # Legal pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── features/          # Feature-specific components
├── lib/                   # Utility functions
├── messages/              # Translation files
├── styles/                # Global styles
└── types/                 # TypeScript definitions
```

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd max-tv-pro
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🌍 Internationalization

The website supports two languages:
- **English** (default): Available at `/` and `/en`
- **Arabic**: Available at `/ar` with RTL layout

### Adding New Languages

1. Add locale to `lib/i18n.ts`
2. Create translation file in `messages/[locale].json`
3. Update middleware configuration

## 🎨 Design System

### Colors
- **Primary**: #FF5722 (Orange)
- **Secondary**: #2D9CDB (Blue)
- **Success**: #3EA76A (Green)
- **Background**: Dark theme with multiple shades

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good readability

### Components
All components follow a consistent design system with:
- Rounded corners (18px for cards, 14px for buttons)
- Consistent spacing and shadows
- Hover and focus states
- Accessibility features

## 📊 SEO Features

### Meta Tags
- Unique titles and descriptions for each page
- Open Graph and Twitter Card support
- Canonical URLs and hreflang alternates

### Structured Data
- Organization schema
- Service schema
- FAQ schema
- Article schema for blog posts
- Breadcrumb schema

### Sitemaps
- Dynamic sitemap generation
- Multi-language support
- Proper priority and change frequency

## 🔒 Security

### Headers
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Content-Type-Options
- X-Frame-Options

### Form Security
- Input validation with Zod
- Rate limiting (5 requests per 15 minutes)
- CSRF protection
- Input sanitization

## 📈 Analytics

### Google Tag Manager Integration
- Page view tracking
- CTA click tracking
- Form submission tracking
- WhatsApp click tracking
- Scroll depth tracking
- User engagement scoring

### Events Tracked
- `page_view`: Page navigation
- `cta_click`: Call-to-action interactions
- `form_submit`: Form submissions
- `whatsapp_click`: WhatsApp button clicks
- `plan_select`: Plan selection
- `faq_expand`: FAQ interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://maxprotv.com
```

## 📱 Device Support

The website is fully responsive and supports:
- **Mobile**: iPhone, Android phones
- **Tablets**: iPad, Android tablets
- **Desktop**: Windows, Mac, Linux
- **Smart TVs**: Android TV, Samsung, LG

## 🔧 Development

### Scripts
- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `type-check`: Run TypeScript checks

### Code Quality
- ESLint configuration
- Prettier for code formatting
- Husky for pre-commit hooks
- TypeScript for type safety

## 📞 Support

For technical support or questions:
- **WhatsApp**: +1 (332) 266-2387
- **Email**: support@maxprotv.com
- **Website**: https://maxprotv.com

## 📄 License

This project is proprietary and confidential. All rights reserved by MAX TV PRO.

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS.

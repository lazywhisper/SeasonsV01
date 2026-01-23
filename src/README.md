# 🌟 Seasons Dashboard

> **Alternative, onchain yield platform on Solana**

Seasons is a Solana-based DeFi platform offering real-time portfolio tracking, yield management, and onchain rewards for $SEAS token holders (10,000+ tokens required).

![Seasons Dashboard](https://seasons.finance/og-image.jpg)

---

## ⚡ **Recent Updates (January 2026)**

**From "UX Reference" to Production-Ready!**

✅ **API Infrastructure** - Full backend interface with TypeScript contracts  
✅ **Mock/Real API Switcher** - Easy development → production transition  
✅ **Centralized Styles** - No more ~1k lines of inline styles  
✅ **Smart Formatters** - Consistent number/currency formatting  
✅ **Component Architecture** - Modular, reusable, maintainable

📖 **See**: [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md) | [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)

---

## 🎯 **Features**

### 📊 **Dashboard**
- Real-time yield metrics (34.5% APY)
- Live rewards distribution tracking
- Platform statistics (TVL, active nodes, total distributed)
- Recent activity feed
- Quick actions panel

### 💰 **Yield Overview**
- Node status monitoring
- Earnings breakdown (buy tax, sell tax, rolling yield)
- Yield distribution pool tracking
- Performance analytics

### 🖥️ **My Node**
- Personal node dashboard
- Real-time earnings display
- Node share percentage
- Historical performance charts
- Quick access to buy $SEAS

### 🪙 **Assets Inclusion**
- **Blue Chips (60%)**: Top-tier Solana memecoins
- **Underdogs (30%)**: Mid-cap promising assets
- **Rising Stars (10%)**: Early-stage high-potential tokens
- Detailed asset cards with market data
- Inclusion criteria display

### ❓ **FAQ & Resources**
- Comprehensive FAQ section
- Risk disclosure documentation
- External links to Gitbook docs, social media
- Support resources

### ⚙️ **Settings**
- Wallet management
- Account preferences
- Theme customization (dark only)
- Notification settings

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/seasons-dashboard.git
cd seasons-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🛠️ **Tech Stack**

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **UI Components**: Custom component library
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Build Tool**: Vite

---

## 📁 **Project Structure**

```
seasons-dashboard/
├── components/
│   ├── pages/           # Page components
│   ├── dashboard/       # Dashboard widgets
│   │   ├── node/        # Node status sub-components
│   │   ├── PortfolioComposition/  # Portfolio sub-components
│   │   └── ...
│   └── ui/              # Reusable UI components
│       ├── FilterButtonGroup.tsx
│       ├── MetricCard.tsx
│       └── ErrorBoundary.tsx
├── services/            # 🆕 API layer
│   ├── api/
│   │   ├── types.ts     # TypeScript contracts
│   │   └── seasonsApi.ts  # HTTP client
│   ├── dataService.ts   # Mock/Real API switcher
│   └── README.md        # API documentation
├── hooks/               # 🆕 Custom React hooks
│   ├── useDashboardData.ts  # Data fetching
│   ├── useAnimatedValue.ts  # Animations
│   └── usePortfolioSort.ts  # Sorting logic
├── utils/               # 🆕 Utilities
│   └── formatters.ts    # Number/currency formatters
├── constants/           # 🆕 Platform constants
│   └── platform.ts      # All magic numbers
├── styles/              # 🆕 Centralized styles
│   ├── cardStyles.ts    # Reusable component styles
│   └── globals.css      # Global styles & Tailwind
├── lib/
│   ├── mockData.ts      # Mock data (dev only)
│   └── assetsData.ts    # Asset lists
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── manifest.json
├── .env.example         # 🆕 Environment variables template
├── MIGRATION_GUIDE.md   # 🆕 How to migrate
├── REFACTORING_SUMMARY.md  # 🆕 What changed
└── App.tsx
```

**Key Additions:**
- 🆕 `/services/` - API infrastructure with mock/real switcher
- 🆕 `/hooks/` - Reusable React hooks for data & UI
- 🆕 `/utils/` - Formatters for numbers, dates, addresses
- 🆕 `/constants/` - All platform constants in one place
- 🆕 `/styles/cardStyles.ts` - Centralized component styles

---

## 🎨 **Design System**

### Color Palette

**Анодированный графит** (Dark theme):
- **Gradient**: `#E9C774 → #F27783 → #B44BCB → #4B80CB`
- **Background Base**: `#0A0A0B`
- **Background Elevated**: `#111113`
- **Text Primary**: `#F8F9FA`
- **Text Secondary**: `#A5A7AB`
- **Border Subtle**: `rgba(255, 255, 255, 0.08)`

### Typography

- **H1, H2**: Conthrax Regular
- **Body**: Raleway
- **Numbers/Metrics**: Inter (with tabular-nums)

### Key Rules

- ✅ **Dark theme only** (no light mode)
- ✅ **6:3:1 asset distribution** (Blue Chips 60%, Underdogs 30%, Rising Stars 10%)
- ✅ **Never use "Passive"** → Use "Alternative yield", "Onchain yield", "Onchain rewards"

---

## 📊 **SEO & Analytics**

### Built-in SEO Features
- ✅ Dynamic meta tags (unique per page)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Cards
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Google Analytics 4 integration

### Setup Google Analytics

1. Get your GA4 Measurement ID from [Google Analytics](https://analytics.google.com)
2. Open `/components/SEO.tsx`
3. Replace `G-XXXXXXXXXX` with your Measurement ID (line 17)
4. Redeploy your application

---

## 🔧 **Configuration**

### Environment Variables

Create `.env` file (optional):
```env
VITE_API_URL=https://api.seasons.finance
VITE_GA_ID=G-XXXXXXXXXX
```

### Update Domain URLs

Before deployment, replace `https://seasons.finance` with your domain in:
- `/App.tsx` (SEO section)
- `/components/SEO.tsx`
- `/public/sitemap.xml`
- `/public/robots.txt`

---

## 🌐 **Deployment**

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### Manual Deploy

```bash
# Build production bundle
npm run build

# Upload dist/ folder to your hosting
```

---

## 📱 **Pages & Routes**

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Main overview with yield metrics |
| `/yield-overview` | Yield Overview | Detailed yield analytics |
| `/my-node` | My Node | Personal node dashboard |
| `/holdings` | Assets Inclusion | Blue Chips, Underdogs, Rising Stars |
| `/faq` | FAQ | Frequently asked questions |
| `/risks` | Risk Disclosure | Risk information |
| `/settings` | Settings | User preferences |

---

## 🧪 **Development**

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

### Mock Data

The app uses mock data for development. See `/lib/mockData.ts` to customize:
- Platform statistics
- Live rewards
- User node data
- Recent activity

---

## 🎯 **Key Components**

### SEO Component
Handles all SEO meta tags, Google Analytics, and structured data.

```tsx
<SEO
  title="Your Page Title"
  description="Your page description"
  keywords="keyword1, keyword2"
  googleAnalyticsId="G-XXXXXXXXXX"
/>
```

### Jupiter Swap Widget
Integrated DEX swap widget for buying $SEAS tokens.

### Portfolio Composition
Visual breakdown of asset allocation (60/30/10 rule).

---

## 📚 **Documentation**

- **🎯 Refactoring Summary**: [REFACTORING_SUMMARY.md](/REFACTORING_SUMMARY.md) - Complete refactoring report
- **📖 Migration Guide**: [MIGRATION_GUIDE.md](/MIGRATION_GUIDE.md) - Step-by-step migration instructions
- **🚀 Next Steps**: [NEXT_STEPS.md](/NEXT_STEPS.md) - Continue refactoring (Week 1-4 plan)
- **📊 Progress Tracker**: [REFACTORING_PROGRESS.md](/REFACTORING_PROGRESS.md) - Detailed progress
- **🔌 API Documentation**: [/services/README.md](/services/README.md) - Data service guide
- **🎨 Design Guidelines**: `/guidelines/Guidelines.md` - Brand & UI guidelines
- **🔍 SEO Audit Report**: `/SEO-AUDIT-REPORT.md` - SEO analysis
- **🙏 Attributions**: `/Attributions.md` - Third-party credits

---

## 🔐 **Security**

- ✅ No API keys stored in frontend
- ✅ HTTPS only in production
- ✅ Content Security Policy headers
- ✅ XSS protection
- ✅ CORS configured

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is proprietary and confidential.

---

## 🔗 **Links**

- **Website**: [https://seasons.finance](https://seasons.finance)
- **Documentation**: [Seasons Gitbook](https://seasons.gitbook.io/seasons-docs)
- **Twitter/X**: [@SEAS_onchain](https://x.com/SEAS_onchain)
- **Telegram**: [SeasonsCommunity](https://t.me/SeasonsCommunity)
- **LinkedIn**: [Seasons](https://www.linkedin.com/company/seasons-seas)
- **YouTube**: [@SEAS_onchain](https://www.youtube.com/@SEAS_onchain)
- **Medium**: [Seasons Blog](https://medium.com/seasons-blog)

---

## ❓ **FAQ**

**Q: What is the minimum $SEAS required?**  
A: 10,000 $SEAS tokens to activate a node and earn yield.

**Q: What is the current APY?**  
A: 34.5% APY (based on recent performance, may vary).

**Q: Is this production-ready?**  
A: Yes! Just add your Google Analytics ID and update domain URLs.

**Q: Can I use this for my own project?**  
A: This is proprietary code for Seasons platform. Contact team for licensing.

---

## 💬 **Support**

Need help?
- 📖 Check the [Gitbook documentation](https://seasons.gitbook.io/seasons-docs)
- 💬 Join the [Telegram community](https://t.me/SeasonsCommunity)
- 🐦 Follow updates on [Twitter/X](https://x.com/SEAS_onchain)

---

## 🎉 **Credits**

Built with ❤️ by the Seasons team.

**Special thanks to:**
- React & Vite teams
- Tailwind CSS
- Lucide Icons
- Recharts
- Solana community

---

**Last Updated**: January 21, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
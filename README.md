# 🌐 CSV Orbit - AI-Enabled Opportunity Radar

> **Always in motion. Always in view.**  
> AI-Enabled Opportunity Radar for Climate Smart Ventures

CSV Orbit automates the discovery, extraction, summarization, and scoring of development and funding opportunities from global sources such as **ADB, World Bank, Devex, UNDP, and USAID**.

## 🚀 Features

- **Smart Source Management**: Add and manage funding opportunity sources with a business-friendly interface
- **Real-time Data Collection**: Automated scraping from predefined and custom sources
- **AI-Powered Scoring**: Relevance scoring and summarization of opportunities
- **Interactive Dashboard**: Filter, sort, and track opportunities by status, deadline, and relevance
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and Turbopack

## 🧱 Project Structure

```
src/
├── app/
│   ├── api/scrape/         # API endpoint for data collection
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── Header.tsx          # Application header
│   ├── SourceManager.tsx   # Manage data sources
│   └── Dashboard.tsx       # Opportunities dashboard
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd martins-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

#### Source Manager
- Add predefined sources (ADB, World Bank, Devex, UNDP, USAID)
- Add custom sources with URL input
- Real-time sync status and error handling
- Opportunity count tracking

#### Dashboard
- Filter opportunities by relevance, urgency, and status
- Sort by relevance score, deadline, or value
- Update opportunity status (new → reviewed → applied → archived)
- Summary statistics and metrics

## 🌟 Features in Detail

### Data Collection
- **Predefined Sources**: Quick setup for major development organizations
- **Custom Sources**: Add any website URL for opportunity discovery
- **Sync Status**: Real-time feedback on data collection progress
- **Error Handling**: Graceful handling of failed requests

### Opportunity Management
- **Relevance Scoring**: AI-powered scoring from 0-100%
- **Status Tracking**: Track progress from discovery to application
- **Deadline Monitoring**: Highlight urgent opportunities
- **Tag System**: Categorize opportunities by type and focus area

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live sync status and progress indicators
- **Intuitive Interface**: Business-friendly design for non-technical users
- **Export Ready**: Structured data for easy export and sharing

## 🔮 Roadmap

| Phase | Scope | Status |
|-------|--------|---------|
| **POC** | Basic scraping + dashboard | ✅ Complete |
| **MVP** | AI summarization + alerts | 🔄 In Progress |
| **Scale** | Multi-source automation | 📋 Planned |
| **Intelligence** | Predictive analytics | 💭 Future |

## 🤝 Contributing

This is an internal Climate Smart Ventures project. For questions or contributions, contact the development team.

## 📄 License

Internal CSV prototype – not for public distribution.

---

**Built with ❤️ by Climate Smart Ventures Tech Team**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

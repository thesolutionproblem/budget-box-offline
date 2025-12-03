# 📦 BudgetBox - Offline-First Personal Budgeting

A modern, offline-first personal budgeting application built with React, TypeScript, and Zustand. Track your income and expenses with auto-save functionality that works 100% offline.

## ✨ Features

- **100% Offline Support**: Works without internet connection
- **Auto-Save**: Every keystroke saves instantly to IndexedDB
- **Sync Status Indicators**: Visual feedback for Local Only, Sync Pending, Synced states
- **Smart Analytics**: Burn rate, savings potential, and month-end predictions
- **Rule-Based Insights**: Intelligent warnings based on spending patterns
- **Beautiful Charts**: Pie chart breakdown of spending categories
- **Responsive Design**: Works on desktop and mobile

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    React + Vite                      │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │    │
│  │  │  Budget   │  │ Dashboard │  │   Analytics   │   │    │
│  │  │   Form    │  │   Page    │  │   Components  │   │    │
│  │  └─────┬─────┘  └─────┬─────┘  └───────┬───────┘   │    │
│  │        │              │                │            │    │
│  │        └──────────────┼────────────────┘            │    │
│  │                       │                              │    │
│  │               ┌───────▼───────┐                     │    │
│  │               │ Zustand Store │                     │    │
│  │               │ with Persist  │                     │    │
│  │               └───────┬───────┘                     │    │
│  │                       │                              │    │
│  │               ┌───────▼───────┐                     │    │
│  │               │   localForage │                     │    │
│  │               │   (IndexedDB) │                     │    │
│  │               └───────┬───────┘                     │    │
│  └───────────────────────┼──────────────────────────────┘    │
│                          │                                    │
│            ┌─────────────▼─────────────┐                     │
│            │    Network Status Hook    │                     │
│            │  (Online/Offline Detection)│                    │
│            └─────────────┬─────────────┘                     │
│                          │                                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
                           ▼ (when online)
┌──────────────────────────────────────────────────────────────┐
│                     BACKEND (Optional)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐   │   │
│  │  │   Auth      │  │  Database   │  │   Edge     │   │   │
│  │  │   (Email)   │  │  PostgreSQL │  │  Functions │   │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## 🔄 How Offline Mode Works

1. **Local Storage**: All budget data is stored in IndexedDB using localForage
2. **Auto-Save**: Zustand persist middleware saves on every state change
3. **Network Detection**: useNetworkStatus hook monitors online/offline status
4. **Sync Queue**: When offline, changes are marked as "pending"
5. **Auto-Sync**: When connection returns, data automatically syncs to backend

### Data Flow

```
User Input → Zustand Store → localForage (IndexedDB) → Sync Queue → Backend
                  ↓
            UI Updates Instantly
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AnalyticsCards.tsx   # Dashboard metric cards
│   ├── BudgetForm.tsx       # Main budget entry form
│   ├── BudgetInput.tsx      # Reusable input component
│   ├── CategoryChart.tsx    # Pie chart visualization
│   ├── Header.tsx           # App header with branding
│   ├── Navigation.tsx       # Bottom/inline navigation
│   ├── NetworkStatus.tsx    # Online/offline indicator
│   └── WarningsPanel.tsx    # Smart insights display
├── hooks/
│   └── useNetworkStatus.ts  # Network detection hook
├── pages/
│   ├── Index.tsx            # Budget form page
│   └── Dashboard.tsx        # Analytics dashboard
├── stores/
│   └── budgetStore.ts       # Zustand store with persistence
├── types/
│   └── budget.ts            # TypeScript interfaces
└── index.css                # Design system tokens
```

## 🎨 Design System

The app uses a custom design system with CSS variables:

- **Primary**: Deep Navy (#1a2744) - Trust & Stability
- **Accent**: Emerald Green - Money & Growth
- **Warning**: Warm Amber - Alerts
- **Typography**: DM Sans (body), Space Grotesk (display)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project
cd budgetbox

# Install dependencies
npm install

# Start development server
npm run dev
```

### Demo Credentials

If backend authentication is enabled:
- Email: `hire-me@anshumat.org`
- Password: `HireMe@2025!`

## 📊 Analytics Features

### Metrics Calculated

| Metric | Formula |
|--------|---------|
| Burn Rate | Total Expenses / Income |
| Savings Potential | Income - Total Expenses |
| Month-End Prediction | Projected remaining balance |
| Category % | Category Expense / Income × 100 |

### Smart Warnings

- **Food > 40%**: Meal planning suggestion
- **Subscriptions > 30%**: Review unused services
- **Expenses > Income**: Urgent budget review
- **Burn Rate > 90%**: Emergency fund warning

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State**: Zustand with persist middleware
- **Storage**: localForage (IndexedDB wrapper)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: shadcn/ui

## 📱 Responsive Design

- Mobile-first approach
- Bottom navigation on mobile
- Inline navigation on desktop
- Adaptive card layouts

## 🔐 Security

- All data stored locally is encrypted by browser
- No sensitive data logged to console
- HTTPS required for sync
- Input validation on all fields

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---



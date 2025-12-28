<div align="center">

# 🎮 10 LPA Quest

### Gamified Job Preparation Tracker for Tech Interviews

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-10--lpa--quest.vercel.app-purple?style=for-the-badge)](https://10-lpa-quest.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*Transform your tech interview preparation into an engaging, gamified journey to crack a 10 LPA+ job!*

[Live Demo](https://10-lpa-quest.vercel.app) • [Features](#-features) • [Tech Stack](#️-tech-stack) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **📊 Gamified Dashboard** | Track your progress with XP, levels, streaks, and achievements |
| **🗓️ Dynamic Roadmap Generator** | Personalized study plans based on your role, timeframe & target company |
| **🔥 Daily Quests** | Complete daily tasks to maintain streaks and earn bonus XP |
| **🏆 Achievement System** | Unlock badges and achievements as you progress |
| **📈 Analytics Dashboard** | Visualize your learning patterns with beautiful charts |

### 📚 DSA & Interview Preparation

| Feature | Description |
|---------|-------------|
| **🔥 Top Interview Questions** | 85 curated LeetCode problems from top tech interviews |
| **📅 DSA Calendar 2026** | Complete roadmap with 19 topics + 60 patterns |
| **📋 DSA Practice Sheets** | Striver's SDE Sheet, NeetCode 150, Blind 75 & more |
| **🏢 Company-Specific Prep** | Preparation guides for FAANG, startups & service companies |

### 🧠 Smart Features

| Feature | Description |
|---------|-------------|
| **🤖 AI Mentor** | Get personalized guidance powered by Google Gemini |
| **⏰ Pomodoro Timer** | Built-in focus timer with customizable sessions |
| **📝 Notes System** | Take and organize notes for each topic |
| **🔔 Spaced Repetition** | Smart reminders to review topics at optimal intervals |
| **🎉 Milestone Celebrations** | Celebrate progress at 25%, 50%, 75%, and 100% |

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **State Management** | Zustand |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Authentication** | NextAuth.js |
| **Charts** | Recharts |
| **AI Integration** | Google Gemini API |
| **Deployment** | Vercel |

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech) for free hosting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shakeerprince/10-LPA-Quest.git
   cd 10-LPA-Quest/lpa-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
   DIRECT_URL="postgresql://user:pass@host/db?sslmode=require"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: AI Mentor (Google Gemini)
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Push database schema**
   ```bash
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

<div align="center">

### Dashboard
*Track your daily progress, streaks, and XP with a beautiful gamified interface*

### Skill Tree
*Complete DSA topics and patterns with visual progress tracking*

### Analytics
*Visualize your learning journey with comprehensive charts*

### AI Mentor
*Get personalized guidance for your interview preparation*

</div>

---

## 📁 Project Structure

```
lpa-quest/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   ├── analytics/          # Analytics dashboard
│   │   ├── roadmap/            # Skill Tree page
│   │   ├── my-roadmap/         # Personal roadmap
│   │   ├── ai-mentor/          # AI chat interface
│   │   └── ...
│   ├── components/             # React components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── roadmap/            # Skill tree components
│   │   ├── gamification/       # XP, levels, achievements
│   │   └── ...
│   ├── data/                   # Static data files
│   │   ├── interviewDSASheet.ts
│   │   ├── dsaCalendar2026.ts
│   │   └── ...
│   ├── store/                  # Zustand stores
│   └── lib/                    # Utilities & configs
├── prisma/
│   └── schema.prisma           # Database schema
└── public/                     # Static assets
```

---

## 🎯 Roadmap

- [x] Gamified Dashboard with XP & Levels
- [x] Dynamic Roadmap Generator
- [x] Top Interview Questions (85 problems)
- [x] DSA Calendar 2026 (19 topics + 60 patterns)
- [x] Analytics Dashboard
- [x] AI Mentor Integration
- [x] Spaced Repetition System
- [ ] Mobile App (React Native)
- [ ] Community Features
- [ ] Mock Interview Simulator
- [ ] Resume Builder

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Striver** - For the amazing SDE Sheet
- **NeetCode** - For the curated problem lists
- **PrinceSinghhub** - For the DSA Calendar 2026 roadmap
- **Dheeraj & Arvind Sharma** - For the Interview DSA Sheet

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by [Shakeer Prince](https://github.com/shakeerprince)

[![GitHub](https://img.shields.io/badge/GitHub-shakeerprince-181717?style=for-the-badge&logo=github)](https://github.com/shakeerprince)

</div>

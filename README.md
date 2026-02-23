# 📬 Email Memories
> *Like Google Photos Memories or Snapchat Memories — but for your inbox.*

Email Memories surfaces emails you sent and received on this day in years past. It's part nostalgia, part relationship nudge — reminding you of people and conversations you may have long forgotten.

---

## What It Does

- Connects to your Gmail account via Google OAuth
- Finds emails from **this day in previous years**
- Presents them in a clean, chronological "memories" feed
- Highlights people you haven't emailed in a long time
- (Eventually) lets you one-click reply or reconnect

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Tailwind | Fast to build, looks great |
| Backend | Node.js + Express | Simple REST API |
| Auth | Google OAuth 2.0 | Required for Gmail API access |
| Gmail Data | Gmail API (REST) | Official, well-documented |
| Database | PostgreSQL | Store tokens, cached email metadata |
| Hosting | Railway or Render | Easy deploys, free tier |

---

## Project Structure

```
email-memories/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Feed.jsx         # Main memories feed
│   │   │   ├── MemoryCard.jsx   # Individual email memory card
│   │   │   └── LoginButton.jsx  # Google OAuth trigger
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                  # Express backend
│   ├── routes/
│   │   ├── auth.js          # Google OAuth flow
│   │   └── memories.js      # Gmail fetch + memory logic
│   ├── services/
│   │   ├── gmail.js         # Gmail API wrapper
│   │   └── memories.js      # "On this day" query logic
│   ├── db/
│   │   └── schema.sql       # Users + token storage
│   ├── index.js
│   └── package.json
│
├── .env.example
└── README.md
```

---

## MVP Feature Scope

### Phase 1 — Core (Build This First)
- [ ] Google OAuth login / token storage
- [ ] Fetch emails matching today's date from prior years
- [ ] Display memory cards: sender, subject, snippet, year
- [ ] Basic feed sorted by year (oldest → newest)

### Phase 2 — Make It Interesting
- [ ] Highlight "you haven't emailed this person in X years"
- [ ] Group memories by person/thread
- [ ] Email stats: most frequent contacts, busiest years

### Phase 3 — Monetization / Growth
- [ ] One-click reply / reconnect from a memory
- [ ] Weekly digest email ("Your memories this week")
- [ ] Expanded analysis: personality insights, relationship trends
- [ ] Paid tier for full inbox history access

---

## Getting Started (Development)

### Prerequisites
- Node.js 18+
- PostgreSQL
- A Google Cloud project with Gmail API enabled

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/email-memories.git
cd email-memories

# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install

# Set up environment variables
cp .env.example .env
# → Fill in your Google OAuth credentials and DB connection string

# Run migrations
cd ../server && npm run migrate

# Start dev servers
npm run dev        # starts both client + server
```

### Environment Variables

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/callback

# Database
DATABASE_URL=postgresql://localhost:5432/email_memories

# App
SESSION_SECRET=your_session_secret
PORT=3001
```

---

## Google API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → **Email Memories**
3. Enable the **Gmail API**
4. Create **OAuth 2.0 credentials** (Web Application type)
5. Add `http://localhost:3001/auth/callback` as an authorized redirect URI
6. Copy Client ID and Secret into your `.env`

> ⚠️ You'll need to add test users in the OAuth consent screen while the app is in development mode.

---

## Privacy & Data Handling

- We only read email **metadata** (sender, subject, date, snippet) — not full email bodies by default
- OAuth tokens are stored encrypted
- No email data is sold or shared
- Users can revoke access at any time via their Google account settings

---

## Roadmap

The long-term vision is a personal relationship intelligence layer built on top of your email — the people you've talked to, how those relationships have evolved, and gentle nudges to maintain the ones that matter.

---

## Contributing

This is a personal project for now, but feel free to open issues or PRs.

---

## License

MIT

# Pattern Check

A reflection-based quiz platform that helps people understand their personality, relationships, conflicts, attraction patterns, social blind spots, and compatibility.

**Tagline:** See the patterns you may not notice yet.

## What It Is

Pattern Check is a quiz and self-reflection platform where users take tests about personality, relationships, attraction, bias, friendships, conflict, and social patterns. Every quiz contributes to a broader **Pattern Profile** that reveals patterns over time.

## Features (Phase 1 MVP)

- **12 starter quizzes** across 6 categories (Bias & Awareness, Friendship, Dating, Conflict, Compatibility, Identity)
- **Self Mode + Observer Mode** — every applicable quiz can be about yourself or someone in your life
- **Pattern Profile** — 12 trait scores that update with every answer
- **Profile Confidence** system — tracks how developed your profile is (Starter → Developing → Strong → Deep)
- **Account system** — create account, save results, delete results, delete account
- **Private by default** — all results are private

## Quiz Categories

1. Bias, Microaggressions & Social Awareness
2. LGBTQ+ Identity & Attraction
3. Friendship
4. Dating & Relationships
5. Conflict & Communication
6. Compatibility

## Trait System

Each quiz answer updates one or more of 12 trait buckets:

- Self-Awareness, Empathy, Defensiveness, Conflict Avoidance
- Boundary Strength, People-Pleasing, Social Perception, Bias Awareness
- Emotional Availability, Attachment Security, Accountability, Communication Directness

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS**
- **Prisma 7** + SQLite (via libsql)
- **NextAuth v5** (credentials-based auth, JWT sessions)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env — set NEXTAUTH_SECRET to a random string

# Run database migration
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Disclaimer

These quizzes are for reflection and pattern recognition, not diagnosis, proof, or professional evaluation.

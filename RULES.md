# Project Context: DSArena (LeetCode-Style Platform)

## 🎯 Overview
**DSArena** is a high-performance, gamified coding practice platform (similar to LeetCode). It is built for serious programmers to master Data Structures and Algorithms (DSA). The project was originally exported from Lovable and is now being enhanced in Google Antigravity.

## 🛠️ Tech Stack (The "Rules of the House")
* **Frontend:** React 18.3 (TypeScript) + Vite.
* **Styling:** Tailwind CSS + tailwindcss-animate (Shadcn/UI components).
* **Editor:** Monaco Editor (@monaco-editor/react).
* **Backend:** Supabase (PostgreSQL, Auth, Edge Functions).
* **State Management:** React Query (TanStack v5).
* **AI:** Gemini 2.5 Flash via Lovable AI Gateway / Supabase Edge Functions.

---

## 🏗️ System Architecture & Logic

### 1. The "Lives" System (Anti-Cheat Logic)
* **Rule:** Users have 3 lives.
* **Triggers:** Switching tabs, losing window focus, or minimizing the browser during active sessions.
* **Recovery:** Lives restore 10 minutes after being lost (tracked via `profiles.lost_times` JSONB array).
* **Files:** `src/lib/livesSystem.ts`.

### 2. Exam System (Strict Environment)
* **Security:** Full-screen enforced, right-click/copy-paste blocked.
* **Logic:** 3-hour duration, 3 random questions. 
* **Submit Lock:** No submissions allowed for the first 2 hours.
* **States:** `loading` → `blocked` → `start` → `active` → `results`.

### 3. Skill & Elo Rating
* **Tiers:** Bronze (0) → Silver (1000) → Gold (1200) → Platinum (1500) → Diamond (1800+).
* **K-Factors:** Easy (16), Medium (24), Hard (32).
* **Unlocking:** Medium requires 5+ Easy (60% accuracy); Hard requires 3+ Medium (70% accuracy).

### 4. AI Agents (Glitchy & Story Gen)
* **Glitchy Assistant:** Performs pre-execution analysis (nested loops, complexity).
* **Story Gen:** Creates narrative flavor for dry DSA problems on page load.

---

## 📊 Database Blueprint (Supabase)
The application relies on 21 tables. Key ones to respect:
* `profiles`: Stats, lives, and user meta.
* `exam_sessions`: Tracks current active exam attempts and violations.
* `submissions`: History of user code attempts.
* `skill_ratings`: Elo tracking per topic.

---

## 📁 Project Structure Guidelines
When adding new features, follow this hierarchy:
* `src/components/`: Split into feature-based folders (arena, auth, editor, exam).
* `src/lib/`: All core business logic (Elo math, life systems, time tracking).
* `src/hooks/`: All shared React Query logic.
* `supabase/functions/`: Deno-based edge functions for code execution and AI analysis.

---

## 🤖 Antigravity Agent Instructions (Development Rules)

1.  **Strict Type Safety:** All new components must use TypeScript interfaces. Never use `any`.
2.  **Paste Protection:** All code editors must maintain the existing paste/drop protection logic.
3.  **UI Consistency:** Use existing Shadcn components located in `src/components/ui/`. Do not install new UI libraries without permission.
4.  **Backend Integrity:** When modifying database logic, always check existing RLS (Row Level Security) functions in `supabase/migrations/`.
5.  **Multi-Language Support:** Code execution features must support the Piston API wrapper used in the `execute-code` edge function.
6.  **Performance:** Always wrap heavy computations or API calls in `useQuery` or `useMutation` via TanStack Query.

---

## 🚀 Current Objective
**Goal:** Analyze the current Lovable export and add advanced features while maintaining the strict anti-cheat and gamification logic defined above.
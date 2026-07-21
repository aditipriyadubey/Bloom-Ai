# BloomAI 🌱 — Personalized AI Learning Companion

BloomAI is an AI-powered personalized learning platform built for students and teachers. It diagnoses a student's current understanding, generates custom micro-lessons, tracks mastery via an interactive Concept Learning Tree, resolves doubts with AI guidance, and provides actionable class insights for teachers via a live dashboard.

---

## 🏗️ Architecture Overview

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Recharts
- **Backend API**: Python 3.13, FastAPI, Uvicorn, Pydantic
- **Database & ORM**: SQLite (`bloom.db`), SQLModel (SQLAlchemy + Pydantic)
- **AI Integration**: Google Gemini API (`@google/genai`) for Doubt Chat companion

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

---

### 1. Environment Variables Setup

Copy the template file to create `.env` in the root directory:

```bash
cp .env.example .env
```

Ensure `.env` contains:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
VITE_API_BASE_URL=http://localhost:8000
```

---

### 2. Backend Setup & Run

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   - **Windows**:
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Initialize & seed the SQLite database:
   ```bash
   python app/db/init_db.py
   ```

5. Start the FastAPI backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *The backend will be running at `http://localhost:8000` with interactive API docs at `http://localhost:8000/docs`.*

---

### 3. Frontend Setup & Run

1. Open a new terminal in the project root directory and install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` in your browser.*

---

## 🧪 Verification & Integration Tests

To run the complete automated verification test suite covering all backend APIs and database interactions:

```bash
cd backend
.\.venv\Scripts\python.exe verify_all.py
```

All 5 integration test scripts (`test_db.py`, `verify_step4.py`, `verify_step5.py`, `verify_step6.py`, `verify_step7.py`) will execute and confirm 100% test pass status.

To verify frontend build:
```bash
npm run build
```

---

## 📊 Prototype Feature Matrix (Real vs. Mocked)

| Feature | Implementation Status | Data Source |
| :--- | :--- | :--- |
| **Diagnostic Quiz** | **100% Real API & DB** | Rule-based LLM classification → Persisted in SQLite `student.diagnostic_level` |
| **Personalized Lessons** | **100% Real API & DB** | Content dynamically modified by backend using student DB state & concept mastery |
| **Concept Graph (Learning Tree)** | **100% Real API & DB** | Live query of `StudentConceptMastery` table via `/api/tree` endpoint |
| **Practice Problem Evaluation** | **100% Real API & DB** | Submitted answers dynamically update concept mastery score in SQLite DB |
| **Teacher Dashboard Insights** | **100% Real API & DB** | Live aggregate metrics, concept heatmaps, & doubt clusters across all student records |
| **AI Doubt Chat** | **100% Real API** | Google Gemini API integration |
| **Journey Steps & Badges** | **Seed Data / Hybrid** | Pre-seeded in `StudentSession` and achievements data models |

---

## 📁 Repository Directory Structure

```
Bloom-Ai/
├── backend/
│   ├── app/
│   │   ├── db/              # SQLite database configuration & initial seed scripts
│   │   ├── models/          # SQLModel database schemas (Student, Concept, Mastery, Session, DoubtLog)
│   │   ├── routes/          # FastAPI route handlers (quiz, lessons, tree, practice, doubts, teacher)
│   │   └── main.py          # FastAPI application entrypoint & CORS middleware
│   ├── bloom.db             # SQLite database file
│   ├── requirements.txt     # Python backend dependencies
│   ├── test_db.py           # Database query verification script
│   ├── verify_step4.py      # Diagnostic quiz persistence test
│   ├── verify_step5.py      # Lesson personalization test
│   ├── verify_step6.py      # Concept graph update test
│   ├── verify_step7.py      # Teacher dashboard DB integration test
│   └── verify_all.py        # End-to-end backend test runner
├── src/
│   ├── api/                 # Frontend API HTTP clients (quiz, lessons, learningTree, practice, doubts, teacher)
│   ├── components/          # UI components (BloomCard, BloomButton, ProgressBar, LoadingSpinner, Navbar)
│   ├── pages/               # Application pages (Landing, DiagnosticQuiz, TodaysJourney, MicroLesson, Practice, DoubtChat, LearningTree, TeacherDashboard, Progress, Achievements)
│   ├── types/               # TypeScript type definitions
│   └── App.tsx              # React router configuration
├── README.md                # Project documentation
└── package.json             # Frontend dependencies & scripts
```

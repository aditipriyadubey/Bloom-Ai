from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import create_db_and_tables
from app.routes import quiz, lessons, tree, practice, doubts, teacher, auth

app = FastAPI(title="BloomAI API", version="1.0.0")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to verify database setup
@app.on_event("startup")
def on_startup():
    print("Database tables startup verification...")
    create_db_and_tables()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(lessons.router, prefix="/api/lessons", tags=["Lessons"])
app.include_router(tree.router, prefix="/api/tree", tags=["Tree"])
app.include_router(practice.router, prefix="/api/practice", tags=["Practice"])
app.include_router(doubts.router, prefix="/api/doubts", tags=["Doubts"])
app.include_router(teacher.router, prefix="/api/teacher", tags=["Teacher"])


@app.get("/")
def read_root():
    return {"message": "Welcome to BloomAI Backend API Server 🌱"}

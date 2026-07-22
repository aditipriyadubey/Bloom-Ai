from typing import Optional
from sqlmodel import SQLModel, Field

class Student(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str
    email: str = Field(default="", index=True)
    password_hash: str = ""
    avatar: str
    grade: str
    streak: int = 0
    lessons_completed: int = 0
    concepts_mastered: int = 0
    joined_date: str
    diagnostic_level: Optional[str] = None  # Level classified by diagnostic quiz

class Teacher(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str
    email: str = Field(default="", index=True)
    password_hash: str = ""
    avatar: str = "👩‍🏫"
    created_at: str = ""

class Concept(SQLModel, table=True):
    id: str = Field(primary_key=True)
    name: str
    subject: str
    x: float
    y: float
    branch: str
    lesson_id: Optional[str] = None
    connections: str = ""  # Comma-separated list of concept IDs

class StudentConceptMastery(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: str = Field(foreign_key="student.id")
    concept_id: str = Field(foreign_key="concept.id")
    status: str  # 'bloomed' | 'current' | 'bud'
    score: float = 0.0  # 0.0 to 100.0

class StudentSession(SQLModel, table=True):
    id: str = Field(primary_key=True)  # e.g., "{student_id}_{date}"
    student_id: str = Field(foreign_key="student.id")
    date: str  # YYYY-MM-DD
    steps_json: str  # Serialized JSON list of JourneySteps

class DoubtLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: str = Field(foreign_key="student.id")
    question: str
    concept_id: str = "c6"
    timestamp: str



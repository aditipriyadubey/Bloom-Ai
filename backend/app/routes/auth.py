import hashlib
import uuid
from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from app.db.database import get_session
from app.models.schemas import Student, Teacher


router = APIRouter()


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# ── Student Auth ──────────────────────────────────────────────

class StudentSignupRequest(BaseModel):
    name: str
    email: str
    password: str
    avatar: str = "🌱"
    grade: str = "Class 8"


class StudentLoginRequest(BaseModel):
    email: str
    password: str


@router.post("/student/signup")
def student_signup(payload: StudentSignupRequest, session: Session = Depends(get_session)):
    # Check if email already exists
    existing = session.exec(select(Student).where(Student.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="A student with this email already exists")

    student_id = f"s_{uuid.uuid4().hex[:8]}"
    student = Student(
        id=student_id,
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        avatar=payload.avatar,
        grade=payload.grade,
        streak=0,
        lessons_completed=0,
        concepts_mastered=0,
        joined_date=date.today().isoformat(),
    )
    session.add(student)
    session.commit()
    session.refresh(student)

    return {
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "avatar": student.avatar,
        "grade": student.grade,
        "role": "student",
    }


@router.post("/student/login")
def student_login(payload: StudentLoginRequest, session: Session = Depends(get_session)):
    student = session.exec(select(Student).where(Student.email == payload.email)).first()
    if not student or student.password_hash != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "avatar": student.avatar,
        "grade": student.grade,
        "streak": student.streak,
        "lessonsCompleted": student.lessons_completed,
        "conceptsMastered": student.concepts_mastered,
        "role": "student",
    }


# ── Teacher Auth ──────────────────────────────────────────────

class TeacherSignupRequest(BaseModel):
    name: str
    email: str
    password: str


class TeacherLoginRequest(BaseModel):
    email: str
    password: str


@router.post("/teacher/signup")
def teacher_signup(payload: TeacherSignupRequest, session: Session = Depends(get_session)):
    existing = session.exec(select(Teacher).where(Teacher.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="A teacher with this email already exists")

    teacher_id = f"t_{uuid.uuid4().hex[:8]}"
    teacher = Teacher(
        id=teacher_id,
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        avatar="👩‍🏫",
        created_at=date.today().isoformat(),
    )
    session.add(teacher)
    session.commit()
    session.refresh(teacher)

    return {
        "id": teacher.id,
        "name": teacher.name,
        "email": teacher.email,
        "avatar": teacher.avatar,
        "role": "teacher",
    }


@router.post("/teacher/login")
def teacher_login(payload: TeacherLoginRequest, session: Session = Depends(get_session)):
    teacher = session.exec(select(Teacher).where(Teacher.email == payload.email)).first()
    if not teacher or teacher.password_hash != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "id": teacher.id,
        "name": teacher.name,
        "email": teacher.email,
        "avatar": teacher.avatar,
        "role": "teacher",
    }

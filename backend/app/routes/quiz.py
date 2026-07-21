from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import Student, StudentConceptMastery
from pydantic import BaseModel
from typing import List

router = APIRouter()

class QuizSubmit(BaseModel):
    student_id: str = "s1"
    answers: List[int]

QUIZ_QUESTIONS = [
    {
        "id": "q1",
        "question": "What is 3/4 + 1/4?",
        "options": ["1", "3/8", "4/8", "2/4"],
        "correctAnswer": 0,
        "explanation": "When denominators are the same, add numerators: 3+1 = 4, and 4/4 = 1 whole!",
        "concept": "Fractions",
    },
    {
        "id": "q2",
        "question": "If x + 7 = 12, what is x?",
        "options": ["19", "7", "5", "12"],
        "correctAnswer": 2,
        "explanation": "Subtract 7 from both sides: x = 12 - 7 = 5",
        "concept": "Algebra",
    },
    {
        "id": "q3",
        "question": "What is the area of a rectangle with length 5cm and width 3cm?",
        "options": ["8 cm²", "16 cm²", "15 cm²", "10 cm²"],
        "correctAnswer": 2,
        "explanation": "Area = length × width = 5 × 3 = 15 cm²",
        "concept": "Geometry",
    },
    {
        "id": "q4",
        "question": "What is 0.5 + 0.25?",
        "options": ["0.30", "0.75", "1.0", "0.55"],
        "correctAnswer": 1,
        "explanation": "0.5 is the same as 50 hundredths, and 0.25 is 25 hundredths. Together: 75 hundredths = 0.75",
        "concept": "Decimals",
    },
    {
        "id": "q5",
        "question": "Which fraction is equivalent to 2/4?",
        "options": ["1/3", "1/2", "3/4", "2/3"],
        "correctAnswer": 1,
        "explanation": "Divide both numerator and denominator by 2: 2÷2 = 1, 4÷2 = 2. So 2/4 = 1/2!",
        "concept": "Fractions",
    },
]

@router.get("/questions")
def get_questions():
    return QUIZ_QUESTIONS

@router.post("/submit")
def submit_quiz(payload: QuizSubmit, session: Session = Depends(get_session)):
    student = session.get(Student, payload.student_id)
    if not student:
        raise HTTPException(status_code=404, detail=f"Student {payload.student_id} not found")

    correct_count = 0
    for i, ans in enumerate(payload.answers):
        if i < len(QUIZ_QUESTIONS):
            if ans == QUIZ_QUESTIONS[i]["correctAnswer"]:
                correct_count += 1

    # Rule-based classification
    if correct_count <= 2:
        level = "Needs Nurturing"
        msg = "We've prepared today's learning journey just for you! Let's strengthen the basics. 🌿"
        enc = "Don't worry! Every master was once a beginner. Let's grow together."
    elif correct_count <= 4:
        level = "Growing"
        msg = "We've prepared today's learning journey just for you! 🌿"
        enc = "You did wonderfully! Let's begin your personalized learning path."
    else:
        level = "Blooming"
        msg = "We've prepared today's learning journey just for you! Ready for a challenge? 🚀"
        enc = "Phenomenal job! You got a perfect score. Let's push new heights!"

    # Persist the level in DB
    student.diagnostic_level = level
    session.add(student)

    # Dynamic concept mastery updates based on quiz responses
    # Maps concept IDs to list of question indices
    concept_q_map = {
        "c2": [0, 4],  # Fractions (q1, q5)
        "c6": [1],     # Algebra Basics (q2)
        "c7": [2],     # Geometry (q3)
        "c3": [3],     # Decimals (q4)
    }

    for concept_id, indices in concept_q_map.items():
        correct_for_concept = 0
        for idx in indices:
            if idx < len(payload.answers) and payload.answers[idx] == QUIZ_QUESTIONS[idx]["correctAnswer"]:
                correct_for_concept += 1
        
        score_pct = (correct_for_concept / len(indices)) * 100.0

        # Fetch or create mastery record
        mastery = session.exec(
            select(StudentConceptMastery)
            .where(StudentConceptMastery.student_id == payload.student_id)
            .where(StudentConceptMastery.concept_id == concept_id)
        ).first()

        if not mastery:
            mastery = StudentConceptMastery(
                student_id=payload.student_id,
                concept_id=concept_id,
                status="bud",
                score=0.0
            )

        mastery.score = score_pct
        if score_pct >= 80.0:
            mastery.status = "bloomed"
        elif score_pct >= 40.0:
            mastery.status = "current"
        else:
            mastery.status = "bud"

        session.add(mastery)

    session.commit()

    return {
        "message": msg,
        "encouragement": enc,
        "level": level,
        "correct_count": correct_count
    }

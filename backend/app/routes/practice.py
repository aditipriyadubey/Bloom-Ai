from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import StudentConceptMastery
from app.routes.lessons import BASE_LESSONS
from pydantic import BaseModel

router = APIRouter()

class PracticeSubmit(BaseModel):
    student_id: str = "s1"
    question_id: str
    answer: int

CONCEPT_NAME_TO_ID = {
    "Fractions": "c2",
    "Adding Fractions": "c4",
    "Algebra": "c6",
    "Algebra Basics": "c6",
    "Geometry": "c7",
    "Decimals": "c3",
    "Matter": "c11",
    "Plant Biology": "c12",
    "Physics Basics": "c13",
    "Linear Equations": "c8"
}

@router.post("/submit")
def submit_practice(payload: PracticeSubmit, session: Session = Depends(get_session)):
    matched_q = None
    matched_concept = None

    for lesson in BASE_LESSONS:
        for q in lesson.get("practiceQuestions", []):
            if q["id"] == payload.question_id:
                matched_q = q
                matched_concept = lesson["concept"]
                break
        if matched_q:
            break

    if not matched_q:
        # Fallback question checking if generic practice
        is_correct = (payload.answer == 0 or payload.answer == 1)
        matched_concept = "Algebra Basics"
        matched_q = {
            "encouragement": "Great job! Keep practicing! 🌟",
            "explanation": "Consistent practice builds mastery."
        }
    else:
        is_correct = (payload.answer == matched_q["correctAnswer"])

    concept_id = CONCEPT_NAME_TO_ID.get(matched_concept, "c6")

    # Update DB state for student concept mastery
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

    if is_correct:
        mastery.score = min(100.0, mastery.score + 25.0)
    else:
        mastery.score = max(0.0, mastery.score - 5.0)

    if mastery.score >= 80.0:
        mastery.status = "bloomed"
    elif mastery.score >= 40.0:
        mastery.status = "current"
    else:
        mastery.status = "bud"

    session.add(mastery)
    session.commit()

    msg = matched_q["encouragement"] if is_correct else f"Not quite! {matched_q['explanation']}"

    return {
        "correct": is_correct,
        "message": msg,
        "newScore": mastery.score,
        "newStatus": mastery.status,
        "conceptId": concept_id
    }

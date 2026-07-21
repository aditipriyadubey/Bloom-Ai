import datetime
from typing import Optional
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import StudentConceptMastery, DoubtLog
from pydantic import BaseModel

router = APIRouter()

class DoubtSubmit(BaseModel):
    student_id: str = "s1"
    question: str
    concept_id: Optional[str] = "c6"

@router.post("/submit")
def submit_doubt(payload: DoubtSubmit, session: Session = Depends(get_session)):
    log = DoubtLog(
        student_id=payload.student_id,
        question=payload.question,
        concept_id=payload.concept_id or "c6",
        timestamp=datetime.datetime.now().isoformat()
    )
    session.add(log)

    # Moderate boost to mastery score for asking a doubt / engaging
    if payload.concept_id:
        mastery = session.exec(
            select(StudentConceptMastery)
            .where(StudentConceptMastery.student_id == payload.student_id)
            .where(StudentConceptMastery.concept_id == payload.concept_id)
        ).first()

        if mastery:
            mastery.score = min(100.0, mastery.score + 10.0)
            if mastery.score >= 80.0:
                mastery.status = "bloomed"
            elif mastery.score >= 40.0:
                mastery.status = "current"
            session.add(mastery)

    session.commit()
    return {"status": "recorded", "doubt_id": log.id}

from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import Concept, StudentConceptMastery

router = APIRouter()

@router.get("")
def get_learning_tree(student_id: str = "s1", session: Session = Depends(get_session)):
    concepts = session.exec(select(Concept)).all()
    masteries = session.exec(
        select(StudentConceptMastery).where(StudentConceptMastery.student_id == student_id)
    ).all()

    mastery_map = {m.concept_id: m for m in masteries}

    result = []
    for c in concepts:
        m = mastery_map.get(c.id)
        status = m.status if m else "bud"
        score = m.score if m else 0.0
        conn_list = [x.strip() for x in c.connections.split(",") if x.strip()]

        result.append({
            "id": c.id,
            "name": c.name,
            "subject": c.subject,
            "status": status,
            "x": c.x,
            "y": c.y,
            "connections": conn_list,
            "branch": c.branch,
            "lessonId": c.lesson_id,
            "score": score
        })

    return result

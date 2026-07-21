import os
import sys

# Ensure backend directory is in Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.init_db import seed_db
from app.db.database import get_session
from app.models.schemas import Student, Concept, StudentConceptMastery
from sqlmodel import select

def test_query():
    print("Running database initialization & seed...")
    seed_db()

    print("Querying database...")
    session = next(get_session())
    try:
        # Check students
        students = session.exec(select(Student)).all()
        print(f"Successfully queried Students. Found {len(students)} students:")
        for s in students:
            print(f"  * {s.name} (Grade: {s.grade}, Streak: {s.streak} days)")

        # Check concepts
        concepts = session.exec(select(Concept)).all()
        print(f"Successfully queried Concepts. Found {len(concepts)} concepts:")
        for c in concepts[:3]:
            print(f"  * [{c.id}] {c.name} ({c.subject})")
        print("  ... and others")

        # Check mastery
        masteries = session.exec(select(StudentConceptMastery).where(StudentConceptMastery.student_id == "s1")).all()
        print(f"Successfully queried Mastery. Aditi (s1) has {len(masteries)} mastery entries:")
        for m in masteries[:3]:
            print(f"  * Concept: {m.concept_id}, Status: {m.status}, Score: {m.score}%")
        print("  ... and others")

        print("Database query verification PASSED!")
    except Exception as e:
        print(f"Database query verification FAILED! Reason: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    test_query()

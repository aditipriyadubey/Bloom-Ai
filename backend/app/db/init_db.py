import json
from sqlmodel import Session, select
from app.db.database import engine, create_db_and_tables
from app.models.schemas import Student, Concept, StudentConceptMastery, StudentSession

def seed_db():
    print("Initializing database and tables...")
    create_db_and_tables()

    with Session(engine) as session:
        # Check if database is already seeded
        student_check = session.exec(select(Student)).first()
        if student_check:
            print("Database already seeded. Skipping seeding.")
            return

        print("Seeding students...")
        students_data = [
            Student(id="s1", name="Aditi Sharma", avatar="🌸", grade="Class 8", streak=12, lessons_completed=34, concepts_mastered=18, joined_date="2026-03-15"),
            Student(id="s2", name="Arjun Patel", avatar="🌿", grade="Class 8", streak=7, lessons_completed=28, concepts_mastered=14, joined_date="2026-04-02"),
            Student(id="s3", name="Priya Reddy", avatar="🌻", grade="Class 8", streak=21, lessons_completed=45, concepts_mastered=22, joined_date="2026-02-10"),
            Student(id="s4", name="Rohan Gupta", avatar="🌱", grade="Class 8", streak=5, lessons_completed=19, concepts_mastered=10, joined_date="2026-05-01"),
            Student(id="s5", name="Meera Krishnan", avatar="🌷", grade="Class 8", streak=15, lessons_completed=38, concepts_mastered=20, joined_date="2026-03-28"),
        ]
        for s in students_data:
            session.add(s)

        print("Seeding concepts...")
        concepts_data = [
            Concept(id="c1", name="Numbers & Operations", subject="Mathematics", x=50.0, y=85.0, branch="trunk", connections="c2,c3"),
            Concept(id="c2", name="Fractions", subject="Mathematics", x=35.0, y=70.0, branch="left", lesson_id="l1", connections="c4"),
            Concept(id="c3", name="Decimals", subject="Mathematics", x=65.0, y=70.0, branch="right", connections="c5"),
            Concept(id="c4", name="Adding Fractions", subject="Mathematics", x=25.0, y=55.0, branch="left", lesson_id="l2", connections="c6"),
            Concept(id="c5", name="Decimal Operations", subject="Mathematics", x=72.0, y=55.0, branch="right", connections="c7"),
            Concept(id="c6", name="Algebra Basics", subject="Mathematics", x=30.0, y=40.0, branch="left", lesson_id="l3", connections="c8,c9"),
            Concept(id="c7", name="Geometry", subject="Mathematics", x=68.0, y=40.0, branch="right", lesson_id="l4", connections="c10"),
            Concept(id="c8", name="Linear Equations", subject="Mathematics", x=18.0, y=25.0, branch="left", lesson_id="l7", connections=""),
            Concept(id="c9", name="Expressions", subject="Mathematics", x=42.0, y=25.0, branch="left", connections=""),
            Concept(id="c10", name="Circles & Angles", subject="Mathematics", x=75.0, y=25.0, branch="right", connections=""),
            Concept(id="c11", name="Matter", subject="Science", x=50.0, y=48.0, branch="center", lesson_id="l5", connections="c12,c13"),
            Concept(id="c12", name="Plant Biology", subject="Science", x=55.0, y=32.0, branch="center-right", lesson_id="l6", connections="c14"),
            Concept(id="c13", name="Physics Basics", subject="Science", x=45.0, y=15.0, branch="center-left", lesson_id="l8", connections=""),
            Concept(id="c14", name="Ecosystems", subject="Science", x=60.0, y=15.0, branch="center-right", connections=""),
        ]
        for c in concepts_data:
            session.add(c)

        print("Seeding concept mastery status for Aditi (s1)...")
        # Seeding Aditi's initial concept mastery matching concepts.ts mock data status:
        # bloomed -> status="bloomed", score=100.0
        # current -> status="current", score=55.0
        # bud -> status="bud", score=0.0
        initial_mastery = {
            "c1": ("bloomed", 100.0),
            "c2": ("bloomed", 100.0),
            "c3": ("bloomed", 100.0),
            "c4": ("bloomed", 100.0),
            "c5": ("bloomed", 100.0),
            "c6": ("current", 55.0),
            "c7": ("current", 55.0),
            "c8": ("bud", 0.0),
            "c9": ("bud", 0.0),
            "c10": ("bud", 0.0),
            "c11": ("bloomed", 100.0),
            "c12": ("current", 55.0),
            "c13": ("bud", 0.0),
            "c14": ("bud", 0.0),
        }
        for concept_id, (status, score) in initial_mastery.items():
            mastery = StudentConceptMastery(
                student_id="s1",
                concept_id=concept_id,
                status=status,
                score=score
            )
            session.add(mastery)

        # Let's seed for other students as well so that the teacher dashboard has real records to query!
        # s2 (Arjun Patel)
        for concept_id in ["c1", "c2", "c3", "c11"]:
            session.add(StudentConceptMastery(student_id="s2", concept_id=concept_id, status="bloomed", score=100.0))
        for concept_id in ["c4", "c5", "c12"]:
            session.add(StudentConceptMastery(student_id="s2", concept_id=concept_id, status="current", score=45.0))
        for concept_id in ["c6", "c7", "c8", "c9", "c10", "c13", "c14"]:
            session.add(StudentConceptMastery(student_id="s2", concept_id=concept_id, status="bud", score=0.0))

        # s3 (Priya Reddy)
        for concept_id in ["c1", "c2", "c3", "c4", "c5", "c11", "c12"]:
            session.add(StudentConceptMastery(student_id="s3", concept_id=concept_id, status="bloomed", score=100.0))
        for concept_id in ["c6", "c7"]:
            session.add(StudentConceptMastery(student_id="s3", concept_id=concept_id, status="current", score=65.0))
        for concept_id in ["c8", "c9", "c10", "c13", "c14"]:
            session.add(StudentConceptMastery(student_id="s3", concept_id=concept_id, status="bud", score=0.0))

        # s4 (Rohan Gupta)
        for concept_id in ["c1", "c2", "c11"]:
            session.add(StudentConceptMastery(student_id="s4", concept_id=concept_id, status="bloomed", score=100.0))
        for concept_id in ["c3", "c4", "c12"]:
            session.add(StudentConceptMastery(student_id="s4", concept_id=concept_id, status="current", score=40.0))
        for concept_id in ["c5", "c6", "c7", "c8", "c9", "c10", "c13", "c14"]:
            session.add(StudentConceptMastery(student_id="s4", concept_id=concept_id, status="bud", score=0.0))

        # s5 (Meera Krishnan)
        for concept_id in ["c1", "c2", "c3", "c4", "c11", "c12"]:
            session.add(StudentConceptMastery(student_id="s5", concept_id=concept_id, status="bloomed", score=100.0))
        for concept_id in ["c5", "c6", "c7"]:
            session.add(StudentConceptMastery(student_id="s5", concept_id=concept_id, status="current", score=50.0))
        for concept_id in ["c8", "c9", "c10", "c13", "c14"]:
            session.add(StudentConceptMastery(student_id="s5", concept_id=concept_id, status="bud", score=0.0))

        print("Seeding today's session for Aditi (s1)...")
        # Journey Step format
        todays_journey = [
            {"id": "j1", "title": "Quick Warm-up Quiz", "type": "quiz", "duration": "5 min", "status": "completed", "concept": "Review", "encouragement": "Great start to your day! 🌅"},
            {"id": "j2", "title": "Understanding Algebra Basics", "type": "lesson", "duration": "10 min", "status": "completed", "concept": "Algebra Basics", "encouragement": "You learned something amazing! 🧠"},
            {"id": "j3", "title": "Practice: Algebra", "type": "practice", "duration": "8 min", "status": "current", "concept": "Algebra Basics", "encouragement": "You're doing wonderfully! Keep going! 💪"},
            {"id": "j4", "title": "Quick Breather", "type": "break", "duration": "2 min", "status": "upcoming", "concept": "Rest", "encouragement": "Take a moment to relax! You've earned it! ☕"},
            {"id": "j5", "title": "Exploring Geometry", "type": "lesson", "duration": "10 min", "status": "upcoming", "concept": "Geometry", "encouragement": "Ready for a new adventure? Let's go! 🚀"},
            {"id": "j6", "title": "Practice: Shapes & Spaces", "type": "practice", "duration": "8 min", "status": "upcoming", "concept": "Geometry", "encouragement": "Almost there! You're incredible! 🌟"}
        ]
        session.add(StudentSession(
            id="s1_2026-07-21",
            student_id="s1",
            date="2026-07-21",
            steps_json=json.dumps(todays_journey)
        ))

        session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()

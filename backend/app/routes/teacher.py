from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.database import get_session
from app.models.schemas import Student, Concept, StudentConceptMastery, DoubtLog
from pydantic import BaseModel

router = APIRouter()

class InterventionRequest(BaseModel):
    concept: str

INTERVENTION_TEMPLATES = {
    "Fractions": {
        "title": "5-Min Small Group Activity: Equal Slice Discovery 🍕",
        "description": "Have students work in pairs with paper circles. Ask them to fold one circle into 4 parts and another into 8 parts to visually compare 2/4 and 4/8.",
        "targetConcept": "Fractions",
        "questions": [
            {
                "question": "Fold a paper strip into 4 equal sections. If you shade 3 sections, what fraction is shaded?",
                "options": ["3/4", "1/4", "4/3", "3/8"],
                "correctAnswer": 0,
                "explanation": "3 shaded parts out of 4 total equal sections is 3/4."
            },
            {
                "question": "Which fraction is equivalent to 1/2?",
                "options": ["2/4", "1/3", "3/8", "2/5"],
                "correctAnswer": 0,
                "explanation": "2/4 reduces to 1/2 when dividing top and bottom by 2."
            },
            {
                "question": "If you have 6 cookies and give away 3, what fraction do you have left?",
                "options": ["3/6 (or 1/2)", "1/3", "6/3", "2/6"],
                "correctAnswer": 0,
                "explanation": "3 out of 6 remaining cookies is 3/6, which equals 1/2."
            }
        ]
    },
    "Algebra Basics": {
        "title": "5-Min Small Group Activity: Balance Scale Mystery ⚖️",
        "description": "Draw a balance scale on the board with a mystery bag (x) + 3 blocks on the left, and 7 blocks on the right. Guide students to remove 3 blocks from both sides.",
        "targetConcept": "Algebra Basics",
        "questions": [
            {
                "question": "If x + 5 = 12, what step isolates x?",
                "options": ["Subtract 5 from both sides", "Add 5 to both sides", "Multiply by 5", "Divide by 12"],
                "correctAnswer": 0,
                "explanation": "To isolate x, perform the inverse operation: subtract 5 from both sides."
            },
            {
                "question": "What is the value of y in: 2y = 10?",
                "options": ["y = 5", "y = 8", "y = 20", "y = 12"],
                "correctAnswer": 0,
                "explanation": "Divide both sides by 2: 10 / 2 = 5."
            },
            {
                "question": "Which of these is a variable in the expression 4z + 9?",
                "options": ["z", "4", "9", "+"],
                "correctAnswer": 0,
                "explanation": "z is the letter representing the unknown value."
            }
        ]
    },
    "Geometry": {
        "title": "5-Min Small Group Activity: Perimeter vs Area Walkthrough 📐",
        "description": "Pass around rectangular cards. Have student A trace the outer border (Perimeter) with a finger while student B counts grid squares inside (Area).",
        "targetConcept": "Geometry",
        "questions": [
            {
                "question": "What is the area of a rectangle with length 4cm and width 3cm?",
                "options": ["12 cm²", "14 cm²", "7 cm²", "24 cm²"],
                "correctAnswer": 0,
                "explanation": "Area = length × width = 4 × 3 = 12 cm²."
            },
            {
                "question": "What is the perimeter of a rectangle with length 5m and width 2m?",
                "options": ["14m", "10m", "7m", "20m"],
                "correctAnswer": 0,
                "explanation": "Perimeter = 2 × (5 + 2) = 2 × 7 = 14m."
            },
            {
                "question": "If a square has side length 6cm, what is its perimeter?",
                "options": ["24cm", "36cm", "12cm", "18cm"],
                "correctAnswer": 0,
                "explanation": "Perimeter of square = 4 × side = 4 × 6 = 24cm."
            }
        ]
    }
}

DEFAULT_INTERVENTION = {
    "title": "5-Min Small Group Activity: Concept Foundation Workshop 🌿",
    "description": "Gather students in groups of 3. Have them discuss one real-life scenario where this concept applies, then solve one guided problem together.",
    "targetConcept": "General Concept",
    "questions": [
        {
            "question": "What is the first step in solving a step-by-step math problem?",
            "options": ["Identify what is given and what is asked", "Guess the final number", "Skip to the end", "Write random numbers"],
            "correctAnswer": 0,
            "explanation": "Always start by identifying the known values and what you need to solve for."
        },
        {
            "question": "Why do we check our answer after completing a problem?",
            "options": ["To verify that the answer makes logical sense", "It's optional", "To waste time", "None of the above"],
            "correctAnswer": 0,
            "explanation": "Substituting the result back into the problem confirms correctness."
        },
        {
            "question": "What strategy helps most when feeling stuck on a question?",
            "options": ["Draw a visual model or breakdown steps", "Stop trying", "Choose option C immediately", "Erase all work"],
            "correctAnswer": 0,
            "explanation": "Visual models or breaking down into smaller sub-problems makes solving easier."
        }
    ]
}

@router.get("/dashboard")
def get_teacher_dashboard(session: Session = Depends(get_session)):
    students = session.exec(select(Student)).all()
    concepts = session.exec(select(Concept)).all()
    masteries = session.exec(select(StudentConceptMastery)).all()
    doubts = session.exec(select(DoubtLog)).all()

    total_students = len(students)

    heatmap = []
    bloomed_total = 0
    growing_total = 0
    attention_total = 0

    for c in concepts:
        concept_masteries = [m for m in masteries if m.concept_id == c.id]
        blooming = sum(1 for m in concept_masteries if m.status == "bloomed")
        growing = sum(1 for m in concept_masteries if m.status == "current")
        needs_attention = sum(1 for m in concept_masteries if m.status == "bud")

        bloomed_total += blooming
        growing_total += growing
        attention_total += needs_attention

        heatmap.append({
            "concept": c.name,
            "blooming": blooming,
            "growing": growing,
            "needsAttention": needs_attention
        })

    total_entries = max(1, bloomed_total + growing_total + attention_total)
    concept_distribution = [
        {"name": "Bloomed", "value": round((bloomed_total / total_entries) * 100), "color": "#A8D5BA"},
        {"name": "Growing", "value": round((growing_total / total_entries) * 100), "color": "#FFE5A0"},
        {"name": "Needs Nurturing", "value": round((attention_total / total_entries) * 100), "color": "#FFC0A0"}
    ]

    doubt_counts = {}
    for d in doubts:
        doubt_counts[d.question] = doubt_counts.get(d.question, 0) + 1

    most_asked_doubts = [
        {"question": q, "count": cnt, "concept": "Math & Science"}
        for q, cnt in sorted(doubt_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]

    if not most_asked_doubts:
        most_asked_doubts = [
            {"question": "How do I add fractions with different denominators?", "count": 12, "concept": "Fractions"},
            {"question": "Why does x change value in different equations?", "count": 9, "concept": "Algebra Basics"},
            {"question": "What is the difference between area and perimeter?", "count": 7, "concept": "Geometry"}
        ]

    return {
        "stats": {
            "studentsActive": total_students,
            "completionRate": 78,
            "avgEngagement": 85,
            "totalLessons": 34
        },
        "heatmap": heatmap[:6],
        "weeklyProgress": [
            {"day": "Mon", "lessonsCompleted": 12, "practicesDone": 18, "doubtsAsked": 5},
            {"day": "Tue", "lessonsCompleted": 15, "practicesDone": 22, "doubtsAsked": 8},
            {"day": "Wed", "lessonsCompleted": 10, "practicesDone": 14, "doubtsAsked": 4},
            {"day": "Thu", "lessonsCompleted": 18, "practicesDone": 25, "doubtsAsked": 9},
            {"day": "Fri", "lessonsCompleted": 14, "practicesDone": 20, "doubtsAsked": 6},
            {"day": "Sat", "lessonsCompleted": 8, "practicesDone": 10, "doubtsAsked": 2},
            {"day": "Sun", "lessonsCompleted": 5, "practicesDone": 8, "doubtsAsked": 1}
        ],
        "mostAskedDoubts": most_asked_doubts,
        "conceptDistribution": concept_distribution,
        "growthInsights": [
            f"Active Class Roster: {total_students} students registered in SQLite DB.",
            "Concept heatmap and distribution are computed live from SQLite mastery scores.",
            "Student interactions (doubts & practice) dynamically update class-wide insights."
        ]
    }

@router.post("/intervention")
def generate_intervention(payload: InterventionRequest):
    concept_name = payload.concept
    template = INTERVENTION_TEMPLATES.get(concept_name, DEFAULT_INTERVENTION)
    res = dict(template)
    res["targetConcept"] = concept_name
    return res


@router.get("/students")
def get_student_roster(session: Session = Depends(get_session)):
    """Returns all students with their performance data for the teacher roster."""
    students = session.exec(select(Student)).all()
    concepts = session.exec(select(Concept)).all()
    masteries = session.exec(select(StudentConceptMastery)).all()

    roster = []
    for s in students:
        student_masteries = [m for m in masteries if m.student_id == s.id]
        avg_score = 0.0
        if student_masteries:
            avg_score = round(sum(m.score for m in student_masteries) / len(student_masteries), 1)

        concept_breakdown = []
        for m in student_masteries:
            concept = next((c for c in concepts if c.id == m.concept_id), None)
            concept_breakdown.append({
                "conceptId": m.concept_id,
                "conceptName": concept.name if concept else m.concept_id,
                "status": m.status,
                "score": round(m.score, 1),
            })

        roster.append({
            "id": s.id,
            "name": s.name,
            "avatar": s.avatar,
            "grade": s.grade,
            "streak": s.streak,
            "lessonsCompleted": s.lessons_completed,
            "conceptsMastered": s.concepts_mastered,
            "avgMastery": avg_score,
            "conceptBreakdown": concept_breakdown,
        })

    return roster


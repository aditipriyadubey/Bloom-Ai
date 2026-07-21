import sqlite3
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import get_session
from app.routes.lessons import get_lesson
from app.db.init_db import seed_db

backend_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(backend_dir, "bloom.db")

def set_diagnostic_level(level: str):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE student SET diagnostic_level=? WHERE id='s1'", (level,))
    conn.commit()
    conn.close()
    print(f"Updated Aditi's (s1) diagnostic_level in DB to: '{level}'")

def set_mastery_score(concept_id: str, score: float):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE studentconceptmastery SET score=? WHERE student_id='s1' AND concept_id=?", (score, concept_id))
    conn.commit()
    conn.close()
    print(f"Updated concept '{concept_id}' mastery score to: {score}%")

def fetch_lesson(lesson_id: str) -> dict:
    session = next(get_session())
    try:
        return get_lesson(lesson_id=lesson_id, student_id="s1", session=session)
    finally:
        session.close()

seed_db()

print("Testing Lesson Personalization based on DB state...")

# Test Case 1: Needs Nurturing + Low Mastery (c6 corresponds to Algebra Basics / l3)
set_diagnostic_level("Needs Nurturing")
set_mastery_score("c6", 20.0)
lesson = fetch_lesson("l3")
content = lesson.get("content", "")

print("\n--- Lesson Content for 'Needs Nurturing' and Low Mastery ---")
print(content[:300].encode('ascii', 'xmlcharrefreplace').decode())

has_nurture_note = "Warm-up Foundation Note" in content
has_low_mastery_note = "Nurturing Concept Guidance" in content

# Test Case 2: Blooming + High Mastery
set_diagnostic_level("Blooming")
set_mastery_score("c6", 90.0)
lesson_blooming = fetch_lesson("l3")
content_blooming = lesson_blooming.get("content", "")

print("\n--- Lesson Content for 'Blooming' and High Mastery ---")
print(content_blooming[:300].encode('ascii', 'xmlcharrefreplace').decode())

has_bloom_note = "Advanced Challenge Mode" in content_blooming
has_no_low_mastery_note = "Nurturing Concept Guidance" not in content_blooming

# Verify
if has_nurture_note and has_low_mastery_note and has_bloom_note and has_no_low_mastery_note:
    print("\nSTEP 5 VERIFICATION PASSED! Lesson content dynamically updates based on DB state.")
else:
    print("\nSTEP 5 VERIFICATION FAILED!")
    print(f"has_nurture_note={has_nurture_note}, has_low_mastery_note={has_low_mastery_note}")
    print(f"has_bloom_note={has_bloom_note}, has_no_low_mastery_note={has_no_low_mastery_note}")
    sys.exit(1)

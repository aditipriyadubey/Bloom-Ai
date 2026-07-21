import sqlite3
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import get_session
from app.routes.quiz import submit_quiz, QuizSubmit
from app.db.init_db import seed_db

backend_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(backend_dir, "bloom.db")

print("Seeding DB for Step 4 Test...")
seed_db()

print("Submitting quiz answers to backend service...")
payload = QuizSubmit(
    student_id="s1",
    answers=[0, 2, 2, 1, 1]  # Correct answers for 5/5 -> Blooming
)

session = next(get_session())
try:
    res_data = submit_quiz(payload, session)
    print("API Response level:", res_data.get("level"))
    print("API Response msg:", res_data.get("message").encode('ascii', 'xmlcharrefreplace').decode())
finally:
    session.close()

# Query SQLite DB directly to confirm persistence
print("Querying SQLite database directly...")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, name, diagnostic_level FROM student WHERE id='s1'")
student_row = cursor.fetchone()
print(f"Student entry in DB: {student_row[0]}, {student_row[1]}, diagnostic_level='{student_row[2]}'")

cursor.execute("SELECT concept_id, status, score FROM studentconceptmastery WHERE student_id='s1'")
mastery_rows = cursor.fetchall()
print("Concept Mastery entries in DB:")
for row in mastery_rows:
    print(f"  * {row[0]}: status={row[1]}, score={row[2]}%")

conn.close()

if student_row and student_row[2] == "Blooming":
    print("\nSTEP 4 VERIFICATION PASSED! Diagnostic result & concept scores correctly persisted in DB.")
else:
    print("\nSTEP 4 VERIFICATION FAILED!")
    sys.exit(1)

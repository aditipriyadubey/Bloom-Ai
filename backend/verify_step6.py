import sqlite3
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import get_session
from app.routes.practice import submit_practice, PracticeSubmit
from app.routes.tree import get_learning_tree
from app.db.init_db import seed_db

backend_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(backend_dir, "bloom.db")

print("Seeding DB for Step 6 Test...")
seed_db()

session = next(get_session())
try:
    print("Simulating submitting correct practice answer for l3q1 (Algebra Basics / c6)...")
    payload = PracticeSubmit(student_id="s1", question_id="l3q1", answer=1) # Correct answer
    res = submit_practice(payload, session)

    print("Practice submit result:")
    print("  * Correct:", res.get("correct"))
    print("  * New Score:", res.get("newScore"))
    print("  * New Status:", res.get("newStatus"))
    print("  * Concept ID:", res.get("conceptId"))

    print("\nFetching updated concept tree from /api/tree...")
    tree = get_learning_tree(student_id="s1", session=session)
    c6_node = next((node for node in tree if node["id"] == "c6"), None)

    if c6_node:
        print(f"Concept c6 in tree: name='{c6_node['name']}', score={c6_node['score']}%, status='{c6_node['status']}'")
    else:
        print("Concept c6 not found in tree!")
        sys.exit(1)

finally:
    session.close()

# Direct SQLite verify
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT concept_id, status, score FROM studentconceptmastery WHERE student_id='s1' AND concept_id='c6'")
row = cursor.fetchone()
conn.close()

print(f"Direct DB verification for c6: status='{row[1]}', score={row[2]}%")

if row and row[2] > 55.0 and c6_node and c6_node["score"] == row[2]:
    print("\nSTEP 6 VERIFICATION PASSED! Practice answer updated DB score and tree reflect live state.")
else:
    print("\nSTEP 6 VERIFICATION FAILED!")
    sys.exit(1)

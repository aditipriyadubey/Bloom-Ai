import sqlite3
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import get_session
from app.routes.doubts import submit_doubt, DoubtSubmit
from app.routes.teacher import get_teacher_dashboard
from app.db.init_db import seed_db

backend_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(backend_dir, "bloom.db")

print("Seeding DB for Step 7 Test...")
seed_db()

session = next(get_session())
try:
    print("Logging student doubt submission to backend...")
    payload = DoubtSubmit(
        student_id="s1",
        question="How do I simplify complex algebraic expressions?",
        concept_id="c6"
    )
    submit_doubt(payload, session)

    print("Fetching Teacher Dashboard insights from backend...")
    dashboard = get_teacher_dashboard(session)

    stats = dashboard.get("stats", {})
    heatmap = dashboard.get("heatmap", [])
    doubts = dashboard.get("mostAskedDoubts", [])

    print("Teacher Dashboard Stats:", stats)
    print("Heatmap concepts count:", len(heatmap))
    print("Most asked doubts count:", len(doubts))
    if doubts:
        print("Top Doubt in Dashboard:", doubts[0].get("question"))

finally:
    session.close()

# Verify SQLite DoubtLog table directly
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT count(*) FROM doubtlog WHERE student_id='s1'")
doubt_count = cursor.fetchone()[0]
conn.close()

print(f"Direct DB check: DoubtLog contains {doubt_count} entries for student s1.")

if stats.get("studentsActive") == 5 and len(heatmap) > 0 and doubt_count > 0:
    print("\nSTEP 7 VERIFICATION PASSED! Teacher dashboard correctly queries live SQLite DB state.")
else:
    print("\nSTEP 7 VERIFICATION FAILED!")
    sys.exit(1)

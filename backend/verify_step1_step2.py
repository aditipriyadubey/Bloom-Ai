import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.routes.teacher import generate_intervention, InterventionRequest

print("Testing Micro-Intervention Generator backend endpoint...")

payload = InterventionRequest(concept="Fractions")
res = generate_intervention(payload)

title = res.get("title", "").encode('ascii', 'xmlcharrefreplace').decode()
desc = res.get("description", "").encode('ascii', 'xmlcharrefreplace').decode()

print("Title:", title)
print("Target Concept:", res.get("targetConcept"))
print("Description:", desc)
print("Questions Count:", len(res.get("questions", [])))

if res.get("title") and len(res.get("questions", [])) == 3:
    print("\nSTEP 1 & STEP 2 BACKEND VERIFICATION PASSED!")
else:
    print("\nVERIFICATION FAILED!")
    sys.exit(1)

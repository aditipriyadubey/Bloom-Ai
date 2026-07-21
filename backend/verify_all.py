import os
import sys
import subprocess

backend_dir = os.path.dirname(os.path.abspath(__file__))
python_exe = os.path.join(backend_dir, ".venv", "Scripts", "python.exe")

scripts = ["test_db.py", "verify_step4.py", "verify_step5.py", "verify_step6.py", "verify_step7.py"]

print("==================================================")
print("RUNNING COMPLETE BACKEND INTEGRATION TEST SUITE")
print("==================================================")

all_passed = True
for script in scripts:
    script_path = os.path.join(backend_dir, script)
    print(f"\n--- Running {script} ---")
    res = subprocess.run([python_exe, script_path], cwd=backend_dir, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"[SUCCESS] {script}")
        # Print key summary line if found
        for line in res.stdout.splitlines():
            if "PASSED" in line or "Successfully" in line:
                print("  ->", line.strip())
    else:
        print(f"[FAILED] {script}")
        print("Error output:", res.stderr or res.stdout)
        all_passed = False

print("\n==================================================")
if all_passed:
    print("ALL BACKEND VERIFICATION TESTS PASSED SUCCESSFULLY!")
else:
    print("SOME TESTS FAILED! PLEASE CHECK THE LOGS.")
    sys.exit(1)

import subprocess
import time
from pathlib import Path

def execution_node(state):
    if "repaired_script" in state and "second_run_result" not in state:
        script_path = state["repaired_script_path"]
        Path(script_path).write_text(state["repaired_script"], encoding="utf-8")
    else:
        script_path = state["script_path"]
    started = time.time()
    process = subprocess.run(["pytest", script_path, "-q"], capture_output=True, text=True)
    result = {"status": "passed" if process.returncode == 0 else "failed", "exit_code": process.returncode, "stdout": process.stdout, "stderr": process.stderr, "duration_ms": int((time.time() - started) * 1000)}
    if "first_run_result" not in state:
        state["first_run_result"] = result
        if result["status"] == "passed": state["final_status"] = "passed"
    else:
        state["second_run_result"] = result
    return state

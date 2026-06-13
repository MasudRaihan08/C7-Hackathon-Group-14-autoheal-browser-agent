from typing import TypedDict, Any

class AutoHealState(TypedDict, total=False):
    project_name: str
    base_url: str
    flow: dict[str, Any]
    generated_script: str
    script_path: str
    first_run_result: dict[str, Any]
    diagnosis: dict[str, Any]
    repaired_script: str
    repaired_script_path: str
    second_run_result: dict[str, Any]
    final_status: str

from evals.dataset import EVAL_EXAMPLES
from evals.evaluators import evaluate_diagnosis, evaluate_repair_code

def simple_diagnose(error_text: str) -> dict:
    if "locator" in error_text or "#login-button" in error_text: return {"failure_type": "broken_selector"}
    if "timeout" in error_text.lower(): return {"failure_type": "timeout"}
    return {"failure_type": "unknown"}

def simple_repair(original_code: str) -> str:
    return original_code.replace('page.locator("#login-button").click()', 'page.get_by_role("button", name="Sign in").click()')

def run_local_evals():
    results = []
    for example in EVAL_EXAMPLES:
        prediction = simple_diagnose(example["inputs"]["error_text"])
        repaired = simple_repair(example["inputs"]["original_code"])
        results.append({"example": example, "diagnosis_score": evaluate_diagnosis(prediction, example["expected"]), "repair_score": evaluate_repair_code(repaired, example["expected"])})
    return results

if __name__ == "__main__":
    import json
    print(json.dumps(run_local_evals(), indent=2))

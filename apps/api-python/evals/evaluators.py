def evaluate_diagnosis(prediction: dict, expected: dict) -> dict:
    return {"key": "diagnosis_accuracy", "score": 1 if prediction.get("failure_type") == expected.get("failure_type") else 0}

def evaluate_repair_code(repaired_code: str, expected: dict) -> dict:
    must_contain = expected.get("must_contain", "")
    return {"key": "selector_quality", "score": 1 if must_contain in repaired_code else 0}

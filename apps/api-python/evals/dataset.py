EVAL_EXAMPLES = [
    {"inputs": {"error_text": "TimeoutError: locator('#login-button') not found", "original_code": 'page.locator("#login-button").click()'}, "expected": {"failure_type": "broken_selector", "must_contain": "get_by_role"}},
    {"inputs": {"error_text": "Timeout 30000ms exceeded waiting for heading Dashboard", "original_code": 'expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()'}, "expected": {"failure_type": "timeout", "must_contain": "expect"}},
]

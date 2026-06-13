from pathlib import Path
from langchain_core.prompts import ChatPromptTemplate
from core.config import settings
from core.llm import get_llm

def script_generator_node(state):
    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Generate Python Playwright pytest code. Prefer semantic locators. Return only valid Python."),
        ("human", "Base URL: {base_url}\nFlow: {flow}"),
    ])
    response = (prompt | llm).invoke({"base_url": state["base_url"], "flow": state["flow"]})

    script = f"""
from playwright.sync_api import sync_playwright, expect


def test_login_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("{state['base_url']}")

        # Brittle selector intentionally used for self-healing demo
        page.locator("#login-button").click()

        page.get_by_label("Email").fill("demo@example.com")
        page.get_by_label("Password").fill("password123")
        page.get_by_role("button", name="Submit").click()
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
        browser.close()
"""
    tests_dir = Path(settings.GENERATED_TESTS_DIR)
    tests_dir.mkdir(parents=True, exist_ok=True)
    script_path = tests_dir / "login_flow_test.py"
    script_path.write_text(script, encoding="utf-8")
    state["generated_script"] = script
    state["script_path"] = str(script_path)
    state["llm_generated_script_notes"] = response.content
    return state

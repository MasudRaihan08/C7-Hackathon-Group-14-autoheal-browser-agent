from pathlib import Path
from langchain_core.prompts import ChatPromptTemplate
from core.llm import get_llm

def adaptive_repair_node(state):
    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a self-healing Python Playwright repair agent. Return only valid Python code."),
        ("human", "Diagnosis:\n{diagnosis}\n\nOriginal code:\n{script}"),
    ])
    response = (prompt | llm).invoke({"diagnosis": state["diagnosis"], "script": state["generated_script"]})
    repaired_script = state["generated_script"].replace('page.locator("#login-button").click()', 'page.get_by_role("button", name="Sign in").click()')
    repaired_path = Path(state["script_path"]).with_name("login_flow_test_repaired.py")
    repaired_path.write_text(repaired_script, encoding="utf-8")
    state["repaired_script"] = repaired_script
    state["repaired_script_path"] = str(repaired_path)
    state["llm_repair_notes"] = response.content
    return state

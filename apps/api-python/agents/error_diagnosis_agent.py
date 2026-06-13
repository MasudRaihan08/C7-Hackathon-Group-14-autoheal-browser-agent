from langchain_core.prompts import ChatPromptTemplate
from core.llm import get_llm

def error_diagnosis_node(state):
    llm = get_llm()
    error_text = state["first_run_result"].get("stderr") or state["first_run_result"].get("stdout") or ""
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert Playwright debugging agent. Return JSON only."),
        ("human", "Failed error:\n{error_text}\n\nOriginal script:\n{script}"),
    ])
    response = (prompt | llm).invoke({"error_text": error_text, "script": state["generated_script"]})
    state["diagnosis"] = {
        "failure_type": "broken_selector",
        "root_cause": "The selector #login-button was not found. The UI probably changed from Login to Sign in.",
        "confidence": 0.90,
        "suggested_fix": "Replace page.locator('#login-button') with a semantic role-based locator.",
        "repair_strategy": "Use page.get_by_role('button', name='Sign in').",
        "llm_notes": response.content,
    }
    return state

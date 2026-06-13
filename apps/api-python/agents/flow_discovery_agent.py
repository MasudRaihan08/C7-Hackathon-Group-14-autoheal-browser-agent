from langchain_core.prompts import ChatPromptTemplate
from core.llm import get_llm

def flow_discovery_node(state):
    llm = get_llm()
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a browser automation flow discovery agent. Return JSON only."),
        ("human", "Website URL: {base_url}\nFind the most important browser automation flow."),
    ])
    response = (prompt | llm).invoke({"base_url": state["base_url"]})
    state["flow"] = {
        "name": "Login Flow",
        "description": "User logs in and reaches dashboard.",
        "priority": "high",
        "steps": [f"Open {state['base_url']}", "Click Login or Sign in", "Enter email", "Enter password", "Submit form", "Verify dashboard is visible"],
        "llm_notes": response.content,
    }
    return state

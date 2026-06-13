from langgraph.graph import StateGraph, START, END
from graph.state import AutoHealState
from agents.flow_discovery_agent import flow_discovery_node
from agents.script_generator_agent import script_generator_node
from agents.execution_agent import execution_node
from agents.error_diagnosis_agent import error_diagnosis_node
from agents.adaptive_repair_agent import adaptive_repair_node

def should_repair(state: AutoHealState) -> str:
    return "end" if state.get("first_run_result", {}).get("status") == "passed" else "repair"

def finalize_after_rerun(state: AutoHealState) -> AutoHealState:
    state["final_status"] = "self_healed" if state.get("second_run_result", {}).get("status") == "passed" else "repair_failed"
    return state

def build_autoheal_graph():
    graph = StateGraph(AutoHealState)
    graph.add_node("flow_discovery", flow_discovery_node)
    graph.add_node("script_generator", script_generator_node)
    graph.add_node("execution", execution_node)
    graph.add_node("error_diagnosis", error_diagnosis_node)
    graph.add_node("adaptive_repair", adaptive_repair_node)
    graph.add_node("rerun", execution_node)
    graph.add_node("finalize", finalize_after_rerun)
    graph.add_edge(START, "flow_discovery")
    graph.add_edge("flow_discovery", "script_generator")
    graph.add_edge("script_generator", "execution")
    graph.add_conditional_edges("execution", should_repair, {"end": END, "repair": "error_diagnosis"})
    graph.add_edge("error_diagnosis", "adaptive_repair")
    graph.add_edge("adaptive_repair", "rerun")
    graph.add_edge("rerun", "finalize")
    graph.add_edge("finalize", END)
    return graph.compile()

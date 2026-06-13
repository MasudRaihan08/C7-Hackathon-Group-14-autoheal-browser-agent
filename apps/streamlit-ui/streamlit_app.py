import streamlit as st
import requests

st.set_page_config(page_title="AutoHeal Agent Debug Console", layout="wide")
st.title("AutoHeal Browser Agent")
st.caption("Debug console: Python + LangChain + LangGraph + OpenRouter + LangSmith")
api_base = st.sidebar.text_input("Python API Base URL", value="http://localhost:8000")
project_name = st.text_input("Project Name", value="C7 Hackathon Group 14")
base_url = st.text_input("Demo Site URL", value="http://localhost:5000")

if st.button("Run AutoHeal Agent", type="primary"):
    with st.spinner("Running LangGraph self-healing workflow..."):
        response = requests.post(f"{api_base}/autoheal/run", json={"project_name": project_name, "base_url": base_url}, timeout=180)
    result = response.json()
    st.success(f"Final status: {result.get('final_status', 'unknown')}")
    tab1, tab2, tab3, tab4, tab5 = st.tabs(["Flow", "First Run", "Diagnosis", "Repair", "Second Run"])
    with tab1: st.json(result.get("flow", {}))
    with tab2: st.json(result.get("first_run_result", {}))
    with tab3: st.json(result.get("diagnosis", {}))
    with tab4:
        st.subheader("Generated Script"); st.code(result.get("generated_script", ""), language="python")
        st.subheader("Repaired Script"); st.code(result.get("repaired_script", ""), language="python")
    with tab5: st.json(result.get("second_run_result", {}))
st.divider()
st.info("Open LangSmith to inspect traces for each LangChain/LangGraph step.")

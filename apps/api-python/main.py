from fastapi import FastAPI
from pydantic import BaseModel
from core.tracing import setup_langsmith
from graph.autoheal_graph import build_autoheal_graph

setup_langsmith()
app = FastAPI(title="AutoHeal Browser Agent - Python API")

class AutoHealRequest(BaseModel):
    project_name: str
    base_url: str

@app.get("/health")
def health():
    return {"ok": True, "service": "autoheal-python-api"}

@app.post("/autoheal/run")
def run_autoheal(request: AutoHealRequest):
    graph = build_autoheal_graph()
    return graph.invoke({"project_name": request.project_name, "base_url": request.base_url})

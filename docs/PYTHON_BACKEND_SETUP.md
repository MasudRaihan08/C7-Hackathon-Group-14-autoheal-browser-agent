# Python LangGraph Backend Setup

Testing model:

```env
OPENROUTER_MODEL=openai/gpt-4o-mini
```

Hackathon model:

```env
OPENROUTER_MODEL=anthropic/claude-sonnet-4.5
```

Run Python API:

```bash
cd apps/api-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
playwright install
copy .env.example .env
uvicorn main:app --reload --port 8000
```

Mac/Linux activation:

```bash
source .venv/bin/activate
```

Run Streamlit console:

```bash
cd apps/streamlit-ui
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
streamlit run streamlit_app.py
```

Run local evals:

```bash
cd apps/api-python
python -m evals.run_evals
```

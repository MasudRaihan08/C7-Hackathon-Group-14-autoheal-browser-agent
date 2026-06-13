from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENROUTER_API_KEY: str
    OPENROUTER_MODEL: str = "openai/gpt-4o-mini"
    OPENROUTER_TEMPERATURE: float = 0.0
    OPENROUTER_MAX_TOKENS: int = 2048
    LANGSMITH_TRACING: bool = True
    LANGSMITH_ENDPOINT: str = "https://api.smith.langchain.com"
    LANGSMITH_API_KEY: str | None = None
    LANGSMITH_PROJECT: str = "C7-Hackathon-Group-14-autoheal-browser-agent Public"
    PYTHON_API_PORT: int = 8000
    DEMO_SITE_URL: str = "http://localhost:5000"
    GENERATED_TESTS_DIR: str = "../../generated-tests"
    ARTIFACTS_DIR: str = "../../artifacts"
    class Config:
        env_file = ".env"
        extra = "ignore"
settings = Settings()

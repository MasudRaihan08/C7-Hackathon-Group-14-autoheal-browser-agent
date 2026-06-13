from langchain_openrouter import ChatOpenRouter
from core.config import settings

def get_llm(model: str | None = None, temperature: float | None = None, max_tokens: int | None = None):
    return ChatOpenRouter(
        model=model or settings.OPENROUTER_MODEL,
        temperature=temperature if temperature is not None else settings.OPENROUTER_TEMPERATURE,
        max_tokens=max_tokens or settings.OPENROUTER_MAX_TOKENS,
        max_retries=2,
    )

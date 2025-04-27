from typing import Annotated
from langchain_core.tools import tool
from tavily import TavilyClient
import os

@tool
def tavily_search(query: str) -> str:
    """Search for real-time market information."""
    try:
        client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
        result = client.search(query)
        return str(result)
    except Exception as e:
        return f"Error performing search: {str(e)}"
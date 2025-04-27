from typing import Annotated
from langchain_core.tools import tool
from ..rag.chain import create_rag_chain

@tool
def retrieve_information(query: Annotated[str, "query to analyze financial documents"]) -> str:
    """Analyze SEC filings using RAG."""
    try:
        rag_chain = create_rag_chain()
        return rag_chain.invoke(query)
    except Exception as e:
        return f"Error analyzing documents: {str(e)}"
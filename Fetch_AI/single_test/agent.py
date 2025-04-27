import os
import time
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langgraph.prebuilt import chat_agent_executor
from langchain_core.messages import HumanMessage

from uagents_adapter.langchain import UAgentRegisterTool, cleanup_uagent

# Load environment variables
load_dotenv()

# Set your API keys - for production, use environment variables instead of hardcoding
os.environ["OPENAI_API_KEY"] = "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"
os.environ["TAVILY_API_KEY"] = "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"

# Get API token for Agentverse
API_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3NDgzMjg0MzUsImlhdCI6MTc0NTczNjQzNSwiaXNzIjoiZmV0Y2guYWkiLCJqdGkiOiJlYjAwZTk4NWU5NzkxMTc0YmNkM2I5M2YiLCJzY29wZSI6ImF2Iiwic3ViIjoiODYwNWMzYTBjYTk4OWZiNDFmZGZkMmY1MDk4YTA2M2Y4NWRkMjAzYTI2YmU1NWU5In0.P5IoSZE53Hj9mdDx4jQNT3QHxOmwTGSMgrgvqFm_x7sW7XFZfzF5jWrh_3DZQ8_sfDJaxfaFJQbOGPb-2DHOh4vJDmMuVnccrVO1Ns4_cUHTBsv9GS0QToRusjF3_9hdVR-u0CB1iOsz54WgLtPpqeEMz9a94iTVTHX_2bI27art0f-BtgdgZ2jUmoCNrpWxsQfx1T6vh2xcgVOLGfIiP0kE4zHM16DV9qEu6aYGV9NRrwOeEYZpfi3fYZ1jHY8x4aycQO753fmblhKeHbw2D6BuATUDF7_H3rvCza88JwyX9ts966AT1fsvZEVi7dBzK6lzTV7jcpRhQZMdbU0vSQ"

if not API_TOKEN:
    raise ValueError("Please set AGENTVERSE_API_KEY environment variable")

# Set up tools and LLM
tools = [TavilySearchResults(max_results=3)]
model = ChatOpenAI()

# LangGraph-based executor
app = chat_agent_executor.create_tool_calling_executor(model, tools)

# Wrap LangGraph agent into a function for UAgent
def langgraph_agent_func(query):
    # Handle input if it's a dict with 'input' key
    if isinstance(query, dict) and 'input' in query:
        query = query['input']
    
    messages = {"messages": [HumanMessage(content=query)]}
    final = None
    for output in app.stream(messages):
        final = list(output.values())[0]  # Get latest
    return final["messages"][-1].content if final else "No response"

# Register the LangGraph agent via uAgent
tool = UAgentRegisterTool()
agent_info = tool.invoke(
    {
        "agent_obj": langgraph_agent_func,
        "name": "langgraph_tavily_agent",
        "port": 8080,
        "description": "A LangGraph-based Tavily-powered search agent",
        "api_token": API_TOKEN,
        "mailbox": True
    }
)

print(f"✅ Registered LangGraph agent: {agent_info}")

# Keep the agent alive
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("🛑 Shutting down LangGraph agent...")
    cleanup_uagent("langgraph_tavily_agent")
    print("✅ Agent stopped.")
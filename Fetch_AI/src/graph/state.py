from typing import TypedDict, List, Annotated
from langchain_core.messages import BaseMessage
import operator

class ResearchTeamState(TypedDict):
    """State structure for research team coordination."""
    messages: Annotated[List[BaseMessage], operator.add]  # Conversation history
    team_members: List[str]                              # Available agents
    next: str                                           # Next agent to act
    information_needed: List[str]                       # Required information
    reasoning: str                                      # Decision reasoning

def create_initial_state(query: str) -> ResearchTeamState:
    """Create initial state from user query."""
    return {
        "messages": [HumanMessage(content=query)],
        "team_members": ["Search", "SECAnalyst"],
        "next": "",
        "information_needed": [],
        "reasoning": ""
    }

def update_state(state: ResearchTeamState, agent_response: dict) -> ResearchTeamState:
    """Update state with agent response."""
    new_state = state.copy()
    new_state["messages"].extend(agent_response["messages"])
    return new_state
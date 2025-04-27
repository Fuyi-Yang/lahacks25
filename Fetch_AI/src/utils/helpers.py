def create_agent(llm: ChatOpenAI, tools: list, system_prompt: str) -> AgentExecutor:
    """Create a specialized agent with tools and prompt."""
    try:
        system_prompt += (
            "\nWork autonomously using your tools."
            " Do not ask for clarification."
            " Your team members will help with their specialties."
        )
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="messages"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        agent = create_openai_functions_agent(llm, tools, prompt)
        return AgentExecutor(agent=agent, tools=tools)
        
    except Exception as e:
        logger.error(f"Error creating agent: {e}")
        raise

def agent_node(state, agent, name):
    """Create agent node for the graph."""
    try:
        if "information_needed" in state:
            message_content = f"""Information needed:
            {', '.join(state['information_needed'])}
            Query: {state['messages'][-1].content}"""
            state['messages'][-1] = HumanMessage(content=message_content)

        result = agent.invoke(state)
        return {
            "messages": [
                HumanMessage(content=result["output"], name=name)
            ]
        }
    except Exception as e:
        logger.error(f"Error in agent node {name}: {e}")
        raise
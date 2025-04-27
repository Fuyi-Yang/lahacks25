import os
import requests
from typing import Optional, List
from pydantic import Field
from langchain.llms.base import LLM
from langchain_community.utilities.tavily_search import TavilySearchAPIWrapper
from langchain.agents import initialize_agent, AgentType
from langchain_community.tools.tavily_search.tool import TavilySearchResults
from dotenv import load_dotenv

from flask import Flask, request, jsonify

class ASI1MINI(LLM):
    api_key: str = Field(...)
    api_url: str = Field(...)
    model: str = Field(default="asi1-mini")
    temperature: float = Field(default=0.7)
    fun_mode: bool = Field(default=False)
    web_search: bool = Field(default=False)
    enable_stream: bool = Field(default=False)
    max_tokens: int = Field(default=1024)

    @property
    def _llm_type(self) -> str:
        return "custom_llm"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": self.temperature,
            "fun_mode": self.fun_mode,
            "web_search": self.web_search,
            "stream": self.enable_stream,
            "max_tokens": self.max_tokens,
        }
        if stop:
            payload["stop"] = stop

        response = requests.post(self.api_url, headers=headers, json=payload)
        response.raise_for_status()
        response_data = response.json()
        return (
            response_data.get("choices", [{}])[0].get("message", {}).get("content", "")
        )

def custom_search_handler(data):
    """
    Uses LangChain to process a search query with the custom LLM.
    Expects a JSON payload with the key "search_query" and returns the result.
    """
    search_query = data.get("search_query")
    if not search_query:
        return {"error": "Missing search query"}

    os.environ["ASI_LLM_KEY"] = "sk_4e4699f0eafd48eea6dde7a6db06db27a27e99ef19b84b6ab4a5fb4ede984824"
    custom_api_key = os.getenv("ASI_LLM_KEY")
    custom_api_url = "https://api.asi1.ai/v1/chat/completions"
    os.environ["TAVILY_API_KEY"] = "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"
    tavily_api_key = os.getenv("TAVILY_API_KEY")
    
    print("1: ", custom_api_key)
    print("2: ", custom_api_url)
    print("3: ", tavily_api_key)

    if not custom_api_key or not custom_api_url or not tavily_api_key:
        return {"error": "Missing API keys"}

    try:
        # Initialize your custom LLM
        llm = ASI1MINI(api_key=custom_api_key, api_url=custom_api_url, temperature=0.7)
        # Initialize the Tavily search tool
        search = TavilySearchAPIWrapper()
        tavily_tool = TavilySearchResults(
            api_wrapper=search, tavily_api_key=tavily_api_key
        )

        # Initialize the agent with your custom LLM and Tavily search tool
        agent_chain = initialize_agent(
            [tavily_tool],
            llm,
            agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
        )
        # Run the agent chain with the search query
        result = agent_chain.invoke({"input": search_query})
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}


app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def handler():
    print("hello")
    data = request.get_json()
    print(data)
    prompt = """You are a helpful AI therapist that works for Snapchat that has access to the view that the user is looking at using Augmented Reality Glasses.
 The user is under their anxiety and need some accompaniments and therapy session with the following image and text. Keep it short like under 30 words. Be funny and healing, try to foward the conversation and make the user feel relieved and cozy! And remember to encourage the user to speak up! about their story or experience"""
    history = data["history"]
    prompt += "Historical Conversations:\n"
    for message in history:
        prompt += messages[f"Human: {message['input']}\nAgent: {message['output']}"] + '\n\n'
    prompt += "Current Human Message:\n" + data["message"]

    result = custom_search_handler({"search_query": prompt})

    return result, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)



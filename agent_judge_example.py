"""
Agent-as-Judge Pattern Example

Demonstrates the "agent-as-judge" pattern where one agent evaluates
the responses of another agent. This example:
- Agent 1: Attempts to calculate a complex square root without tools
- Agent 2: Acts as a judge with calculator access to verify accuracy
- Shows how agents can be used to validate and improve each other's outputs

This pattern is useful for quality control and response validation.
"""

from strands import Agent, models
from botocore.config import Config
from strands_tools import calculator


model = models.BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    region_name="us-west-2",
    boto_client_config=Config(read_timeout=3600)
    )

agent = Agent(model=model, tools=[])

while True:
    user = "What is the square root of 304823098490328940823011126776754"
    response = agent(user) 
    print("+++++++++++++++++")
    agent2 = Agent(system_prompt="you are a judge for this conversation, tell me if the response is accurate and correct", model=model, tools=[calculator])
    agent2(f"""
user request = {user}
agent 1 response = {response}
""")

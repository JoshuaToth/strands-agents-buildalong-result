
# Strands Agents Live Demo Code

This repository contains the code examples that were live-coded during a presentation in Melbourne, demonstrating the capabilities of Strands Agents for building conversational AI applications.

## Examples Included

### 🏠 `index.py` - Interactive Home Decor Agent

The main demo featuring a conversational AI interior designer that:

- Uses Claude Sonnet 4 via AWS Bedrock
- Has a sassy, helpful personality with emoji usage
- Can analyze images, write files, and execute shell commands
- Includes a custom tool for generating paint color swatches
- Runs in an interactive chat loop

### 🤖 `agent_judge_example.py` - Agent-as-Judge Pattern

Demonstrates quality control using multiple agents:

- Agent 1 attempts complex calculations without tools
- Agent 2 acts as a judge with calculator access to verify accuracy
- Shows how agents can validate and improve each other's outputs

### 🎨 `prefab_example_script.py` - Automated Workflow

A complete automated home decor planning workflow that:

- Analyzes mood board images
- Plans decor for 9 different rooms
- Generates a full website with room-specific themes
- Creates paint swatches and furniture recommendations

## Getting started with strands

Documentation here: <https://github.com/strands-agents/sdk-python>

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Install Strands Agents
pip install -r requirements.txt
```

If you are using Bedrock models like the demo, [visit here to learn how to](https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-authentication.html) authenticate your CLI with credentials.

## Running the Examples

### Interactive Home Decor Agent

```bash
python index.py
```

Start chatting with your AI interior designer!

### Agent Judge Demo

```bash
python agent_judge_example.py
```

Watch two agents work together to solve and verify complex calculations.

### Automated Workflow

```bash
python prefab_example_script.py
```
Run the complete home decor planning and website generation workflow.

### Small Calculator demo

```python
from strands import Agent
from strands_tools import calculator
agent = Agent(tools=[calculator])
agent("What is the square root of 1764")
```

## For more pre-built non-custom tools visit the strands agents tools here:

https://github.com/strands-agents/tools


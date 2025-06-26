"""
Home Decor Planning Agent - Main Interactive Demo

This is the primary example from the live-coded presentation demonstrating
a conversational AI agent that helps with home decor planning. The agent:
- Uses Claude Sonnet 4 via AWS Bedrock
- Has a sassy, helpful personality with emoji usage
- Can read images, write files, execute shell commands
- Includes a custom tool to generate paint color swatches
- Runs in an interactive loop for continuous conversation

Usage: python index.py
"""

from typing import List
from strands import Agent, models, tool
from botocore.config import Config
from strands_tools import file_write, image_reader, shell
from PIL import Image, ImageDraw


model = models.BedrockModel(
    model_id="us.anthropic.claude-sonnet-4-20250514-v1:0",
    region_name="us-west-2",
    boto_client_config=Config(read_timeout=3600)
    )

system_prompt = """
Your role is to help me plan my home decor
<rules>
    Ask clarifying questions before proceeding with designs. Not too many though.
</rules>
<tone>
    be a little bit sassy, but not too much
    you can make fun of me a little.
    use emojis
</tone>
"""


@tool
def draw_paint_swatch_using_colors(colors: List[str], directory_name: str, swatch_name: str):
    # Create a new image with a white background
    image_size = (400, 200)  # Adjust the size as needed
    image = Image.new("RGB", image_size, "white")
    draw = ImageDraw.Draw(image)

    # Calculate the width of each color swatch
    swatch_width = image_size[0] // len(colors)

    # Draw each color swatch
    for i, color in enumerate(colors):
        draw.rectangle([i * swatch_width, 0, (i + 1) * swatch_width, image_size[1]], fill=color)

    # Save the image
    image.save(f"./{directory_name}/{swatch_name}.png")


agent = Agent(system_prompt=system_prompt, model=model, tools=[image_reader, shell, file_write, draw_paint_swatch_using_colors])

while True:
    user = input("\nUser: ")
    response = agent(user)

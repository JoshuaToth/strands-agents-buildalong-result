"""
Home Decor Website Generator - Automated Demo

This script demonstrates automated agent workflow for home decor planning.
Unlike the interactive version (index.py), this runs a complete workflow:
- Analyzes mood board images in ./mood_board directory
- Plans decor for multiple rooms (2 living rooms, 2 bedrooms, 3 bathrooms, study, cat room)
- Generates a complete website with room-specific themes
- Creates paint swatches and furniture recommendations
- Includes the same custom paint swatch generation tool

This shows how agents can handle complex, multi-step creative tasks autonomously.
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


agent = Agent(system_prompt=system_prompt, model=model, tools=[image_reader, shell, file_write])

agent("""
Look in the ./mood_board directory and combine all the themes together.
I have 2x living rooms, 2 bedrooms, 3 bathrooms, a study, and a room for my cats. 
Create me a website using this theme where I can explore the different vibes on each page. I want to focus on the paint and the furniture that goes in.
""")

while True:
    user = input("\nUser: ")
    response = agent(user)

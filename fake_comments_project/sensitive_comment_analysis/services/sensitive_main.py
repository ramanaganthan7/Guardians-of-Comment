from .sensitivity.main import unified_text_classifier
import asyncio

async def main(text):
    result = unified_text_classifier(text)
    # print(result)
    return result
# asyncio.run(main(text))
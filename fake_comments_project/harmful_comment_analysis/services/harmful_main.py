from .harmfull.predict import prediction
import asyncio
async def main(text):
    result = prediction(text)
    return result

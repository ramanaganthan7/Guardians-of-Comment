# main.py
from .detectlang import detect_language as detect
from .english_classifier import classify_english
from .tamil_classifier import classify_tanglish
from django.http import JsonResponse

# Detect Tanglish vs English
def is_tanglish(text):
    return detect(text)

# Filter logic
def is_allowed(label):
    low_block = ["Off_target_other", "Off_target_group", "Profanity", "Off_target_ind", "Toxic"]
    medium_block = ["Off_target_group", "Off_target_ind", "Toxic"]
    high_block = []
    if label in low_block or label in medium_block:
        return False
    else:
        return True

    # if sensitivity == "low":
    #     return label in low_block
    # elif sensitivity == "medium":
    #     return label in medium_block
    # elif sensitivity == "high":
    #     return True
    # return False

# Unified classifier
def unified_text_classifier(text):
    lang_is_tanglish = is_tanglish(text)

    if lang_is_tanglish:
        result = classify_tanglish(text)
    else:
        result = classify_english(text)

    label = result["label"]
    score = result["score"]
    allowed = is_allowed(label)
    return {
        "allowed":allowed
    }
    # return {
    #     "text": text,
    #     "language": "Tanglish" if lang_is_tanglish else "English",
    #     "label": label,
    #     "score": score,
    #     "sensitivity": sensitivity
    # }
# Test
# import asyncio

# async def main():
#     while True:
#         text = input("Enter a text: ")
#         if text.lower() == "exit":
#             break
#         result = await unified_text_classifier(text, sensitivity="low")
#         print(result)

# asyncio.run(main())
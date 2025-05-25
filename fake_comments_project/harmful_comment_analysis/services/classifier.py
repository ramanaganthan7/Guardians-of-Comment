import re
import json
import emoji

def extract_parts(input_string):
    # Patterns
    phone_pattern = re.compile(r'\+?\d{10,15}')
    url_pattern = re.compile(r'(https?://\S+|www\.\S+)')

    # Extract phone numbers
    phones = phone_pattern.findall(input_string)
    input_string = phone_pattern.sub('', input_string)

    # Extract URLs
    links = url_pattern.findall(input_string)
    input_string = url_pattern.sub('', input_string)

    # Replace emojis with descriptions (e.g., 😄 -> :smiling face with open mouth and smiling eyes:)
    input_string = emoji.demojize(input_string, language='en')
    input_string = input_string.replace(":", "")  # Remove colons
    input_string = input_string.replace("_", " ")  # Replace underscores with spaces

    # Final cleaned text
    text = input_string.strip()

    result = {
        "text": text,
        "phone": phones,
        "link": links
    }

    return result
# print(extract_parts("Check this out! 😄 Visit https://example.com or call me at +1234567890."))
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline

# Load from Hugging Face Hub
MODEL_NAME = "papluca/xlm-roberta-base-language-detection"  # You can change this to your preferred model

lang_model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
lang_tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

lang_pipe = pipeline("text-classification", model=lang_model, tokenizer=lang_tokenizer)

def detect_language(text):
    result = lang_pipe(text)[0]
    label = result['label']
    score = result['score']
    # Return True if not English (non-en)
    if label.lower() == 'en':
        return False
    else:
        return True

# # Example usage
# print(detect_language("nalla iruku"))  #True (Tamil)
# print(detect_language("Hi how are you"))   #False (English)

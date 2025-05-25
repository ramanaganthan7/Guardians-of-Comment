from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import torch
import detectlang

# 1. Load Models and Tokenizers from local paths
tanglish_model_path = "./tanglish_model"
english_model_path = "./english_model"

tanglish_model = AutoModelForSequenceClassification.from_pretrained(tanglish_model_path)
tanglish_tokenizer = AutoTokenizer.from_pretrained(tanglish_model_path)
tanglish_pipe = pipeline("text-classification", model=tanglish_model, tokenizer=tanglish_tokenizer, framework="pt")

english_model = AutoModelForSequenceClassification.from_pretrained(english_model_path)
english_tokenizer = AutoTokenizer.from_pretrained(english_model_path)
english_pipe = pipeline("text-classification", model=english_model, tokenizer=english_tokenizer, framework="pt")

# 2. Tanglish Keyword Detector
def is_tanglish(text):
    if detectlang.detect_language(text):
        return False
    else:
        return True
# 3. Sensitivity Filter Logic
def is_allowed(label, sensitivity):
    low_block = ["Off_target_other", "Off_target_group", "Profanity", "Off_target_ind", "Toxic"]
    medium_block = ["Off_target_group", "Off_target_ind", "Toxic"]
    high_block = []  # Allow all

    if sensitivity == "low":
        return label not in low_block
    elif sensitivity == "medium":
        return label not in medium_block
    elif sensitivity == "high":
        return True
    else:
        return False

# 4. Label Mapping for English Model
def normalize_english_label(label, score, threshold=0.6):
    toxic_labels = ["toxic", "obscene", "insult", "threat", "identity_hate"]
    if label.lower() in toxic_labels and score >= threshold:
        return "Toxic"
    else:
        return "Not_offensive"

# 5. Unified Classifier Function
def unified_text_classifier(text, sensitivity="medium"):
    if is_tanglish(text):
        result = tanglish_pipe(text)[0]
        label = result['label']
    else:
        result = english_pipe(text)[0]
        label = normalize_english_label(result['label'], result['score'])

    score = result['score']
    allowed = is_allowed(label, sensitivity)

    print("────────────────────────────────────────────")
    print(f"Input: {text}")
    print(f"Detected Language: {'Tanglish' if is_tanglish(text) else 'English'}")
    print(f"Label: {label} (Score: {score:.2f})")
    print(f"Sensitivity: {sensitivity.upper()}")
    print(f"{'✅ Allowed' if allowed else '🚫 Blocked'}")
    print("────────────────────────────────────────────")

    return {
        "text": text,
        "language": "Tanglish" if is_tanglish(text) else "English",
        "label": label,
        "score": score,
        "allowed": allowed,
        "sensitivity": sensitivity
    }

# Test run
unified_text_classifier("otha thevdiya paiya", sensitivity="low")
unified_text_classifier("how are you?", sensitivity="medium")
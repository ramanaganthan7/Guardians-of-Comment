from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# Load model and tokenizer from Hugging Face Hub
MODEL_NAME = "unitary/toxic-bert"  # Or the correct public Hugging Face model you want

# Initialize pipeline
english_pipe = pipeline("text-classification", model=MODEL_NAME, tokenizer=MODEL_NAME, framework="pt")

# Normalize labels (custom logic)
def normalize_english_label(label, score, threshold=0.4):
    toxic_labels = ["toxic", "obscene", "insult", "threat", "identity_hate"]
    if label.lower() in toxic_labels and score >= threshold:
        return "Toxic"
    else:
        return "Not_offensive"

# Classify English text
def classify_english(text):
    result = english_pipe(text)[0]
    label = normalize_english_label(result['label'], result['score'])
    return {
        "label": label,
        "score": result["score"]
    }

# Optional CLI usage
# if __name__ == "__main__":
#     while True:
#         text = input("Enter a text: ")
#         if text.lower() == "exit":
#             break
#         result = classify_english(text)
#         print(f"Label: {result['label']}, Score: {result['score']:.2f}")

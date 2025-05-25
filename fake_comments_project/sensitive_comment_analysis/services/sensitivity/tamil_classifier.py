# from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# # Define the model name from Hugging Face
# MODEL_NAME = "Hate-speech-CNERG/deoffxlmr-mono-tamil"

# # Load tokenizer and model directly from Hugging Face
# tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
# model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)


# # Create the pipeline
# tanglish_pipe = pipeline("text-classification", model=model, tokenizer=tokenizer, framework="pt")

# # Function to classify Tanglish/Tamil text
# def classify_tanglish(text):
#     result = tanglish_pipe(text)[0]
#     return {
#         "label": result["label"],
#         "score": result["score"]
#     }

# # while True:
# #     text = input("Enter a text: ")
# #     if text.lower() == "exit":
# #         break
# #     result = classify_tanglish(text)
# #     print(f"Label: {result['label']}, Score: {result['score']:.2f}")
from transformers import XLMRobertaTokenizer, XLMRobertaForSequenceClassification
import torch

MODEL_NAME = "Hate-speech-CNERG/deoffxlmr-mono-tamil"

tokenizer = XLMRobertaTokenizer.from_pretrained(MODEL_NAME)
model = XLMRobertaForSequenceClassification.from_pretrained(MODEL_NAME)

def classify_tanglish(text):
    # Tokenize the input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

    # Disable gradient calculations
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

    # Get the predicted class ID
    predicted_class_id = torch.argmax(probs, dim=1).item()

    # Get the class label from the model config
    predicted_label = model.config.id2label[predicted_class_id]
    predicted_score = round(probs[0][predicted_class_id].item(), 4)

    # Print results
    output = {
        "label": predicted_label,
        "score": predicted_score
    }
#     # print(output)
#     return output
# # classify_tanglish('otha')

import joblib

# Load the saved model
model_path = r"C:\Users\raman\Documents\CyberGuard\sensitivity\mvp\level_model.pkl"
model = joblib.load(model_path)

# Predict sensitivity level of input
def predict_sensitivity(text):
    prediction = model.predict([text])
    return prediction[0]

if __name__ == "__main__":
    user_input = input("Enter a sentence to check sensitivity level: ")
    result = predict_sensitivity(user_input)
    print(f"Sensitivity Level: {result.capitalize()}")

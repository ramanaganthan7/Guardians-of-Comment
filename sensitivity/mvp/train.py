import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

data = [
    # HIGH SENSITIVITY (abusive, vulgar, hateful)
    ("You're such a bastard", "high"),
    ("F*** off idiot", "high"),
    ("Stupid a**hole", "high"),
    ("Poda thevdiya paiya", "high"),
    ("Vaaya moodu punda", "high"),
    ("Bloody b****", "high"),
    ("Loosu thevudiya", "high"),
    ("Unakku oru sense um illa", "high"),
    ("Nee oru sooda paiyan", "high"),

    # MEDIUM SENSITIVITY (passive-aggressive, sarcastic, mean)
    ("That was a dumb move", "medium"),
    ("You're acting childish", "medium"),
    ("Enakku pidikkala un style", "medium"),
    ("Stop being so dramatic", "medium"),
    ("Idhu enna mokka plan?", "medium"),
    ("You're not making sense", "medium"),
    ("I don't like your attitude", "medium"),

    # LOW SENSITIVITY (friendly, casual, neutral)
    ("Hey bro, what's up?", "low"),
    ("Nalla iruka da?", "low"),
    ("See you in class", "low"),
    ("Iniku sema jolly da", "low"),
    ("Good morning, macha", "low"),
    ("Dinner ku varen", "low"),
    ("Let’s go watch a movie", "low"),
]

texts, labels = zip(*data)

# Create the training pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# Train the model
model.fit(texts, labels)

model_path = os.path.join(os.path.dirname(__file__), 'level_model.pkl')
joblib.dump(model, model_path)
print(f"Model trained and saved at: {model_path}")

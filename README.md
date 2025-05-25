# 🛡️ Guardians-of-Comment

**Guardians-of-Comment** is a system designed to detect and prevent spam, fraudulent, and harmful content in social media comments. It features a real-time comment validation system using a BERT-based language model and integrates with VirusTotal for malicious URL detection.

## 🚀 Key Features

- 🔍 **Comment Validation**: Real-time analysis and flagging of inappropriate or fake comments using a trained BERT model.
- 🧠 **AI-Powered Classification**: Utilizes transformer-based models (BERT) for robust classification of comments into spam, abusive, or safe.
- 🌐 **Multilingual Support**: Supports both **English** and **Tanglish (Tamil + English)** comments.
- 🧩 **Future Regional Language Support**: Will be extended to support more Indian regional languages.
- 🛑 **VirusTotal Integration**: Detects and flags malicious URLs embedded in user comments.
- 📂 **Modular Architecture**: Clean separation of backend API, frontend UI, and ML training scripts.

## 🧰 Project Structure

```
Guardians-of-Comment/
│
├── Backend_Apiaas/           # Flask backend with BERT model and VirusTotal API integration
├── Frontend_Apiaas/          # React frontend for user input and comment feedback
├── fake_comments_project/    # BERT model training, preprocessing, and evaluation
```

## 🛠️ Technologies Used

- **Frontend**: React.js, vite , tailwind , shadecn
- **Backend**: Python, Django, Express 
- **Machine Learning / NLP**:
  - BERT (Bidirectional Encoder Representations from Transformers)
  - HuggingFace Transformers
  - Scikit-learn, Pandas
- **Security**: VirusTotal API

## 💻 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ramanaganthan7/Guardians-of-Comment.git
cd Guardians-of-Comment
```

### 2. Backend Setup (`Backend_Apiaas`)

```bash
cd Backend_Apiaas
pip install -r requirements.txt
python app.py
```

> Make sure to add your VirusTotal API key in a `.env` file or environment variable.

### 3. Frontend Setup (`Frontend_Apiaas`)

```bash
cd ../Frontend_Apiaas
npm install
npm start
```

> Frontend runs on `http://localhost:3000` and communicates with Flask API.

## 📦 Dataset & Model Training

The `fake_comments_project` folder includes:

- Preprocessing scripts for handling multilingual (Tanglish + English) comment data
- BERT-based training notebooks/scripts for spam and toxicity classification
- Model export for integration with the backend

> The model is trained to handle **code-mixed Tanglish and English** and will later be extended to **more Indian languages**.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributions

Contributions, issues, and feature requests are welcome! Feel free to fork the repo and submit a PR.

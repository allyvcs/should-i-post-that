from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable frontend-backend communication

# Simple keyword-based toxicity check
def detect_toxicity(text):
    toxic_keywords = ["hate", "kill", "stupid", "ugly", "trash", "worthless", "dumb", "shut up"]
    text_lower = text.lower()
    for word in toxic_keywords:
        if word in text_lower:
            return "high"
    return "low"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')

    # Use TextBlob to analyze sentiment
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity

    # Classify sentiment
    if sentiment_score > 0.2:
        sentiment = "positive"
    elif sentiment_score < -0.2:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # Run toxicity check
    toxicity = detect_toxicity(text)

    # Generate recommendation
    if toxicity == "high":
        recommendation = "This post may be seen as toxic or offensive."
    elif sentiment == "negative":
        recommendation = "This post may be interpreted negatively."
    else:
        recommendation = "This post is likely safe."

    return jsonify({
        'sentiment': sentiment,
        'toxicity': toxicity,
        'recommendation': recommendation
    })

if __name__ == '__main__':
    app.run(debug=True)


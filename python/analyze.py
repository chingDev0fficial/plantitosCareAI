from flask import Flask, request, jsonify
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import google.generativeai as genai
import torch
from dotenv import load_dotenv
import os
import traceback
import base64
from io import BytesIO

# 🔹 Flask app
app = Flask(__name__)

# Load .env
load_dotenv()

# Access the key
GEMINI_AI_API_KEY = os.getenv("GEMINI_AI_API_KEY")

# 🔹 Configure Gemini API
genai.configure(api_key=GEMINI_AI_API_KEY)

# 🔹 Load model and processor once (not every request)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models/Plant-Disease-Detection-Project")
preprocessor = AutoImageProcessor.from_pretrained(MODEL_PATH)
model = AutoModelForImageClassification.from_pretrained(MODEL_PATH)

# 🔹 Flask route for image upload
@app.route('/api/identify-disease', methods=['POST'])
def identify_plant_disease():
    try:
        if 'image' not in request.files:
            return jsonify({'success': False, 'error': 'No image uploaded'}), 400

        image_file = request.files['image']
        image = Image.open(image_file.stream)  # use stream, no need to save

        # Convert image to base64 string for JSON response
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Preprocess and run through HuggingFace model
        inputs = preprocessor(images=image, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_class_idx = logits.argmax(-1).item()
            detected = model.config.id2label[predicted_class_idx]

        # Call Gemini for cause and recommendation
        gen_model = genai.GenerativeModel("gemini-2.5-flash")

        cause_response = gen_model.generate_content(
            f"Explain the cause of {detected} in full detail."
        )
        cause = cause_response.text if cause_response else "No cause found"

        reco_response = gen_model.generate_content(
            f"Provide full recommendations for managing {detected}."
        )
        reco = reco_response.text if reco_response else "No recommendation found"

        # Return JSON response with base64 image string
        return jsonify({
            'success': True,
            'message': 'Successfully Detected',
            'image': img_str,
            'detected': detected,
            'cause': cause,
            'recommendation': reco
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'success': False, 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

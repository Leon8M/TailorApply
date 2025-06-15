from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

@app.route('/api/improve-resume', methods=['POST'])
def improve_resume():
    try:
        data = request.json
        if not data or 'jobDescription' not in data or 'userQualifications' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        prompt = f"""
        Create a professional resume based on:
        
        Job Description:
        {data['jobDescription']}
        
        User Qualifications:
        {data['userQualifications']}
        
        The resume should:
        - Highlight the most relevant skills and experiences
        - Use professional language
        - Be well-structured with clear sections
        - Format as markdown with headings, bullet points, and proper spacing
        - Tailor the content to match the job requirements
        """
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=1500
        )
        
        return jsonify({
            "improvedText": response.choices[0].message.content
        })

    except Exception as e:
        logger.error(f"Error in improve_resume: {str(e)}")
        return jsonify({"error": "An error occurred while generating the resume"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
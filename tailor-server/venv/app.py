from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
openai.api_key = os.getenv("OPENAI_KEY")

@app.route('/api/improve-resume', methods=['POST'])
def improve_resume():
    data = request.json
    prompt = f"""
    Create a professional resume based on this job description:
    {data['jobDescription']}
    
    Include:
    - Relevant skills
    - Professional experience
    - Education
    - Format as markdown
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return jsonify({"improvedText": response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True)
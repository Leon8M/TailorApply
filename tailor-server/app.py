from flask import Flask, jsonify
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app) # Allow cross-origin requests

@app.route('/')
def index():
    """A simple health check or info endpoint."""
    return jsonify({
        "message": "Python backend is running.",
        "status": "healthy",
        "note": "Resume generation is now handled by the Next.js backend at /api/generate"
    })

# You can add other Python-specific routes here in the future.
# For example:
# @app.route('/api/some-other-task', methods=['POST'])
# def some_other_task():
#     # ... your logic here
#     return jsonify({"result": "task completed"})

if __name__ == '__main__':
    # Using debug=False is recommended for a placeholder server
    app.run(host='0.0.0.0', port=5000, debug=False)
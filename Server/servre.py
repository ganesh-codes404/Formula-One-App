from flask import Flask, request, jsonify
import torch

# Load your PyTorch model
model = torch.jit.load("f1_model_scripted.pt")
model.eval()

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_tensor = torch.tensor([data["features"]], dtype=torch.float32)
        output = model(input_tensor)
        return jsonify({"prediction": output.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

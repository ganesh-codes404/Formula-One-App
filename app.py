from flask import Flask, request, jsonify
import torch
import torch.nn as nn

# Load the model
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.linear = nn.Linear(3, 1)

    def forward(self, x):
        return self.linear(x)

model = SimpleModel()
model.load_state_dict(torch.load('simple_model.pt'))
model.eval()

# Create Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['input']
    input_tensor = torch.tensor(data)
    output = model(input_tensor).detach().numpy()
    return jsonify({'prediction': output.tolist()})

if __name__ == '__main__':
    app.run(debug=True)

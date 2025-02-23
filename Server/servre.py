from fastapi import FastAPI
import torch
import uvicorn
import numpy as np


model = torch.jit.load("f1_model.pt")
model.eval()

app = FastAPI()

@app.get("/")
def home():
    return {"message": "F1 Prediction Server is Running!"}

@app.post("/predict")
def predict(data: dict):
    try:

        input_data = torch.tensor([data["features"]], dtype=torch.float32)


        with torch.no_grad():
            output = model(input_data)


        predictions = output.tolist()[0]

        return {
            "winner": predictions[0],
            "safetyCarChance": predictions[1],
            "weather": predictions[2],
            "top10": predictions[3],
            "finalTireStint": predictions[4],
        }
    
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

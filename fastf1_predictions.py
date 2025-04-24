import fastf1
import json


fastf1.Cache.enable_cache("cache")


session = fastf1.get_session(2024, "Saudi Arabia", "R") 
session.load()

predictions = []

for driver in session.drivers:
    laps = session.laps.pick_driver(driver)
    if not laps.empty:
        last_lap = laps.iloc[-1]  
        predictions.append({
            "driver": session.get_driver(driver)["Abbreviation"],
            "time": str(last_lap["LapTime"])
        })

with open("predictions.json", "w") as file:
    json.dump(predictions, file)

print("Predictions saved to predictions.json")

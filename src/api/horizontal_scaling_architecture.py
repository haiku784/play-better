from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

# Health check endpoint to verify if the service is up and running.
@app.get("/health")
async def health_check():
    return JSONResponse(content={"status": "healthy"})

# Scaling configuration to manage multiple instances.
scaling_config = {
    "max_instances": 10,
    "min_instances": 1
}

# Endpoint to retrieve the scaling configuration.
@app.get("/scaling-config")
async def get_scaling_config():
    return scaling_config

# Endpoint to scale up the instances if needed.
@app.post("/scale-up")
async def scale_up(increase_by: int):
    new_count = min(scaling_config["max_instances"], scaling_config["min_instances"] + increase_by)
    scaling_config["min_instances"] = new_count
    return JSONResponse(content={"new_instance_count": new_count})

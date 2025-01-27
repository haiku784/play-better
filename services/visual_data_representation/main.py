from fastapi import FastAPI
from services.visual_data_representation.data_retrieval_module import router as data_router
from services.visual_data_representation.visualization_generation_module import router as viz_router
from services.visual_data_representation.trend_data_retrieval_module import router as trend_router

app = FastAPI()

app.include_router(data_router)
app.include_router(viz_router)
app.include_router(trend_router)
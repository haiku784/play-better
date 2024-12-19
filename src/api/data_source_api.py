from fastapi import APIRouter
from .data_source import DataSource

router = APIRouter()

@router.post("/data_sources/", response_model=DataSource)
async def create_data_source(data_source: DataSource):
    # Logic to create a data source in the system
    return data_source
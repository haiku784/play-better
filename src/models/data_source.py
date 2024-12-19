from pydantic import BaseModel
from typing import Any

class DataSource(BaseModel):
    source_type: str  # Type of the data source (e.g. database, API)
    connection_string: str  # Connection info for the data source
    fetch_data: Callable[[], Any]  # Function to fetch data from the source

    class Config:
        arbitrary_types_allowed = True  # Allow non-Pydantic types
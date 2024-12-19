from pydantic import BaseModel
from typing import Callable, Any

class Algorithm(BaseModel):
    name: str  # Name of the algorithm
    function: Callable[..., Any]  # The recommendation function implementation

    class Config:
        arbitrary_types_allowed = True  # Allow non-Pydantic types
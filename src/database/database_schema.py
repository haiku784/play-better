from pydantic import BaseModel
from typing import List, Optional

class ComparativeMetric(BaseModel):
    user_id: str
    configuration_id: str
    metric_type: str  # e.g., sensitivity, control mappings
    value: float

class ComparativeMetrics(BaseModel):
    metrics: List[ComparativeMetric]
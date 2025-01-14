from pydantic import BaseModel

class ComparativeMetrics(BaseModel):
    user_id: str
    configuration_id: str
    metric_type: str
    value: float

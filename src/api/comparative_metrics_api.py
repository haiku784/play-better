from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

router = APIRouter()
client = MongoClient('mongodb://localhost:27017')
db = client['performance_metrics']
comparative_metrics_collection = db['comparative_metrics']

@router.get('/comparative-metrics/{user_id}')
async def get_comparative_metrics(user_id: str):
    try:
        metrics = comparative_metrics_collection.find({'user_id': user_id})
        return [{'id': str(metric['_id']), 'configuration_id': metric['configuration_id'], 'metric_type': metric['metric_type'], 'value': metric['value']} for metric in metrics]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

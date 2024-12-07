from fastapi import FastAPI
from api.analysis_router import router as analysis_router

app = FastAPI()

# Include the analysis router
app.include_router(analysis_router, prefix='/api/v1')

@app.get('/health/')
def health_check():
    return {'status': 'healthy'}
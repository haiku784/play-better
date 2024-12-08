from fastapi import FastAPI, HTTPException
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    logging.error(f'HTTP Error: {exc.detail}')
    return JSONResponse(status_code=exc.status_code, content={'message': exc.detail})

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logging.error(f'Unhandled Error: {str(exc)}')
    return JSONResponse(status_code=500, content={'message': 'Internal Server Error'})
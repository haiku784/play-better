from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post('/upload')
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()  # Read file content asynchronously
        with open(f'uploads/{file.filename}', 'wb') as f:
            f.write(contents)
        return JSONResponse(content={'filename': file.filename}, status_code=201)
    except Exception as e:
        return JSONResponse(content={'message': str(e)}, status_code=500)
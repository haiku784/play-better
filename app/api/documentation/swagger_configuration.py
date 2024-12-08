from fastapi import FastAPI"
from fastapi.openapi.docs import get_swagger_ui_html\
\
app = FastAPI()\
\
@app.get('/swagger-ui', include_in_schema=False)\
def swagger_ui():\
    return get_swagger_ui_html(openapi_url=app.openapi_url, title='Swagger UI')\
\
if __name__ == '__main__':\
    import uvicorn\
    uvicorn.run(app, host='127.0.0.1', port=8000)\
# Visit http://127.0.0.1:8000/swagger-ui to see the documentation in action.
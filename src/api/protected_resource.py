from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

@app.get('/protected-resource/')
async def access_protected_resource(token: str = Depends(oauth2_scheme)):
    # Token verification logic here
    user = decode_jwt_token(token)  # Decode and verify the token
    return {'message': 'This is a protected resource!', 'user': user['sub']}
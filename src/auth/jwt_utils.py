import jwt
import datetime
from fastapi import HTTPException, Security
from fastapi.security import OAuth2PasswordBearer

# Secret key for JWT
SECRET_KEY = '1543dCKA*123bsaD!'  # Use a secure key in production
ALGORITHM = 'HS256'
EXPIRATION_TIME_DELTA = 30  # Minutes

def create_jwt_token(username: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=EXPIRATION_TIME_DELTA)
    token = jwt.encode({'sub': username, 'exp': expiration}, SECRET_KEY, algorithm=ALGORITHM)
    return token

def decode_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token has expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')

# Example Usage
if __name__ == '__main__':
    token = create_jwt_token('johndoe')
    print('Generated Token:', token)
    print('Decoded Token:', decode_jwt_token(token))
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Fetch the current user based on the provided token."""
    # Logic to decode the token and retrieve the user from the database
    user = decode_token(token)  # This should be implemented
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return user
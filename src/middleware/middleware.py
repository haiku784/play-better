from fastapi import Request, Response
from fastapi.middleware.cors import CORSMiddleware

class FeedbackValidationMiddleware:
    async def __call__(self, request: Request, call_next):
        # Validate if user_id and gear_id are provided
        user_id = request.json().get('user_id')
        gear_id = request.json().get('gear_id')
        if not user_id or not gear_id:
            return Response(content="User ID and Gear ID are required!", status_code=400)
        response = await call_next(request)
        return response

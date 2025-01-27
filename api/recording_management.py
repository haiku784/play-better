from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/share")
async def share_content(request: dict):
    # Validate input
    user_id = request.get('user_id')
    gear_id = request.get('gear_id')
    platform = request.get('platform')
    message = request.get('message', '')

    if not all([user_id, gear_id, platform]):
        raise HTTPException(status_code=400, detail="Missing required fields")

    # Create share request
    request_data = create_share_request(user_id, gear_id, platform, message)
    # Execute share and return result
    result = execute_share(request_data)
    return result

def create_share_request(user_id, gear_id, platform, message):
    # Prepare the share request data
    request_data = {
        'user_id': user_id,
        'gear_id': gear_id,
        'platform': platform,
        'message': message,
    }
    return request_data

def execute_share(request_data):
    # Simulate sending the request to a social media API
    # Here we would have the logic to call the actual social media platform API
    # For now, we will return a dummy response
    status = "success"  # or "error" based on the API's response
    share_link = "http://example.com/shared-content"
    return {
        'status': status,
        'share_link': share_link,
        'error_message': None
    }
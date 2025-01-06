from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class SecureFileUploadEndpoint(View):
    def post(self, request):
        if not request.is_secure():
            return JsonResponse({'error': 'Upload must be over HTTPS'}, status=400)  
        # Handle file upload logic here
        uploaded_file = request.FILES.get('file')
        # Save the file or process it as needed
        return JsonResponse({'message': 'File uploaded successfully!'}, status=200)

# Register this view in your Django urls.py for file upload handling.
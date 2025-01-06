from django.utils.deprecation import MiddlewareMixin
from django.conf import settings

class RedirectHTTPToHTTPSMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.is_secure():
            return None
        else:
            # Redirect to the same URL but with HTTPS
            url = request.build_absolute_uri().replace('http://', 'https://')
            return HttpResponsePermanentRedirect(url)

# In your Django settings, add the middleware to MIDDLEWARE list:
# MIDDLEWARE = [
#     ...,
#     'path.to.RedirectHTTPToHTTPSMiddleware',
#     ...,
# ]
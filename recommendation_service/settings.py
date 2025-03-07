# recommendation_service/settings.py
# Add 'recommendation_service' to INSTALLED_APPS
INSTALLED_APPS = [
    ...,
    'recommendation_service',
    'rest_framework',
]

# Database configuration for PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
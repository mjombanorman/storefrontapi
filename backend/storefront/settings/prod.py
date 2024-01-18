from .common import *

env = environ.Env()

# read th .env file
environ.Env.read_env(env_file=str(BASE_DIR) + '/.env')  
DEBUG=False
SECRET_KEY=env('SECRET_KEY')
ALLOWED_HOSTS=[]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': 5432,
    },

}

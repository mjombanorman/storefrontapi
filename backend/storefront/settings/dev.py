from .common import *
DEBUG=True
SECRET_KEY='django-insecure-_n=f&%au#u(kv*_*kmg#gk2f%ah6w)*$(%l^jd=19!=h9ylc8#'
#Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'storefrontapi',
        'USER': 'storefront_dba',
        'PASSWORD': 'st0r3f10n+',
        'HOST': '127.0.0.1',
        'PORT': '',
    }
}

if DEBUG:
    MIDDLEWARE.append('silk.middleware.SilkyMiddleware')
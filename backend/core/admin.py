from django.contrib import admin
from store.admin import ProductAdmin,ProductImageInline
from tag.models import TaggedItem
from store.models import Product
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


# admin.site.register(User,UserAdmin)

from django.contrib.contenttypes.admin import GenericTabularInline


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", "email", "first_name", "last_name"),
            },
        )),
class TagInline(GenericTabularInline):
    autocomplete_fields = ['tag']
    model = TaggedItem

class CustomProductAdmin(ProductAdmin):
    inlines = [TagInline,ProductImageInline]


admin.site.unregister(Product)
admin.site.register(Product, CustomProductAdmin)

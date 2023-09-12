from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Collection)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'unit_price']
    list_editable = ['unit_price']
    list_per_page = 20


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership']
    list_editable = ['membership']
    ordering = ['first_name', 'last_name']
    list_per_page = 20

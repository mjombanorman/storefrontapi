from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from .models import *
from django.db.models import Count
from django.utils.html import format_html,urlencode
from django.urls import reverse

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'unit_price','inventory_status','collection_title']
# Register your models here.
@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['title','products_count']

    @admin.display(ordering='products_count')
    def products_count(self,collection):
        url = (
            reverse('admin:store_product_changelist')
              + '?'
              + urlencode({
                  'collection__id':str(collection.id)
              }))
        page_link = format_html ('<a href="{}">{}</a>',url,collection.products_count)
        return page_link
    
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count = Count('product')
        )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'unit_price','inventory_status','collection_title']
    list_editable = ['unit_price']
    list_per_page = 20
    list_select_related = ['collection']

    def collection_title(self,product):
        return product.collection.title
    
    @admin.display(ordering='inventory')
    def inventory_status(self,product):
        if product.inventory < 10 :
            return 'LOW'
        else:
            return 'OK'


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name','membership', 'orders']
    list_editable = ['membership']
    list_per_page = 10
  
    @admin.display(ordering='orders')
    def orders(self,customer):
        url = (
            reverse('admin:store_order_changelist')
              + '?'
              + urlencode({
                  'customer__id':str(customer.id)
              }))
        page_link = format_html ('<a href="{}">{} Orders</a>',url,customer.orders_count)
        return page_link

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'placed_at', 'customer']
    list_per_page = 20
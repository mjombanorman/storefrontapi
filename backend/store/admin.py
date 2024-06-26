from django.contrib import admin, messages
from django.db.models.query import QuerySet
from django.contrib.contenttypes.admin import GenericTabularInline
from .models import *
from django.db.models import Count
from django.utils.html import format_html, urlencode
from django.urls import reverse
from tag.models import TaggedItem


class InventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'Low')
        ]

    def get_queryset(self, request, queryset: QuerySet):
        return super().get_queryset(request).annotate(products_count=Count('products'))

    def queryset(self, request, queryset: QuerySet):
        if self.value() == '<10':
            return queryset.filter(inventory__lt=10)


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'products_count']
    search_fields = ['title']

    @admin.display(ordering='products_count')
    def products_count(self, collection):
        url = (
            reverse('admin:store_product_changelist')
            + '?'
            + urlencode({
                'collection__id': str(collection.id)
            }))
        page_link = format_html('<a href="{}">{}</a>',
                                url, collection.products_count)
        return page_link

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )

class ProductImageInline(admin.TabularInline):
    model=ProductImage
    readonly_fields=['thumbnail']

    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail"/>')
        return ''
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['collection']
    prepopulated_fields = {
        'slug': ['title']
    }
    list_display = ['title', 'unit_price',
                    'inventory_status', 'collection_title']
    list_editable = ['unit_price']
    list_filter = ['collection', 'last_update', InventoryFilter]
    list_per_page = 20
    list_select_related = ['collection']
    search_fields = ['title']
    inlines=[ProductImageInline]

    def collection_title(self, product):
        return product.collection.title

    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 10:
            return 'LOW'
        else:
            return 'OK'

    actions = ['clear_inventory']
    list_display = ['title', 'unit_price',
                    'inventory_status', 'collection_title']
    list_editable = ['unit_price']
    list_filter = ['collection', 'last_update', InventoryFilter]
    list_per_page = 20
    list_select_related = ['collection']

    def collection_title(self, product):
        return product.collection.title

    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 10:
            return 'LOW'
        else:
            return 'OK'

    def clear_inventory(self, request, queryset: QuerySet):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request, f'{updated_count} products were successfully updated')
        
    class Media:
        css = {
            'all': ['store/styles.css']
        }


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership', 'orders']
    search_fields = ['first_name', 'last_name']
    list_editable = ['membership']
    list_select_related = ['user']
    list_per_page = 10

    @admin.display(ordering='orders')
    def orders(self, customer):
        url = (
            reverse('admin:store_order_changelist')
            + '?'
            + urlencode({
                'customer__id': str(customer.id)
            }))
        page_link = format_html(
            '<a href="{}">{} Orders</a>', url, customer.orders_count)
        return page_link

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )


class OrderItemInline(admin.TabularInline):
    autocomplete_fields = ['product']
    min_num = 1
    max_num = 10
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]
    list_display = ['id', 'placed_at', 'customer']
    autocomplete_fields = ['customer']
    list_per_page = 20


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    pass

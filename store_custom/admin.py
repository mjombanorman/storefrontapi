# from django.contrib import admin
# from store.admin import ProductAdmin
# from tags.model import TaggedItem
# from django.contrib.contenttypes.admin import GenericTabularInline

# class TagInline(GenericTabularInline):
#     autocomplete_fields = ['tag']
#     model = TaggedItem
# # Register your models here.

# # class TagInline(admin.TabularInline):

# class CustomProductAdmin(ProductAdmin):
#     inlines = [TagInline]

# admin.site.unregister(Product)
# admin.site.register(Product,CustomProductAdmin)
from django.urls import path
from rest_framework_nested import routers
from .import views

router = routers.DefaultRouter() 
router.register('products', views.ProductViewSet,basename='products')
router.register('collections', views.CollectionViewSet)
router.register('carts', views.CartViewSet)
router.register('customers', views.CustomerViewSet)
router.register('orders', views.OrderViewSet,basename='orders-detail')
product_router = routers.NestedDefaultRouter(router,'products',lookup='product')
carts_router =routers.NestedDefaultRouter(router,'carts',lookup='cart')
carts_router.register('items',views.CartItemViewSet,basename='cart-items')
product_router.register('reviews',views.ReviewViewSet,basename='product-reviews')
product_router.register('images',views.ProductImageViewSet,basename='product-images')
urlpatterns = router.urls + product_router.urls + carts_router.urls

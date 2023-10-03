from decimal import Decimal
from rest_framework import serializers
from store.models import *
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title','unit_price','slug','description','inventory','price_with_tax','collection']
    price_with_tax =serializers.SerializerMethodField(method_name='calculate_tax')

    def calculate_tax(self,product:Product):
        return product.unit_price * Decimal(1.1)

 
class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id','title','products_count']
    products_count = serializers.IntegerField(read_only=True)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id','name','description','created_at']

    def create(self,validated_data):
        product_id = self.context['product_id']
        return Review.objects.create(product_id=product_id,**validated_data)
    
class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title','unit_price']

class CartItemSerializer(serializers.ModelSerializer):
    product =SimpleProductSerializer()
    total_price = serializers.SerializerMethodField(method_name='get_total_price')
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','total_price']
    
    def get_total_price(self,cart_item:CartItem):
        return cart_item.product.unit_price * cart_item.quantity

class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True,read_only=True)
    total_price = serializers.SerializerMethodField(method_name='get_total_price')
    def get_total_price(self,cart:Cart):
       return sum([item.quantity * item.product.unit_price for item in cart.items.all()])
  
    class Meta:
        model = Cart
        fields = ['id','items','total_price']


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    class Meta:
        model = CartItem
        fields = ['id','product_id','quantity']
    def validate_product_id(self,value):
        try:
            product = Product.objects.get(id=value)
        except Product.DoesNotExist:
            raise serializers.ValidationError('Product does not exist')
        return value


    def save(self,**kwargs):
        product_id = self.validated_data['product_id']
        quantity = self.validated_data['quantity']
        cart_id = self.context['cart_id']

        try:
            cart_item = CartItem.objects.get(cart_id=cart_id,product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart_id=cart_id,**self.validated_data) #product_id=product_id,quantity=quantity)
        return self.instance

       
class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']
    def validate_quantity(self,value):
        if value <= 0:
            raise serializers.ValidationError('Quantity must be greater than zero')
        return value


class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Customer
        fields = ['id','user_id','phone','birthdate','membership']
        
       
       
class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['id','product','quantity','unit_price']
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model= Order
        fields = ['id','customer','placed_at','payment_status','items']
        
        
        
class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()
    def save(self,**kwargs):
        print (self.validated_data['cart_id'])
        print(self.context['user_id'])
        
        (customer,created)=Customer.objects.get_or_create(user_id=self.context['user_id'])
        Order.objects.create(customer=customer)
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


class ReviewSerializer(serializers.Serializer):
    class Meta:
        model = Review
        fields = ['id','name','description','created_at','product_id']
    
    def validate(self,data):
        if data['product_id'] == None:
            raise serializers.ValidationError('product_id is required')
        return data
   
from decimal import Decimal
from rest_framework import serializers
from store.models import Product,Collection



# class ProductSerializer(serializers.Serializer):
#     id= serializers.IntegerField(read_only=True)
#     title = serializers.CharField(max_length=255)
#     price = serializers.DecimalField(max_digits=10,decimal_places=4,source='unit_price')
#     price_with_tax =serializers.SerializerMethodField(method_name='calculate_tax')
#     collection = serializers.HyperlinkedRelatedField(
#         queryset=Collection.objects.all(),view_name='collection-detail')
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title','unit_price','collection']



    def calculate_tax(self,product:Product):
        return product.unit_price * Decimal(1.1)

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id','title']
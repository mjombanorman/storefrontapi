from store.signals import order_created
from django.db.models.signals import post_save
from django.dispatch import receiver
from store.models import Order

@receiver(order_created)
def on_order_created(sender,**kwargs):
    if created:
        print("Order created")
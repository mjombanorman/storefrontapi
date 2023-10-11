from django.core.management.base import BaseCommand
from faker import Faker
import random
from decimal import Decimal
from store.models import Collection, Product, Customer, Order, OrderItem, Promotion
from core.models import User

fake = Faker()

class Command(BaseCommand):
    help = 'Generates fake data for Django models'

    def handle(self, *args, **kwargs):
        self.generate_random_customers(count=30)
        self.generate_orders()

    def generate_random_customers(self, count):
        self.stdout.write(f'Generating {count} random customers...')
        for _ in range(count):
            # Generate random user data
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            first_name = fake.first_name()
            last_name = fake.last_name()

            # Try to get an existing user or create a new one
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'email': email,
                    'password': password,
                    'first_name': first_name,
                    'last_name': last_name
                }
            )

            # Generate random customer data
            phone = fake.phone_number()
            birthdate = fake.date_of_birth(minimum_age=18, maximum_age=80)
            membership = fake.random_element(elements=[choice[0] for choice in Customer.MEMBERSHIP_CHOICES])

            # Create a Customer instance linked to the User
            Customer.objects.get_or_create(
                user=user,
                defaults={
                    'phone': phone,
                    'birthdate': birthdate,
                    'membership': membership,
                }
            )

            self.stdout.write(f'Created customer: {user.username}')


    def generate_orders(self):
        customers = Customer.objects.all()
        products = Product.objects.all()
        self.stdout.write('Generating orders...')
        for _ in range(100):
            customer = random.choice(customers)
            order = Order.objects.create(customer=customer)
            for _ in range(random.randint(1, 5)):
                product = random.choice(products)
                quantity = random.randint(1, 10)
                unit_price = product.unit_price
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    unit_price=unit_price
                )




  
from django.core.management.base import BaseCommand
from faker import Faker
import random
from decimal import Decimal
from store.models import Collection, Product, Customer, Order, OrderItem,Promotion
from core.models import User

fake = Faker()

class Command(BaseCommand):
    help = 'Generates fake data for Django models'

    def handle(self, *args, **kwargs):
        self.generate_collections()
        self.generate_products()
        self.generate_random_customers(count=50)
        self.generate_orders()

    def generate_collections(self):
        self.stdout.write('Generating collections...')
        for _ in range(10):
            Collection.objects.create(title=fake.word())

    def generate_products(self):
        collections = Collection.objects.all()
        promotions = Promotion.objects.all()
        self.stdout.write('Generating products...')
        for _ in range(300):
            product = Product.objects.create(
                title=fake.unique.word(),
                description=fake.sentence(),
                slug=fake.slug(),
                unit_price=Decimal(random.uniform(1, 100)),
                inventory=random.randint(1, 100),
                collection=random.choice(collections)
            )
            # Ensure there are promotions available before attempting to sample
            if promotions:
                num_promotions = random.randint(0, min(3, len(promotions)))
                product.promotions.set(random.sample(list(promotions), num_promotions))

    def generate_random_customers(self, count):
        self.stdout.write(f'Generating {count} random customers...')
        for _ in range(count):
            # Generate random user data
            username = fake.user_name()
            email = fake.email()
            password = fake.password()
            first_name = fake.first_name()
            last_name = fake.last_name()

            # Create a User instance
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            # Generate random customer data
            phone = fake.phone_number()
            birthdate = fake.date_of_birth(minimum_age=18, maximum_age=80)
            membership = fake.random_element(elements=('B', 'S', 'G'))

            # Create a Customer instance linked to the User
            Customer.objects.create(
                phone=phone,
                birthdate=birthdate,
                membership=membership,
                user=user
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

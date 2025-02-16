from django.core.management.base import BaseCommand
from oauth2_provider.models import Application
from django.contrib.auth.models import User
from secrets import token_urlsafe
import os
class Command(BaseCommand):
    help = "Create a new OAuth2 application dynamically"

    def handle(self, *args, **kwargs):
        # Ensure at least one superuser exists
        superuser = User.objects.filter(is_superuser=True).first()
        if not superuser:
            self.stdout.write(self.style.ERROR("No superuser exists! Please create one first."))
            return

        # Application details
        name = 'College'
        # name = input("Enter App Name")
        
        # client_id = token_urlsafe(32) # For First Time Create 
        # client_secret = token_urlsafe(64) # For First Time Create 
        # 
        client_id=os.getenv("CLIENT_ID"), # After creation it will get form .env file from backend folder
        client_secret=os.getenv("CLIENT_SECRET"), # After creation it will get form .env file from backend folder

        # Create application
        application = Application.objects.create(
            name=name,
            client_id=client_id,
            client_secret=client_secret,
            user=superuser,
            client_type=Application.CLIENT_CONFIDENTIAL,
            authorization_grant_type=Application.GRANT_PASSWORD,
        )

        self.stdout.write(self.style.SUCCESS(f"Application '{name}' Created Successfully!"))
        self.stdout.write(f"Client ID: {client_id}")
        self.stdout.write(f"Client Secret: {client_secret}")

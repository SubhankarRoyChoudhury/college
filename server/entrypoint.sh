#!/bin/bash



# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if not present (only if superuser does not exist)
# echo "Checking if superuser exists..."
# if ! python manage.py shell -c "
# from django.contrib.auth.models import User;
# exists = User.objects.filter(username='admin').exists();
# print(exists)" | grep -q 'True'; then
#     echo "Creating superuser..."
#     python manage.py createsuperuser --noinput --username admin --email admin@gmail.com
#     # Set the password programmatically after superuser is created
#     echo "Setting superuser password..."
#     python manage.py shell -c "
#     from django.contrib.auth.models import User;
#     user = User.objects.get(username='admin');
#     user.set_password('admin123');
#     user.save()"
# fi



echo "Checking if superuser exists..."
if ! python manage.py shell -c "
from django.contrib.auth.models import User;
exists = User.objects.filter(username='admin').exists();
print(exists)" | grep -q 'True'; then
    echo "Creating superuser..."
    DJANGO_SUPERUSER_USERNAME=admin \
    DJANGO_SUPERUSER_EMAIL=admin@gmail.com \
    DJANGO_SUPERUSER_PASSWORD=admin123 \
    python manage.py createsuperuser --noinput
else
    echo "Superuser already exists."
fi

# Setup OAuth2 app
echo "Setting up OAuth2 app..."
python manage.py create_oauth2_app

# echo "runserver"
# python manage.py runserver

# Start the server (default to Gunicorn)
exec "$@"

#!/bin/bash



# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate


# --------------- This Below Code Create Only Super User with Email,Username Start --------------

# echo "Checking if superuser exists..."
# if ! python manage.py shell -c "
# from django.contrib.auth.models import User;
# exists = User.objects.filter(username='admin').exists();
# print(exists)" | grep -q 'True'; then
#     echo "Creating superuser..."
#     DJANGO_SUPERUSER_USERNAME=admin \
#     DJANGO_SUPERUSER_EMAIL=admin@gmail.com \
#     DJANGO_SUPERUSER_PASSWORD=admin123 \
#     python manage.py createsuperuser --noinput
# else
#     echo "Superuser already exists."
# fi

# --------------- This Top Code Create Only Super User with Email,Username End --------------


echo "Checking if superuser exists..."
if ! python manage.py shell -c "
from django.contrib.auth.models import User;
exists = User.objects.filter(username='subhosrc').exists();
print(exists)" | grep -q 'True'; then
    echo "Creating superuser..."
    DJANGO_SUPERUSER_USERNAME=subhosrc \
    DJANGO_SUPERUSER_EMAIL=subhankarsrc1@gmail.com \
    DJANGO_SUPERUSER_PASSWORD=admin@123 \
    python manage.py createsuperuser --noinput

    # Add a small delay to ensure the user is created
    sleep 2

    echo "Updating superuser details..."
    python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
user = User.objects.filter(username='subhosrc').first();
if user:
    user.first_name = 'Subhankar';
    user.last_name = 'Roy Choudhury';
    user.save()
else:
    print('Superuser not found!')"
else
    echo "Superuser already exists."
fi

# Setup OAuth2 app
echo "Setting up OAuth2 app..."
python manage.py create_oauth2_app
python manage.py runserver

# echo "runserver"
# python manage.py runserver

# Start the server (default to Gunicorn)
exec "$@"

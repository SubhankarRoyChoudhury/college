find . -type d -name __pycache__ -exec rm -fr {} \;
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
# python3 manage.py makemigrations
# python3 manage.py migrate
# python3 manage.py loaddata initial_table_config.json
# python3 manage.py runserver

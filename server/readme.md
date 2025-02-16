## For Backend Django Service

1. Open another terminal

```Run the following commands.

cd server
sudo apt install python3.10-venv
python3.10 -m venv env
source env/bin/activate
pip install django
pip install -U pip
pip3 install -r requirements.txt
./entrypoint.sh
python3 manage.py runserver

```

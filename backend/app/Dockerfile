FROM python:3.8

WORKDIR /flask_app

COPY ./flask_app /flask_app

ADD requirements.txt /flask_app/requirements.txt

RUN apt-get update && apt-get install -y 

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]

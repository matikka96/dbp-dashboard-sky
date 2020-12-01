from datetime import date
from flask import Flask, jsonify, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
api = Api(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_ECHO'] = True
app.config['JSON_AS_ASCII'] = False

#SQLAlchemy db instance. Initialize marshmallow after SQLAlchemy
db = SQLAlchemy(app)
ma = Marshmallow(app)

def custom_error(message, status_code):
    return make_response(jsonify(message), status_code)

#PAA Class/Model
class AnalyticsDashboard(db.Model):
    __tablename__ = 'analytics_dashboard'
    index = db.Column(db.Integer, primary_key=True)
    air_moisture_percent = db.Column(db.Integer)
    CO2 = db.Column(db.Float)
    people_count = db.Column(db.Integer)
    inside_temperature = db.Column(db.Float)
    outside_temperature = db.Column(db.Float)
    power_usage = db.Column(db.Float)
    solar_panel_generation = db.Column(db.Float)
    air_quality_index = db.Column(db.Integer)
    elevators_in_use_avg = db.Column(db.Integer)
    datetime = db.Column(db.DateTime)
    
    def __init__(self, index, air_moisture_percent, CO2, people_count, inside_temperature, outside_temperature, power_usage, solar_panel_generation, air_quality_index, elevators_in_use_avg, datetime):
        self.index = index
        self.air_moisture_percent = air_moisture_percent
        self.CO2 = CO2
        self.people_count = people_count
        self.inside_temperature = inside_temperature
        self.outside_temperature = outside_temperature
        self.power_usage = power_usage
        self.solar_panel_generation = solar_panel_generation
        self.air_quality_index = air_quality_index
        self.elevators_in_use_avg = elevators_in_use_avg
        self.datetime = datetime

    
# Schema
class AnalyticsDashboardSchemaAll(ma.Schema):
    class Meta:
        fields = ("index", "air_moisture_percent", "CO2","people_count","inside_temperature","outside_temperature", "power_usage","solar_panel_generation","air_quality_index","elevators_in_use_avg","datetime")
        model = AnalyticsDashboard

#Init schema
schemas = AnalyticsDashboardSchemaAll(many=True)


class DashboardInfo(Resource):
    def get(self):
        all_paas = AnalyticsDashboard.query.order_by(AnalyticsDashboard.index).all()
        if all_paas:
            result = schemas.dump(all_paas)
            return jsonify(result)
        else:
            return custom_error("Not found", 404)


api.add_resource(DashboardInfo, "/all_info/") 

if __name__ == "__main__":
    ##################
    #db.create_all will create and override old database. 
    db.create_all()
    app.run(debug=True, host='0.0.0.0')


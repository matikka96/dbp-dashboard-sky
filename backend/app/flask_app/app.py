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
    
    def __init__(self, name, index):
        self.name = name
        self.index = index

    
#PAA Schema
class AnalyticsDashboardSchemaAll(ma.Schema):
    class Meta:
        fields = ("name","index")
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


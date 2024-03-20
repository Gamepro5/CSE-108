import os
import json

from flask import Flask,jsonify,request,abort
from flask_cors import CORS, cross_origin

from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
class Grades(db.Model):
    name = db.Column(db.String, primary_key=True)
    grade = db.Column(db.Numeric)




db.create_all()

  
app =   Flask(__name__) 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/grades/', methods = ['GET', 'POST']) 
@cross_origin()
def gradesFromNothing(): 

    if(request.method == 'GET'):
        return jsonify(Grades.query.all())
    elif (request.method == 'POST'):
        data = json.loads(request.data)
        if Grades.query.filter_by(name=data['name']).first() is None:
            return abort(500)
        else:
            db.session.add(Grades(name=data['name'], email=data['grade']))
            db.session.commit()
            return jsonify(success=True)
    
@app.route('/grades/<name>', methods = ['GET', 'PUT', 'DELETE']) 
@cross_origin()
def gradeFromName(_name): 
    if(request.method == 'GET'):
        
        person = Grades.query.filter_by(name=data['name']).first()
        if person is not None:
            return jsonify(person) 
        return abort(404)
    elif (request.method == 'PUT'):
        data = json.loads(request.data)
        person = Grades.query.filter_by(name=_name).first()
        if person is not None:
            person.grade = data['grade']
            db.session.commit()
            resp = jsonify(success=True)
            return resp
    elif (request.method == 'DELETE'):
        if Grades.query.filter_by(name=_name).first() is not None:
            Grades.query.filter_by(name=_name).delete()
            resp = jsonify(success=True)
            return resp
        return abort(404)

import os
import json


from flask import Flask,jsonify,request,abort
from flask_cors import CORS, cross_origin
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
basedir = os.path.abspath(os.path.dirname(__file__))
print('sqlite:///', os.path.join(basedir, 'database.db'))
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Grades(db.Model):
    name = db.Column(db.String, primary_key=True)
    grade = db.Column(db.Numeric)

class GradesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Grades
        load_instance = True

with app.app_context():
    db.create_all()

@app.route('/grades/', methods = ['GET', 'POST']) 
@cross_origin()
def gradesFromNothing(): 
    with app.app_context():
        if(request.method == 'GET'):
            grades = Grades.query.all()
            grades_schema = GradesSchema(many=True)
            output = grades_schema.dump(grades)
            return jsonify({'grades': output})
        elif (request.method == 'POST'):
            data = json.loads(request.data)
            print(data['name'])
            print(Grades.query.filter_by(name=data['name']).first())
            if Grades.query.filter_by(name=data['name']).first() is not None:
                return abort(500)
            else:
                db.session.add(Grades(name=data['name'], grade=data['grade']))
                db.session.commit()
                return jsonify(success=True)
    
@app.route('/grades/<_name>', methods = ['GET', 'PUT', 'DELETE']) 
@cross_origin()
def gradeFromName(_name): 
    with app.app_context():
        if(request.method == 'GET'):
            grades = Grades.query.filter_by(name=_name).first()
            grades_schema = GradesSchema(many=False)
            output = grades_schema.dump(grades)
            if grades is not None:
                return jsonify({'grades': output})
            return abort(404)
        elif (request.method == 'PUT'):
            data = json.loads(request.data)
            person = Grades.query.filter_by(name=_name).first()
            if person is not None:
                person.grade = float(data['grade'])
                db.session.commit()
                resp = jsonify(success=True)
                return resp
        elif (request.method == 'DELETE'):
            if Grades.query.filter_by(name=_name).first() is not None:
                Grades.query.filter_by(name=_name).delete()
                db.session.commit()
                resp = jsonify(success=True)
                return resp
            return abort(404)


if __name__ == '__main__':
    app.run()
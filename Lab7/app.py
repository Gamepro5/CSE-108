import os
import json

from flask import Flask,jsonify,request,abort
from flask_cors import CORS, cross_origin

from sqlalchemy import create_engine, MetaData, Table

engine = create_engine('sqlite:////database.db')
metadata = MetaData(bind=engine)


grades = {}

def saveGrades():
    f = open('./flaskr/grades.txt', "w")
    f.write(json.dumps(grades))
    f.close()

def loadGrades():
    global grades
    f = open('./flaskr/grades.txt', "r")
    grades = json.load(f)
    f.close()

  
app =   Flask(__name__) 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/grades/', methods = ['GET', 'POST']) 
@cross_origin()
def gradesFromNothing(): 

    if(request.method == 'GET'):
        loadGrades()
        return jsonify(grades) 
    elif (request.method == 'POST'):
        print("FUCK2")
        data = json.loads(request.data)
        if data['name'] in grades:
            return abort(500)
        else:
            print("FUCKFUCK")
            grades.update({data['name'] : data['grade']})
           # grades[data['name']] = data['grade']
            saveGrades()
            return jsonify(success=True)
    
@app.route('/grades/<name>', methods = ['GET', 'PUT', 'DELETE']) 
@cross_origin()
def gradeFromName(name): 
    if(request.method == 'GET'):
        loadGrades()
        if name in grades:
            output = {
                name: grades[name]
            }
            return jsonify(output) 
        return abort(404)
    elif (request.method == 'PUT'):
        if name in grades:
            data = json.loads(request.data)
            grades[name] = data['grade']
            saveGrades()
            resp = jsonify(success=True)
            return resp
    elif (request.method == 'DELETE'):
        if name in grades:
            del grades[name]
            saveGrades()
            resp = jsonify(success=True)
            return resp

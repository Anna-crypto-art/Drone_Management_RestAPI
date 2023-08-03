import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://anna:password@localhost:5432/drones_1"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
print('Done')



#with app.app_context():
#    result = db.session.execute(text('select * from drone_brand'))
#    print(result)


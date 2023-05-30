from flask import Flask, render_template, request, redirect, url_for  
from sqlalchemy import create_engine  
from sqlalchemy.orm import sessionmaker  
from database_setup import Base, DroneBrand, DroneFlight, Drone 
  
app = Flask(__name__)  
  

engine = create_engine('sqlite:///drone-collection.db?check_same_thread=False')  
Base.metadata.bind = engine  
  
DBSession = sessionmaker(bind=engine)  
session = DBSession()  
  
   
@app.route('/')  
@app.route('/drones')  
def show_drones():  
    books = session.query(DroneBrand).all()  
    return render_template("drones.html", drones=drones)  
  
  
 
@app.route('/drones/new/', methods=['GET', 'POST'])  
def new_drone_brand():  
    if request.method == 'POST':  
        newBook = DroneBrand(brand_name=request.form['xxxx'], owner_name=request.form['xxxx'])  
        session.add(new_drone_brand)  
        session.commit()  
        return redirect(url_for('showDrones'))  
    else:  
        return render_template('newDrone.html')  
  
  
  
@app.route("/drones/<int:brand_id>/edit/", methods=['GET', 'POST'])  
def edit_drone_brand(brand_id):  
    edit_drone_brand = session.query(DroneBrand).filter_by(id=brand_id).one()  
    if request.method == 'POST':  
        if request.form['xxxx']:  
            edit_drone_brand.brand_name = request.form['xxxx']  
            return redirect(url_for('showDrones'))  
    else:  
        return render_template('editDrone.html', drone=edit_drone_brand)  
  
  
  
@app.route('/drones/<int:brand_id>/delete/', methods=['GET', 'POST'])  
def delete_drone_brand(brand_id):  
    delete_drone_brand = session.query(DroneBrand).filter_by(id=brand_id).one()  
    if request.method == 'POST':  
        session.delete(delete_drone_brand)  
        session.commit()  
        return redirect(url_for('showDrones', brand_id=brand_id))  
    else:  
        return render_template('deleteDrone.html', drone=delete_drone_brand)  
  



if __name__ == '__main__':  
    app.debug = True  
    app.run(port=4996)



from sqlalchemy import select
from typing import List
from flask_drone.app import db, app 
from flask_drone.models.drone_brand import DroneBrand


with app.app_context():
    drones: List[DroneBrand] = db.session.query(DroneBrand).all()
    print(drones)

with app.app_context():
    for drone in drones:
          print(drone.owner_name)



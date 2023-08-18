from flask_drone.app import db
from sqlalchemy import ForeignKey

class Drone(db.Model):
    drone_id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(100), nullable=False)
    brand_id = db.Column(db.Integer, ForeignKey("drone_brand.brand_id", onupdate = "CASCADE", ondelete = "CASCADE"), nullable=False)             
    serial_number = db.Column(db.String(100), nullable=False)
    diagonal_length = db.Column(db.Float, nullable=False)
    max_flight_distance = db.Column(db.Float, nullable=False)
    sensor = db.Column(db.String(100), nullable=False)
    flight_id = db.Column(db.Integer, ForeignKey("drone_flight.flight_id", onupdate = "CASCADE", ondelete = "CASCADE"), nullable=False)     
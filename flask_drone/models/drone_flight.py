from flask_drone.app import db

class DroneFlight(db.Model):
    flight_id = db.Column(db.Integer, primary_key=True)
    flight_date = db.Column(db.Date, nullable=False)
    flight_duratio = db.Column(db.Time, nullable=False)
    GPS_longitute = db.Column(db.Float, nullable=False)
    GPS_latitute = db.Column(db.Float, nullable=False)
    GPS_altidude = db.Column(db.Float, nullable=False)
    note_field = db.Column(db.String(100), nullable=False)
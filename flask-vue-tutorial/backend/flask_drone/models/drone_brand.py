from flask_drone.app import db

class DroneBrand(db.Model):
    brand_id = db.Column(db.Integer, primary_key=True, autoincrement = True)
    brand_name = db.Column(db.String(100), nullable=False)
    owner_name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<drone_brand {self.brand_name}>'
    



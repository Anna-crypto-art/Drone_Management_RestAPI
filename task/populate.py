from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import DroneBrand, DroneFlight, Drone, Base

engine = create_engine('sqlite:///drone-collection.db')

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()

Drone_brand_one = DroneBrand(brand_name="xxx", owner_name="xxx") 
session.add(Drone_brand_one) 
session.commit()

session.query(Drone_brand_one).all()
session.query(Drone_brand_one).first()

Edited_drone_brand = session.query(Drone_brand_one).filter_by(brand_id=1).one()
Edited_drone_brand.brand_name = "xxxx" 
session.add(Edited_drone_brand) 
session.commit()

Drone_brand_delete = session.query(Drone_brand_one).filter_by(brand_name='xxx').one() 
session.delete(Drone_brand_delete) 
session.commit()




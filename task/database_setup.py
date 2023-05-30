import sys  
from sqlalchemy import Column, ForeignKey, Integer, String  
from datetime import datetime    
from sqlalchemy.ext.declarative import declarative_base  
  
from sqlalchemy.orm import relationship  
  
from sqlalchemy import create_engine  
  
Base = declarative_base()  
   
engine = create_engine('sqlite:///drone-collection.db')  
  
Base.metadata.create_all(engine)

class DroneBrand(Base):  
    __tablename__ = 'drone_brand'  
    
    brand_id = Column(Integer, primary_key=True)  
    brand_name = Column(String, nullable=False)  
    owner_name = Column(String, nullable=False)

class DroneFlight(Base):

    __tablename__ = 'drone_flight'  
    
    flight_id = Column(Integer, primary_key=True)  
    flight_date = Column(date, nullable=False)  
    flight_duration = Column(time, nullable=False)
    GPS_longitute = Column(float, nullable=False)
    GPS_latitute = Column(float, nullable=False)
    GPS_altidude = Column(float, nullable=False)
    note_field = Column(String, nullable=False)

class Drone(Base):
     __tablename__ = 'drone'
     drone_id = Column(Integer, primary_key=True)
     model = Column(String, nullable=False)
     brand_id = Column(Integer, nullable=False)
     serial_number = Column(String, nullable=False)
     diagonal_length = Column(float, nullable=False)
     max_flight_distance = Column(float, nullable=False)
     sensor = Column(String, nullable=False)
     flight_id = Column(Integer, nullable=False)








    

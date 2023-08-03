import sys  
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Float, Time  
  
from sqlalchemy.ext.declarative import declarative_base  
  
from sqlalchemy.orm import relationship  
  
from sqlalchemy import create_engine  
  
Base = declarative_base()  
#creates an instance of create_engine at the end of the file   
engine = create_engine('sqlite:///drone-collection.db')  
# add classes  
Base.metadata.create_all(engine)

class DroneBrand(Base):  
    __tablename__ = 'drone_brand'  
    
    brand_id = Column(Integer, primary_key=True)  
    brand_name = Column(String, nullable=False)  
    owner_name = Column(String, nullable=False)

class DroneFlight(Base):

    __tablename__ = 'drone_flight'  
    
    flight_id = Column(Integer, primary_key=True)  
    flight_date = Column(Date, nullable=False)  
    flight_duration = Column(Time, nullable=False)
    GPS_longitute = Column(Float, nullable=False)
    GPS_latitute = Column(Float, nullable=False)
    GPS_altidude = Column(Float, nullable=False)
    note_field = Column(String, nullable=False)

class Drone(Base):
     __tablename__ = 'drone'
     drone_id = Column(Integer, primary_key=True)
     model = Column(String, nullable=False)
     brand_id = Column(Integer, nullable=False)
     serial_number = Column(String, nullable=False)
     diagonal_length = Column(Float, nullable=False)
     max_flight_distance = Column(Float, nullable=False)
     sensor = Column(String, nullable=False)
     flight_id = Column(Integer, nullable=False)








    

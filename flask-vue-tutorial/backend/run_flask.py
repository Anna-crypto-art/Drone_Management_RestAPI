from typing import List

from flask_drone.app import app, db
from flask_drone.models.drone import Drone
from flask_drone.models.drone_brand import DroneBrand
from flask_drone.models.drone_flight import DroneFlight
from flask_restful import Resource, Api, request
from flask_cors import CORS

CORS(app, origin= ['localhost:*'])
api = Api(app)


class GetOne(Resource):
    def get(self):
        drones: List[Drone] = db.session.query(Drone).all()

        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                    'model': drone.model,
                    'brand_id': drone.brand_id,
                    'serial_number': drone.serial_number,
                    'diagonal_length': drone.diagonal_length,
                    'max_flight_distance': drone.max_flight_distance,
                    'sensor': drone.sensor,
                    'flight_id': drone.flight_id
                }
            )

        return drones_result
    


# class InsertOne(Resource):
#     def post(self):
#         new_drone_brand = DroneBrand(brand_name = 'xxx', owner_name = 'xxx')
#         db.session.add(new_drone_brand)
#         db.session.commit()
#         drones: List[DroneBrand] = db.session.query(DroneBrand).all()
#         drones_result: List[dict] = []

#         for drone in drones:
#             drones_result.append(
#                 {
#                 'owner_names': drone.owner_name
#                 }
#                 )

#         return drones_result


# class InsertOne(Resource):
#     def post(self):
#         post_data = request.get_json()
#         new_drone_brand = Drone(model= post_data.get('model'), brand_id = post_data.get('brand_id'), serial_number = post_data.get('serial_number'), diagonal_length = post_data.get('diagonal_length'), max_flight_distance= post_data.get('max_flight_distance'), sensor = post_data.get('sensor'), flight_id = post_data.get('flight_id'))
#         db.session.add(new_drone_brand)
#         db.session.commit()
#         new_drone = []
        
#         new_drone.append(
#                 {
#                 'model': new_drone_brand.model,
#                 'brand_id' : new_drone_brand.brand_id,
#                 'serial_number' : new_drone_brand.serial_number,
#                 'diagonal_length' : new_drone_brand.diagonal_length,
#                 'max_flight_distance' : new_drone_brand.max_flight_distance,
#                 'sensor' : new_drone_brand.sensor,
#                 'flight_id' : new_drone_brand.flight_id
#                 }
#                 ) 
#         return new_drone

#     def get(self):
#         drones: List[Drone] = db.session.query(Drone).all()
#         drones_result: List[dict] = []

#         for drone in drones:
#             drones_result.append(
#                 {
#                 'model': drone.model,
#                 'brand_id' : drone.brand_id,
#                 'serial_number' : drone.serial_number,
#                 'diagonal_length' : drone.diagonal_length,
#                 'max_flight_distance' : drone.max_flight_distance,
#                 'sensor' : drone.sensor,
#                 'flight_id' : drone.flight_id
#                 }
#                 )

#         return drones_result

    



class InsertGetOne(Resource):
    def post(self):
        post_data = request.get_json()
        new_drone_brand = DroneBrand(brand_id = post_data.get('brand_id'), brand_name= post_data.get('brand_name'), owner_name = post_data.get('owner_name'))
        db.session.add(new_drone_brand)
        db.session.commit()
        new_drone = []
        
        new_drone.append(
                {
                'brand_id': new_drone_brand.brand_id,
                'brand_name': new_drone_brand.brand_name,
                'owner_name' : new_drone_brand.owner_name
                }
                ) 
        return new_drone

    def get(self):
        drones: List[DroneBrand] = db.session.query(DroneBrand).all()
        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                'brand_id': drone.brand_id,
                'brand_name': drone.brand_name,
                'owner_name' : drone.owner_name
                }
                )

        return drones_result

    
    



class UpdateDeleteOne(Resource):
    def put(self, brand_id:str):
        #brand_id = 1
        brand_id_ = int(brand_id)
        update_drone = db.session.query(DroneBrand).get(brand_id_)
        post_data = request.get_json()
        new_brand_name = post_data.get('brand_name')  
        update_drone.brand_name = new_brand_name
        new_owner_name = post_data.get('owner_name')  
        update_drone.owner_name = new_owner_name
        db.session.commit()

        drones: List[DroneBrand] = db.session.query(DroneBrand).all()
        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                'brand_id': drone.brand_id,
                'brand_name': drone.brand_name,
                'owner_name' : drone.owner_name
                }
                )

        return drones_result
    
    def delete(self, brand_id:str): 
        brand_id_ = int(brand_id)
        #update_drone = db.session.query(DroneBrand).get(brand_id_)
        db.session.query(DroneBrand).filter(DroneBrand.brand_id == brand_id_).delete()
        db.session.commit()
        drones: List[DroneBrand] = db.session.query(DroneBrand).all()
        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                'brand_id': drone.brand_id,
                'brand_name': drone.brand_name,
                'owner_name' : drone.owner_name
                }
                )

        return drones_result




# api.add_resource(GetOne, '/get')

api.add_resource(InsertGetOne, '/drones')

api.add_resource(UpdateDeleteOne, '/drones/<brand_id>')





if __name__ ==  '__main__':
    app.run(debug=True)
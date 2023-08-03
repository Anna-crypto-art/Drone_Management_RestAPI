from typing import List

from flask_drone.app import app, db
from flask_drone.models.drone import Drone
from flask_drone.models.drone_brand import DroneBrand
from flask_restful import Resource, Api

api = Api(app)

class GetOne(Resource):
    def get(self):
        drones: List[Drone] = db.session.query(Drone).all()

        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                    'model': drone.model
                }
            )

        return drones_result
    


class InsertOne(Resource):
    def post(self):
        new_drone_brand = DroneBrand(brand_name = 'xxx', owner_name = 'xxx')
        db.session.add(new_drone_brand)
        db.session.commit()
        drones: List[DroneBrand] = db.session.query(DroneBrand).all()
        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                'owner_names': drone.owner_name
                }
                )

        return drones_result
    


class UpdateOne(Resource):
    def post(self, brand_id:str):
        #brand_id = 1
        brand_id_ = int(brand_id)
        update_drone = db.session.query(DroneBrand).get(brand_id_)
        update_drone.brand_name = 'the new brand name!'
        db.session.commit()

        drones: List[DroneBrand] = db.session.query(DroneBrand).all()
        drones_result: List[dict] = []

        for drone in drones:
            drones_result.append(
                {
                'owner_names': drone.brand_name
                }
                )

        return drones_result


#changes



'''class HelloAnotherWorld(Resource):
    def delete(): # HTTP DELETE
        pass

        # delete a drone
        db.session.query(Drone)\
            .filter(Drone.drone_id == drone_id)\
            .delete()  '''


api.add_resource(GetOne, '/link')

api.add_resource(InsertOne, '/insert')

api.add_resource(UpdateOne, '/drone/<brand_id>')

if __name__ == '__main__':
    app.run(debug=True)
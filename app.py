from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://anna:password@localhost:5432/drones_1"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('drone', 'drone_brand', 'drone_flight')

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    return jsonify({"Hello":"World!"})

@app.route('/add', methods=['POST'])
def add_article():
    drone = request.json['drone']
    drone_brand = request.json['drone_brand']
    drone_flight = request.json['drone_flight']

if __name__ == "__main__":
    app.run(debug=True)
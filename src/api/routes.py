"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity 
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS



api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    check_user = User.query.filter_by(email=email).first()

    if check_user is None:
        return jsonify({"msg": "User doesn't exist"}), 404

    if password != check_user.password:
        return jsonify({"msg": "Clave o email incorrecto"}), 401
    
    access_token = create_access_token(identity=check_user.email)
    return jsonify({"token": access_token, "user_id": check_user.id})

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", True)

    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"msg": "El correo ya está registrado"}), 400

    new_user = User(email=email, password=password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_email = get_jwt_identity()
        print(current_user_email)
        user = User.query.filter_by(email = current_user_email).first()
        print(user)

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "id": user.id,
            "email": user.email,
            "is_active": user.is_active
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @api.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     return jsonify({"id": user.id}), 200


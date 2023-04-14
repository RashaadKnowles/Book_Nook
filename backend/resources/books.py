from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import reviews_schema, rewiew_schema, favorite_schema, favorites_schema


class UserReviewResource(Resource):

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review = rewiew_schema.load(form_data)
        new_review.user_id =user_id
        db.session.add(new_review)
        db.session.commit()
        return rewiew_schema.dump(new_review), 201

        
        


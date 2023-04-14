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


class UserFavoriteResource(Resource):
      @jwt_required()
      def post(self):
            user_id = get_jwt_identity()
            form_data = request.get_json()
            new_favorite = Favorite.load(form_data)
            new_favorite.user_id = user_id
            db.session.add(new_favorite)
            db.session.commit()
            return Favorite.dump(new_favorite), 201


      @jwt_required()
      def get(self):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.filter_by(user_id=user_id)
        return Favorite.dump(user_favorites), 200
        
        


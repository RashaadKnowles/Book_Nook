from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import rewiew_schema, favorite_schema 


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
            new_favorite = favorite_schema.load(form_data)
            new_favorite.user_id = user_id
            db.session.add(new_favorite)
            db.session.commit()
            return favorite_schema.dump(new_favorite), 201


      @jwt_required()
      def get(self):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.filter_by(user_id=user_id)
        return favorite_schema.dump(user_favorites), 200
        
class GetBookInformation(Resource):
      def get(self, book_id, user_id):
            sum_review = 0  
            custom_reponse = {}
            book_reviews = Review.query.filter_by(book_id=book_id)
            ratings = [review.rating for review in book_reviews]
            try:
                  average_review = sum(ratings)/len(ratings)
                  custom_reponse = {
                        "Average Rewview": average_review
                  }
            except:
                  average_review = 'Not Available'
                  custom_reponse = {
                        "Average Rewview": average_review
           
                  }
            if Favorite.query.filter_by(book_id=book_id, user_id=user_id):
                  custom_reponse["is_favorite"] = True
            else: 
                  custom_reponse["is_favorite"] = False
            return custom_reponse, 200
                  
                 

            


        


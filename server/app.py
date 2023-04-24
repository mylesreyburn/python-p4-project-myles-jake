#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Local imports

from models import User, Character, Comment

# setting up secret key

app.secret_key = b'\xfd\x94(\x8b\xda\xe1\xee\xdc5\xcb\x88\x0b&\xb4\xc7\xa3'

# Views go here!

class Login(Resource):
    def post(self):
        data = request.get_json()

        check_user = User.query.filter(User.username == data['username']).first()
        
        if check_user and check_user.authenticate(data['password']):
            session['user_id'] = check_user.id
            return make_response(check_user.to_dict(), 200)
        return {'error': 'Unauthorized'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        profile_image = data.get('profile_image')

        new_user = User(
            username=username,
            profile_image = profile_image
            
        )

        new_user.password_hash = password

        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)

        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 417)


class Characters(Resource):
    def get(self):
        all_chars = []

        for character in Character.query.all():
            dict_char = character.to_dict()
            all_chars.append(dict_char)

        response = make_response(
            jsonify(all_chars),
            200
        )

        return response
    
    def post(self):
        data = request.get_json()
        name = data.get('name')
        age = data.get('age')
        race = data.get('race')
        gender = data.get('gender')
        bio_1 = data.get('bio_1')
        bio_2 = data.get('bio_2')
        image_1 = data.get('image_1')
        image_2 = data.get('image_2')
        user_id = data.get('user_id')

        new_character = Character(
            name=name,
            age = age,
            race = race,
            gender = gender,
            bio_1 = bio_1,
            bio_2 = bio_2,
            image_1 = image_1,
            image_2 = image_2,
            user_id  = user_id
        )

        try:
            db.session.add(new_character)
            db.session.commit()
            return make_response(new_character.to_dict(), 201)
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 417)

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict())
        else:
            return make_response({"error": "No User found"}, 404)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        new_username = request.json.get('display_name')
        new_avatar = request.json.get('profile_image')
        print(f"display name: {new_username}, profile_image:{new_avatar}")
        current_module_id = request.json.get('current_module_id')

        # if current_module_id:
        #     user.current_module_id = current_module_id

        if new_username:
            user.display_name = new_username

        if new_avatar:
            user.profile_image = new_avatar

        db.session.commit()
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 200)

class Comments(Resource):
    def get(self):

        all_comments = []

        for comment in Comment.query.all():
            dict_comment = comment.to_dict()
            all_comments.append(dict_comment)

        response = make_response(
            jsonify(all_comments),
            200
        )

        return response
    
    def post(self):
        data = request.get_json()
        contents = data.get('contents')

        new_comment = Comment(
            contents=contents
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            return make_response(new_comment.to_dict(), 201)
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 417)


@app.route("/character/<int:id>", methods=["GET", "POST", "PATCH"])
def character_by_id(id):
    character = Character.query.filter(Character.id == id).first()

    if not character:
        response = make_response(
            jsonify({
                "error": "404: Character Not Found"
            }),
            404
        )
        return response
    
    response = make_response(
        jsonify(character.to_dict()),
        200
    )
    return response

@app.route("/comment/<int:id>")
def comment_by_id(id):
    comment = Comment.query.filter(Comment.id == id).first()

    if not comment:
        response = make_response(
            jsonify({
                "error": "404: Comment Not Found"
            }),
            404
        )
        return response

    response = make_response(
        jsonify(comment.to_dict()),
        200
    )
    return response

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        
        if not user_id:
            return {'error': 'Unauthorized'}, 401
        
        current_user = User.query.filter(User.id == user_id).first()
        return current_user.to_dict(), 200

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Characters, '/characters')
api.add_resource(Comments, '/comments')
api.add_resource(UserByID, '/user/<int:id>')
api.add_resource(CheckSession, '/check_session')



if __name__ == '__main__':
    app.run(port=5555, debug=True)


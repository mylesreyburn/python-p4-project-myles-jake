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

@app.route("/log_in", methods=["POST"])
def log_in():
    # simple code: This takes in data from a Formik form, that being a username and a password.
    # it then checks the database to see if there's a user with both that username and that password.
    # if there's a match, it logs the user in and assigns their session a cookie which says which user they're logged in as
    # if there isn't a match, it doesn't do this

    log_in_data = request.get_json()
    username = log_in_data.get("username")
    password = log_in_data.get("password") # still need to implement password hashing and such

    user = User.query.filter(User.username == username).first()

    if not user or not user.authenticate(password):
        response = make_response(
            jsonify({"error": "Invalid Username or Password"}),
            404
        )

        return response

    session["user_token"] = user.id

    print(session.get("user_token"))

    response = make_response(
        jsonify({"success": "User Logged In Successfully"}),
        200
    )

    return response



@app.route("/sign_up", methods = ["POST"])
def sign_up():
    # even simpler code:
    # takes in a form with a username and a password
    # creates a brand new User object if the username is not already in use
    # slaps a user cookie on the session and everything's hunky dory

    new_user_data = request.get_json()
    username = new_user_data.get("username")
    password = new_user_data.get("password")
    profile_image = new_user_data.get("profile_image")

    new_user_object = User(username=username, password_hash=password, profile_image=profile_image)

    if not new_user_object:
        response = make_response(
            jsonify({"error": "Invalid User"}),
            400
        )

        return response
    try:
        db.session.add(new_user_object)
        db.session.commit()
    except:
        response = make_response(
            jsonify({"error": "Username Already In Use"}),
            400
        )
        return response

    session["user_token"] = new_user_object.id

    print(session["user_token"])

    response = make_response(
        jsonify({"success": "New User Created Successfully"}),
        201
    )

    return response


@app.route("/all_characters")
def all_characters():

    all_chars = []

    for character in Character.query.all():
        dict_char = character.to_dict()
        all_chars.append(dict_char)

    response = make_response(
        jsonify(all_chars),
        200
    )

    return response

@app.route("/all_users")
def all_users():

    all_users = []

    for user in User.query.all():
        dict_user = user.to_dict()
        all_users.append(dict_user)

    response = make_response(
        jsonify(all_users),
        200
    )

    return response

@app.route("/all_comments")
def all_comments():

    all_comments = []

    for comment in Comment.query.all():
        dict_comment = comment.to_dict()
        all_comments.append(dict_comment)

    response = make_response(
        jsonify(all_comments),
        200
    )

    return response

@app.route("/user/<int:id>", methods=["GET", "PATCH"])
def user_by_id(id):
    print(session.get("user_token"))

    user = User.query.filter(User.id == id).first()

    if not user:
        response = make_response(
            jsonify({
                "error": "404: User Not Found"
            }),
            404
        )
        return response
    
    if request.method == "PATCH":
        if session.get("user_token") == user.id:
            for field in request.json:
                if field == "password" or field == "username":
                    response = make_response(
                        jsonify({
                            "error": "403: Cannot Modify User Credentials"
                        }),
                        403)
                    
                    return response
                if field == "display_name":
                    print(f"Woah, the display_name field is: {field}")
                
                if field == "display_name" and len(request.json.get(field)) < 1:
                    response = make_response(
                        jsonify({
                            "error": "400: Display Name Must Contain At Least One Character"
                        }),
                        400
                    )
                    return response
                setattr(user, field, request.json.get(field))
            db.session.commit()
        else:
            response = make_response(
            jsonify({
                    "error": "403: Cannot Modify Another User's Data"
                }),
                403
            )
            return response


    response = make_response(
        jsonify(user.to_dict()),
        200
    )
    return response

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
    
    
<<<<<<< HEAD
    if request.method == "PATCH":
        for field in request.json:
            try:
                setattr(character, field, request.json.get(field))
            except:
                error = {
                    "error": "Error During Character Editing: Likely Invalid Data Type"
                }
                response = make_response(
                    jsonify(error), 
                    400
                )
                return response
        
        db.session.commit()

        response = make_response(
            jsonify(character.to_dict()),
            200
        )

        return response
            
    # DELETE FUNCTIONALITY

    elif request.method == "DELETE":
        for comment in character.comments:
            db.session.delete(comment)
        db.session.delete(character)
        db.session.commit()
        response = make_response(
            jsonify({"success": "Character Deleted Successfully"})
        )

        return response
    
    # GET FUNCTIONALITY

    elif request.method == "GET":
        response = make_response(
            jsonify(character.to_dict()),
            200
        )
        return response
=======

    response = make_response(
        jsonify(character.to_dict()),
        200
    )
    return response
>>>>>>> origin/main

@app.route("/comment/<int:id>", methods=["GET", "DELETE"])
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

    if request.method == "GET":
        response = make_response(
            jsonify(comment.to_dict()),
            200
        )
        return response
    
    elif request.method == "DELETE":
        db.session.delete(comment)
        db.session.commit()

<<<<<<< HEAD
        response = make_response(
            jsonify({"success": "Comment Deleted Successfully"})
        )

        return response

@app.route("/character/<int:id>/new_comment", methods=["POST"])
def new_comment(id):
    if request.method == "POST":

        comment_body = request.json.get("contents")
        current_user_id = session["user_token"]
        current_user = User.query.filter(User.id == current_user_id).first()
        current_character = Character.query.filter(Character.id == id).first()
        if not current_user:
            response = make_response(
                jsonify({
                    "error": "401: User Not Signed In"
                }),
                401
            )

            return response
        
        elif not current_character:
            response = make_response(
                jsonify({
                    "error": "400: Comment Must Be Attached To A Character"
                }),
                400
            )

            return response
        
        if len(comment_body) > 0: # this way you can't submit blank comments
            new_comment = Comment(user=current_user, character=current_character, contents=comment_body)
            db.session.add(new_comment)
            db.session.commit()

            response = make_response(
                jsonify(new_comment.to_dict()),
                201
            )

            return response

        else:
            response = make_response(
                jsonify({
                    "error": "400: Comment Must Contain At Least One Character"
                }),
                400
            )
            return response
        
@app.route("/character/new", methods=["POST"])
def new_character():
    if request.method == "POST":
        data = request.json
        current_user_id = session["user_token"]
        current_user = User.query.filter(User.id == current_user_id).first()

        name = data.get("name")
        age = data.get("age")
        race = data.get("race")
        gender = data.get("gender")
        bio_1 = data.get("bio_1")
        bio_2 = data.get("bio_2")
        image_1 = data.get("image_1")
        image_2 = data.get("image_2")

        new_character = Character(
            user=current_user,
            name=name,
            age=age,
            race=race,
            gender=gender,
            bio_1=bio_1,
            bio_2=bio_2,
            image_1=image_1,
            image_2=image_2
        )

        if not new_character:
            response = make_response(
                jsonify({
                    "error": "Error During Character Creation"
                }),
                400
            )
            return response

        db.session.add(new_character)
        db.session.commit()

        response = make_response(
            jsonify(new_character.to_dict()),
            201
        )

        return response
=======

>>>>>>> origin/main

if __name__ == '__main__':
    app.run(port=5555, debug=True)


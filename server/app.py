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

@app.route("/log_in", methods=["GET"])
def log_in():
    # simple code: This takes in data from a Formik form, that being a username and a password.
    # it then checks the database to see if there's a user with both that username and that password.
    # if there's a match, it logs the user in and assigns their session a cookie which says which user they're logged in as
    # if there isn't a match, it doesn't do this

    log_in_data = request.get_json()
    username = log_in_data.get("username")
    password = log_in_data.get("password") # still need to implement password hashing and such

    user = User.query.filter(User.username == username and User.password == password).first()

    if not user:
        response = make_response(
            jsonify({"error": "Invalid Username or Password"}),
            404
        )

        return response

    session["user_token"] = user.id

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

    new_user_object = User(username=username, password=password, profile_image=profile_image)

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

@app.route("/user/<int:id>")
def user_by_id(id):
    user = User.query.filter(User.id == id).first()

    if not user:
        response = make_response(
            jsonify({
                "error": "404: User Not Found"
            }),
            404
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



if __name__ == '__main__':
    app.run(port=5555, debug=True)


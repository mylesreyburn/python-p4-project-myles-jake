#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api

# Local imports

from models import User, Character, Comment

# Views go here!

@app.route("/log_in")
def log_in():
    # simple code: This takes in data from a Formik form, that being a username and a password.
    # it then checks the database to see if there's a user with both that username and that password.
    # if there's a match, it logs the user in and assigns their session a cookie which says which user they're logged in as
    # if there isn't a match, it doesn't do this
    pass

@app.route("/sign_up", methods = ["POST"])
def sign_up():
    # even simpler code:
    # takes in a form with a username and a password
    # creates a brand new User object if the username is not already in use
    # slaps a user cookie on the session and everything's hunky dory


    pass

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

@app.route("/character/<int:id>")
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


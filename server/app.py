#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api

# Local imports

from models import User, Character, Comment

# Views go here!

# @app.route("/all_data")
# def all_characters():
#     all_chars = Character.query.all()
#     all_users = User.query.all()
#     all_comments = Comment.query.all()

#     chars_json = all_chars.to_dict()
#     users_json = all_users.to_dict()
#     comments_json = all_comments.to_dict()

#     all_data = {
#         "users" : users_json,
#         "characters" : chars_json,
#         "comments" : comments_json
#     }

#     response = make_response(
#         jsonify(all_data), 200
#     )

#     return response

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

if __name__ == '__main__':
    app.run(port=5555, debug=True)


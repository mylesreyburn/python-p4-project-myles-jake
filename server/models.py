from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

def same_as(column_name):
    def default_function(context):
        return context.current_parameters.get(column_name)
    return default_function

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_only = ("id", "username", "display_name", "password", "profile_image", "characters")

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    username = db.Column(db.String, unique=True) # No duplicates, but we'll address that in the app itself. Generated when the account is first made.
    display_name = db.Column(db.String, unique=True, default=same_as("username")) # The actual name that appears on the website. Duplicates are allowed. Set to be the same as the username when the account is created.
    password = db.Column(db.String)
    # _password_hash = db.Column(db.String, nullable=False) # Passwords will be stored as hashes, just so you know
    profile_image = db.Column(db.String) # We'll have these be URLs, then we'll somehow plug those into React to get the pictures going

    characters = db.relationship("Character", backref="user")
    comments = db.relationship("Comment", backref="user")

    # @hybrid_property
    # def password_hash(self):
    #     return self._password_hash

    # @password_hash.setter
    # def password_hash(self, password):
    #     # utf-8 encoding and decoding is required in python 3
    #     password_hash = bcrypt.generate_password_hash(
    #         password.encode('utf-8'))
    #     self._password_hash = password_hash.decode('utf-8')

    # def authenticate(self, password):
    #     return bcrypt.check_password_hash(
    #         self._password_hash, password.encode('utf-8'))


class Character(db.Model, SerializerMixin):
    __tablename__ = "characters"

    serialize_rules = ("-user", "-comments.character", "-comments.user")

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    name = db.Column(db.String)
    age = db.Column(db.Integer)
    race = db.Column(db.String)
    gender = db.Column(db.String)
    bio_1 = db.Column(db.String)
    bio_2 = db.Column(db.String)
    image_1 = db.Column(db.String)
    image_2 = db.Column(db.String)

    comments = db.relationship("Comment", backref="character")


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    serialize_rules = ("-character", "-user.comments", "-user.characters.comments")

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    contents = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))

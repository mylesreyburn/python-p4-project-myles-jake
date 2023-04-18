from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    username = db.Column(db.String) # No duplicates, but we'll address that in the app itself. Generated when the account is first made.
    display_name = db.Column(db.String) # The actual name that appears on the website. Duplicates are allowed. Set to be the same as the username when the account is created.
    password = db.Column(db.String) # Passwords will be stored as hashes, just so you know
    profile_image = db.Column(db.String) # We'll have these be URLs, then we'll somehow plug those into React to get the pictures going

    characters = db.relationship("Character", backref="user")
    comments = db.relationship("Comment", backref="user")


class Character(db.Model, SerializerMixin):
    __tablename__ = "characters"

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

    rating = db.Column(db.Integer) # Upvote/downvote button simply 

    comments = db.relationship("Comment", backref="character")


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    contents = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))

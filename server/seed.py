#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Character

profile_pics = [
    "https://cdn.discordapp.com/attachments/661313314671951903/1097718301129461802/z7hdph4gha451.jpg",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097717923642085397/vv50i49jn6z41.png",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097717452311380058/EafcoSWWAAAUSl1.jpg",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097717152913559652/EafeACUWoAAkHLR.jpg"
]

character_pics = [
    "https://cdn.discordapp.com/attachments/661313314671951903/1097717015134871613/Eafc8QQXsAEW5lH.jpg",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097716847173976175/Eah4TVIXQAAZ_p3.jpg",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097716753104117830/EafdFKUXgAUEf_P.png",
    "https://cdn.discordapp.com/attachments/661313314671951903/1097716680475558010/Eaf9msLVcAAA3NB.jpg"
]

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Starting seed...")

        User.query.delete()
        Character.query.delete()
        Comment.query.delete()

        users = []
        for i in range(10):
            name = fake.name()
            password = "teluge"
            user = User(username=name, password_hash=password, profile_image=rc(profile_pics))
            users.append(user)
        
        db.session.add_all(users)

        characters = []
        for i in range(20):
            character = Character(
                user=rc(users),
                name=fake.name(),
                age=randint(1,100),
                race=rc(["human", "elf", "gnome", "dwarf", "orc", "frog"]),
                gender=rc(["male", "female", "non-binary"]),
                bio_1=f"Bio 1: {fake.paragraph(nb_sentences=5)}",
                bio_2=f"Bio 2: {fake.paragraph(nb_sentences=5)}",
                image_1=rc(character_pics),
                image_2=rc(character_pics)
            )
            characters.append(character)

        db.session.add_all(characters)

        comments = []

        for i in range(40):
            comment = Comment(
                user=rc(users),
                character=rc(characters),
                contents=fake.catch_phrase()
            )
            comments.append(comment)

        db.session.add_all(comments)
        db.session.commit()

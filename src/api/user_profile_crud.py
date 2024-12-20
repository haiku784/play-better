from sqlalchemy.orm import Session
from .models import UserProfile

class UserProfileCRUD:
    @staticmethod
    def create_user_profile(db: Session, username: str, email: str, full_name: str, bio: str):
        new_user = UserProfile(username=username, email=email, full_name=full_name, bio=bio)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def get_user_profile(db: Session, user_id: int):
        return db.query(UserProfile).filter(UserProfile.id == user_id).first()

    @staticmethod
    def get_user_profiles(db: Session):
        return db.query(UserProfile).all()  

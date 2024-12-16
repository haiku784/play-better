from sqlalchemy.orm import Session
from models import UserPreference

class UserPreferenceCRUD:
    @staticmethod
    def create_user_preference(db: Session, user_id: int, gear_type: str, preference_level: int):
        user_preference = UserPreference(user_id=user_id, gear_type=gear_type, preference_level=preference_level)
        db.add(user_preference)
        db.commit()
        db.refresh(user_preference)
        return user_preference

    @staticmethod
    def get_user_preferences(db: Session, user_id: int):
        return db.query(UserPreference).filter(UserPreference.user_id == user_id).all()
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy.exc import IntegrityError
import datetime

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class SharingPermission(Base):
    __tablename__ = "sharing_permissions"

    permission_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    shared_with_user_id = Column(Integer)
    record_id = Column(Integer)
    permission_type = Column(String)
    date_shared = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")  # Assuming User model exists

# Pydantic Schemas
class SharingPermissionCreate(BaseModel):
    user_id: int
    shared_with_user_id: int
    record_id: int
    permission_type: str

class SharingPermissionResponse(BaseModel):
    permission_id: int
    user_id: int
    shared_with_user_id: int
    record_id: int
    permission_type: str
    date_shared: datetime.datetime

    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Routes
@app.post("/permissions/", response_model=SharingPermissionResponse)
async def create_sharing_permission(permission: SharingPermissionCreate, db: Session = Depends(get_db)):
    db_permission = SharingPermission(**permission.dict())
    db.add(db_permission)
    try:
        db.commit()
        db.refresh(db_permission)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Sharing permission already exists")
    return db_permission

@app.get("/permissions/{permission_id}/", response_model=SharingPermissionResponse)
async def read_sharing_permission(permission_id: int, db: Session = Depends(get_db)):
    db_permission = db.query(SharingPermission).filter(SharingPermission.permission_id == permission_id).first()
    if db_permission is None:
        raise HTTPException(status_code=404, detail="Sharing permission not found")
    return db_permission

@app.delete("/permissions/{permission_id}/")
async def delete_sharing_permission(permission_id: int, db: Session = Depends(get_db)):
    db_permission = db.query(SharingPermission).filter(SharingPermission.permission_id == permission_id).first()
    if db_permission is None:
        raise HTTPException(status_code=404, detail="Sharing permission not found")
    db.delete(db_permission)
    db.commit()
    return {"detail": "Sharing permission deleted"}

# Main entry point
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy.exc import IntegrityError

# Database setup
DATABASE_URL = "postgresql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class HealthPlan(Base):
    __tablename__ = "health_plans"
    plan_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    recommendations = Column(String)
    user_id = Column(Integer, ForeignKey('users.user_id'))

    user = relationship("User")

# Pydantic Schemas
class HealthPlanCreate(BaseModel):
    name: str
    description: str
    recommendations: str
    user_id: int

class HealthPlanResponse(BaseModel):
    plan_id: int
    name: str
    description: str
    recommendations: str
    user_id: int

    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Routes
@app.post("/health_plans/", response_model=HealthPlanResponse)
def create_health_plan(plan: HealthPlanCreate, db: Session = Depends(get_db)):
    db_plan = HealthPlan(**plan.dict())
    db.add(db_plan)
    try:
        db.commit()
        db.refresh(db_plan)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User ID does not exist")
    return db_plan

@app.get("/health_plans/{plan_id}", response_model=HealthPlanResponse)
def read_health_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(HealthPlan).filter(HealthPlan.plan_id == plan_id).first()
    if plan is None:
        raise HTTPException(status_code=404, detail="Health Plan not found")
    return plan

@app.put("/health_plans/{plan_id}", response_model=HealthPlanResponse)
def update_health_plan(plan_id: int, plan: HealthPlanCreate, db: Session = Depends(get_db)):
    db_plan = db.query(HealthPlan).filter(HealthPlan.plan_id == plan_id).first()
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Health Plan not found")
    for key, value in plan.dict().items():
        setattr(db_plan, key, value)
    db.commit()
    db.refresh(db_plan)
    return db_plan

@app.delete("/health_plans/{plan_id}")
def delete_health_plan(plan_id: int, db: Session = Depends(get_db)):
    db_plan = db.query(HealthPlan).filter(HealthPlan.plan_id == plan_id).first()
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Health Plan not found")
    db.delete(db_plan)
    db.commit()
    return {"detail": "Health Plan deleted successfully"}

# Run the application with: uvicorn filename:app --reload

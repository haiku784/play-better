from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session

# Database configuration
DATABASE_URL = "postgresql://user:password@localhost/dbname"

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class ExternalSystemIntegration(Base):
    __tablename__ = "external_system_integrations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    api_url = Column(String)
    api_key = Column(String)

    def __repr__(self):
        return f"<ExternalSystemIntegration(name={self.name}, api_url={self.api_url})>"

# Create the database tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD operations
@app.post("/integrations/", response_model=ExternalSystemIntegration)
def create_integration(integration: ExternalSystemIntegration, db: Session = Depends(get_db)):
    db.add(integration)
    db.commit()
    db.refresh(integration)
    return integration

@app.get("/integrations/{integration_id}", response_model=ExternalSystemIntegration)
def read_integration(integration_id: int, db: Session = Depends(get_db)):
    integration = db.query(ExternalSystemIntegration).filter(ExternalSystemIntegration.id == integration_id).first()
    if integration is None:
        raise HTTPException(status_code=404, detail="Integration not found")
    return integration

@app.put("/integrations/{integration_id}", response_model=ExternalSystemIntegration)
def update_integration(integration_id: int, integration: ExternalSystemIntegration, db: Session = Depends(get_db)):
    db_integration = db.query(ExternalSystemIntegration).filter(ExternalSystemIntegration.id == integration_id).first()
    if db_integration is None:
        raise HTTPException(status_code=404, detail="Integration not found")
    db_integration.name = integration.name
    db_integration.api_url = integration.api_url
    db_integration.api_key = integration.api_key
    db.commit()
    db.refresh(db_integration)
    return db_integration

@app.delete("/integrations/{integration_id}")
def delete_integration(integration_id: int, db: Session = Depends(get_db)):
    db_integration = db.query(ExternalSystemIntegration).filter(ExternalSystemIntegration.id == integration_id).first()
    if db_integration is None:
        raise HTTPException(status_code=404, detail="Integration not found")
    db.delete(db_integration)
    db.commit()
    return {"detail": "Integration deleted successfully"}

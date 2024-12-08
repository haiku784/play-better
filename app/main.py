from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

@app.on_event('startup')
async def startup():
    # Add any startup procedures if needed
    pass

@app.on_event('shutdown')
async def shutdown():
    # Cleanup resources if needed
    pass


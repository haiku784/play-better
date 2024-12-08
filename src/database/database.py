import databases
import sqlalchemy

# Database URL
DATABASE_URL = "sqlite:///./test.db"

# Database connection
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
import os
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import event

# SQLite database file inside the backend folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATABASE_PATH = os.path.join(BASE_DIR, "bloom.db")
DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

connect_args = {"check_same_thread": False}
engine = create_engine(DATABASE_URL, connect_args=connect_args)

# Enforce foreign key constraints in SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

def create_db_and_tables():
    # Import schemas to ensure they are registered on SQLModel.metadata
    from app.models.schemas import Student, Teacher, Concept, StudentConceptMastery, StudentSession, DoubtLog
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

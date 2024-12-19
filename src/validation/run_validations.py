from validate_schema import validate_schema
from validate_retention_policy import validate_retention_policy

# Function to run all validations
def run_validations():
    uri = "mongodb://localhost:27017/"
    client = connect_to_mongo(uri)
    db = client['my_database']

    expected_schema = {
        'name': str,
        'age': int,
        'email': str
    }
    retention_period_days = 30

    # Run schema validation
    print("Running schema validation...")
    validate_schema(db, 'my_collection', expected_schema)

    # Run retention policy validation
    print("Running retention policy validation...")
    validate_retention_policy(db, 'my_collection', retention_period_days)

if __name__ == '__main__':
    run_validations()
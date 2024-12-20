import pymongo

class MongoDBSecurityAudit:
    def __init__(self, uri):
        """Initialize the MongoDB client and connect to the specified URI."""
        self.client = pymongo.MongoClient(uri)
        self.db = self.client.get_default_database()  # Get the default database

    def check_encryption(self):
        """Check if encryption is enabled for the MongoDB database."""
        encryption_enabled = self.client.admin.command('getParameter', 'enableEncryption')
        return encryption_enabled.get('enableEncryption', False)

    def verify_sensitive_data_exposure(self):
        """Check for sensitive data exposure based on collection names and document fields."""
        collections = self.db.list_collection_names()
        sensitive_keywords = ['password', 'ssn', 'email', 'credit_card']
        exposed_data = {col: [] for col in collections}
        
        for collection in collections:
            documents = self.db[collection].find()
            for document in documents:
                for key in sensitive_keywords:
                    if key in document:
                        exposed_data[collection].append(key)
        return exposed_data

    def audit_security(self):
        """Conduct a full security audit for the MongoDB database."""
        encryption_status = self.check_encryption()
        exposure_report = self.verify_sensitive_data_exposure()

        return {
            'encryption_enabled': encryption_status,
            'sensitive_data_exposure': exposure_report
        }

# Example usage:
# uri = 'mongodb://username:password@host:port'
# audit = MongoDBSecurityAudit(uri)
# report = audit.audit_security()
# print(report) 

import unittest
from src.api.security.mongodb_security_audit import MongoDBSecurityAudit

class TestMongoDBSecurityAudit(unittest.TestCase):
    def setUp(self):
        """Set up for the tests, initializing the security audit with a mock URI."""
        self.audit = MongoDBSecurityAudit('mongodb://test_user:test_pass@localhost:27017/test_db')

    def test_check_encryption(self):
        """Test that the encryption check returns a boolean value."""
        result = self.audit.check_encryption()
        self.assertIsInstance(result, bool)

    def test_verify_sensitive_data_exposure(self):
        """Test that the sensitive data exposure check returns expected data structure."""
        result = self.audit.verify_sensitive_data_exposure()
        self.assertIsInstance(result, dict)
        self.assertTrue(all(isinstance(v, list) for v in result.values()))

    def test_audit_security(self):
        """Test that the audit_security method returns the expected structure."""
        result = self.audit.audit_security()
        self.assertIn('encryption_enabled', result)
        self.assertIn('sensitive_data_exposure', result)

if __name__ == '__main__':
    unittest.main()
import re

class SensitiveDataValidator:
    def __init__(self, data):
        self.data = data

    def validate_email(self):
        # Checking the validity of the email format
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+".[a-zA-Z]{2,}$'
        if re.match(email_pattern, self.data.get('email', '')):
            return True
        return False

    def validate_phone(self):
        # Checking the validity of the phone number format
        phone_pattern = r'^(\+\d{1,3}[- ]?)?\d{10}$'
        if re.match(phone_pattern, self.data.get('phone', '')):
            return True
        return False

    def validate_ssn(self):
        # Validating the format of Social Security Number (SSN)
        ssn_pattern = r'^\d{3}-\d{2}-\d{4}$'
        if re.match(ssn_pattern, self.data.get('ssn', '')):
            return True
        return False

    def validate(self):
        # Validating all sensitive data fields
        validations = {
            'email': self.validate_email(),
            'phone': self.validate_phone(),
            'ssn': self.validate_ssn()
        }
        return validations

# Example Usage
if __name__ == '__main__':
    data = {
        'email': 'example@example.com',
        'phone': '+1234567890',
        'ssn': '123-45-6789'
    }
    validator = SensitiveDataValidator(data)
    validation_results = validator.validate()
    print(validation_results)  # Output the validation results
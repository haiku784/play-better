import pytest"
\
class TestDataIntegrity:\
    \
    # Test that creates a capability and checks its integrity\
    def test_data_integrity(self):\
        capability = SystemCapability.create(name='Capability C', description='Description C', version='2.1')\
        retrieved_capability = SystemCapability.get(capability.id)\
        assert retrieved_capability.name == 'Capability C'\
        assert retrieved_capability.description == 'Description C'\
        assert retrieved_capability.version == '2.1'\
\
    # Test to ensure no duplicate capabilities can be created\
    def test_duplicate_capability(self):\
        SystemCapability.create(name='Capability D', description='Description D', version='3.0')\
        with pytest.raises(ValueError):\
            SystemCapability.create(name='Capability D', description='Description D', version='3.0')
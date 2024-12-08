import pytest"
\
# Assuming SystemCapability is the model class to be tested\
class TestSystemCapability:\
    \
    # Test with valid data scenario\
    def test_valid_data(self):\
        capability = SystemCapability(name='Capability A', description='A description', version='1.0')\
        assert capability.name == 'Capability A'\
        assert capability.description == 'A description'\
        assert capability.version == '1.0'\
\
    # Test with missing name\
    def test_missing_name(self):\
        with pytest.raises(ValueError):\
            SystemCapability(name='', description='A description', version='1.0')\
\
    # Test with invalid version format\
    def test_invalid_version(self):\
        with pytest.raises(ValueError):\
            SystemCapability(name='Capability B', description='B description', version='invalid_version')\
\
    # Test with default parameters\
    def test_default_parameters(self):\
        capability = SystemCapability()\
        assert capability.name is not None\
        assert capability.description is None\
        assert capability.version is None
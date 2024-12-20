import pytest
from src.api.validators.video_metadata_validator import VideoMetadataValidator

# Test case for valid metadata

def test_valid_metadata():
    valid_data = {"description": "A test video", "tags": ["test", "video"]}
    validator = VideoMetadataValidator(**valid_data)
    assert validator.description == "A test video"
    assert validator.tags == ["test", "video"]

# Test case for missing description

def test_missing_description():
    with pytest.raises(ValueError, match="Field required"):  # Adjust message as per implementation
        VideoMetadataValidator(tags=["test", "video"])

# Test case for invalid tags type

def test_invalid_tags_type():
    with pytest.raises(ValueError, match="list expected"):  # Adjust message as per implementation
        VideoMetadataValidator(description="A test video", tags="test")

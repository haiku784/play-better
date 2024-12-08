# Configuration settings for resource allocation strategy
RESOURCE_LIMIT = 10
MIN_ALLOCATION = 1
MAX_ALLOCATION = 5

# A simple function to validate resource requests
def validate_allocation(amount):
    if amount < MIN_ALLOCATION or amount > MAX_ALLOCATION:
        raise ValueError('Allocation amount must be between {} and {}.'.format(MIN_ALLOCATION, MAX_ALLOCATION))

# Example function to allocate resources safely
def safe_allocate(allocator, resource_id, amount):
    validate_allocation(amount)
    return allocator.allocate_resource(resource_id, amount)

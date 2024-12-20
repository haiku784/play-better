import time
from bulk_write_operations import BulkWriteOperations

class PerformanceTest:
    def __init__(self):
        self.bulk_operations = BulkWriteOperations('test_db', 'performance_test')

    def test_bulk_write_performance(self):
        # Prepare a large number of records for performance testing
        records = [{'_id': i, 'name': f'Test{i}'} for i in range(1000)]
        start_time = time.time()
        self.bulk_operations.bulk_insert(records)
        end_time = time.time()
        duration = end_time - start_time
        print(f'Bulk write completed in {duration * 1000:.2f} ms')

        # Check if the operation completed within the acceptable time
        assert duration < 0.2, "Performance test failed: Time exceeded 200ms"

if __name__ == '__main__':
    performance_test = PerformanceTest()
    performance_test.test_bulk_write_performance()
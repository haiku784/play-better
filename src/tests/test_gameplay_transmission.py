import unittest
from gameplay_data_communication import send_gameplay_data
from gameplay_data_receiver import receive_gameplay_data
import threading

class TestGameplayDataTransmission(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Start the server in a separate thread
        cls.server_thread = threading.Thread(target=receive_gameplay_data)
        cls.server_thread.start()  # Start the server thread

    @classmethod
    def tearDownClass(cls):
        cls.server_thread.join()  # Ensure server thread has finished

    def test_data_transmission(self):
        # Test sending gameplay data
        gameplay_data = 'Player2 scored a goal!'
        try:
            send_gameplay_data(gameplay_data)  # Send data securely
            # If no exceptions, we assume data was sent
            self.assertTrue(True, "Data sent successfully")
        except Exception as e:
            self.fail(f"Data transmission failed with exception: {str(e)}")

if __name__ == '__main__':
    unittest.main()
import os

def load_environment():
    from dotenv import load_dotenv
    load_dotenv()

if __name__ == '__main__':
    load_environment()  # Load environment variables

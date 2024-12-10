# This file contains the setup instructions for the FastAPI backend

# Setting up FastAPI on different operating systems

# 1. Prerequisites
# Before setting up FastAPI, ensure you have Python 3.6 or newer installed.
# You can download Python from https://www.python.org/downloads/

# 2. Installation Instructions:

# Windows
# To set up FastAPI on Windows, follow these steps:
# a. Open Command Prompt
# b. Create a virtual environment:
#    python -m venv myenv
# c. Activate the virtual environment:
#    myenv"Scripts\activate
# d. Install FastAPI and an ASGI server (like uvicorn):
#    pip install fastapi uvicorn

# 3. Running the app:
# To run the FastAPI application, use the following command:
#    uvicorn main:app --reload

# macOS
# To set up FastAPI on macOS, follow these steps:
# a. Open Terminal
# b. Create a virtual environment:
#    python3 -m venv myenv
# c. Activate the virtual environment:
#    source myenv/bin/activate
# d. Install FastAPI and an ASGI server (like uvicorn):
#    pip install fastapi uvicorn

# 4. Running the app:
# To run the FastAPI application, use the following command:
#    uvicorn main:app --reload

# Linux
# To set up FastAPI on Linux, follow these steps:
# a. Open Terminal
# b. Create a virtual environment:
#    python3 -m venv myenv
# c. Activate the virtual environment:
#    source myenv/bin/activate
# d. Install FastAPI and an ASGI server (like uvicorn):
#    pip install fastapi uvicorn

# 5. Running the app:
# To run the FastAPI application, use the following command:
#    uvicorn main:app --reload

# 6. Accessing the API
# After the server starts, you can access the API at:
# http://127.0.0.1:8000/docs for the interactive API documentation.
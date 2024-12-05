# Use the official Python image as a base
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the local code to the container
COPY . /app

# Install required packages
RUN pip install -r requirements.txt

# Expose the API port
EXPOSE 5000

# Command to run the app
CMD [ 'python', 'api.py' ]
import os

# Function to create the directory structure for e-sport titles

def create_esport_folder_structure(base_path, titles):
    """Creates a directory structure for each e-sport title provided."""
    for title in titles:
        # Create main title directory
        title_path = os.path.join(base_path, title)
        os.makedirs(title_path, exist_ok=True)
        
        # Create subdirectories for each title
        os.makedirs(os.path.join(title_path, 'matches'), exist_ok=True)  # Matches directory
        os.makedirs(os.path.join(title_path, 'teams'), exist_ok=True)      # Teams directory
        os.makedirs(os.path.join(title_path, 'players'), exist_ok=True)    # Players directory
        os.makedirs(os.path.join(title_path, 'tournaments'), exist_ok=True) # Tournaments directory
        os.makedirs(os.path.join(title_path, 'statistics'), exist_ok=True)   # Statistics directory
        
        print(f'Directory structure created for {title}')

# Base path for storing e-sport titles
base_path = 'esports'

# List of e-sport titles to create folders for
titles = ['League of Legends', 'Dota 2', 'Counter-Strike', 'Overwatch']

# Create the directory structure
create_esport_folder_structure(base_path, titles)
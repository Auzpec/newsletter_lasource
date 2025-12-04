import webbrowser
import os

# Get the current directory
current_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the path to Index.html
file_path = os.path.join(current_directory, '..', 'Index.html')

# Open the HTML file in the default web browser
webbrowser.open('file://' + os.path.realpath(file_path))
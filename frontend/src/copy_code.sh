#!/bin/bash

# This works for React.js projects currently
# Put this in your root folder of your project
# run the command chmod +x get_code_context.sh
# then run ./get_code_context.sh

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context1.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of directories to look for
directories=("src" "public" "config" "hooks" "constants" "services" "types" "routes" "App" "redux" "pages" "helpers" "components" "server" "models" "config" "middleware" "apis")

# List of file types to ignore
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg" "*.mp4" "*.mp3" "*.wav" "*.ogg")

# Function to check if a file should be ignored
should_ignore_file() {
  local file="$1"
  for ignore_pattern in "${ignore_files[@]}"; do
    if [[ "$file" == $ignore_pattern ]]; then
      return 0
    fi
  done
  return 1
}

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*; do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      if ! should_ignore_file "$entry"; then
        relative_path=${entry#"$project_dir/"}
        echo "// File: $relative_path" >> "$output_file"
        cat "$entry" >> "$output_file"
        echo "" >> "$output_file"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    echo "Reading directory: ${project_dir}/${dir}"
    read_files "${project_dir}/${dir}"
  else
    echo "Directory not found: ${project_dir}/${dir}"
  fi
done

echo "Script completed. Output written to ${output_file}"
import json
import re

# File paths
input_file = "/Users/sofka/Documents/sofka-website/scripts/content.json"
output_file = "/Users/sofka/Documents/sofka-website/scripts/cleaned_content_by_script.json"

def clean_json_content(content):
    cleaned_content = {}
    for key, value in content.items():
        # Remove JavaScript references, file paths, and metadata
        value = re.sub(r'\".*?node_modules.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?staticchunks.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?app-client.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?ecmascript.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?default.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?MetadataBoundary.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?ViewportBoundary.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?AsyncMetadata.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?ClientPageRoot.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?ClientSegmentRoot.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?HTTPAccessFallbackBoundary.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?fontwoff2.*?\"', '', value, flags=re.DOTALL)
        value = re.sub(r'\".*?preload.*?\"', '', value, flags=re.DOTALL)

        # Remove HTML tags if any
        value = re.sub(r'<[^>]+>', '', value)

        # Remove special characters or unnecessary symbols
        value = re.sub(r'[^\w\s.,!?\'"-]', '', value)

        # Replace newline escape sequences and clean up
        value = re.sub(r'\\n', ' ', value)  # Replace newline escape sequences
        value = re.sub(r'\\\"', '"', value)  # Replace escaped quotes
        value = re.sub(r'\\', '', value)  # Remove any remaining backslashes

        # Replace multiple spaces with a single space
        value = re.sub(r'\s+', ' ', value)

        # Strip leading/trailing whitespace
        cleaned_content[key] = value.strip()
    return cleaned_content

def main():
    try:
        # Read the input JSON file
        with open(input_file, "r") as file:
            data = json.load(file)
        
        print("*******************Original JSON content:")
        print(data)  
        
        # Debug: Print the cleaned content
        # Clean the JSON content
        cleaned_data = clean_json_content(data)

        print("Cleaned JSON content:")
        print(cleaned_data)  # Debug: Print the cleaned content
        
        # Write the cleaned content to a new file
        with open(output_file, "w") as file:
            json.dump(cleaned_data, file, indent=4)
        
        print(f"Cleaned JSON content has been saved to {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
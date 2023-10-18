import os
import shutil
import json
import urllib.parse  # Needed for decoding URL-encoded characters

# Define the main directory and CDN directory paths
main_directory = "petpors.com/"  # Replace with your actual path.
cdn_directory = "cdn/"    # Replace with your actual path.

# Ensure cdn directory exists
if not os.path.exists(cdn_directory):
    os.makedirs(cdn_directory)

# A counter for renaming images
img_counter = 1

# Logs to capture the actions taken
logs = []

# Load the JSON data
with open("Extracted_v4.json", "r", encoding="utf-8") as file:
    extracted_data = json.load(file)

# Looping through the JSON entries to modify image paths
for entry in extracted_data:
    # Processing header_picture_url
    header_img = entry.get("header_picture_url", "")
    if header_img:
        # Decoding any URL-encoded characters
        header_img = urllib.parse.unquote(header_img)
        original_path = os.path.join(main_directory, header_img)
        new_name = f"{img_counter}.jpg"
        new_path = os.path.join(cdn_directory, new_name)
        if os.path.exists(original_path):
            shutil.copy2(original_path, new_path)
            logs.append(f"Copied {original_path} to {new_path}")
            entry["header_picture_url"] = f"cdn/{new_name}"  # Updating the path in JSON
            img_counter += 1

    # Processing body images
    for section in entry.get("body", []):
        for content in section.get("body", []):
            if content.get("type") == "figure":
                for x in content.get("body" , []):
                    if x["type"] == "image":
                        img_src = urllib.parse.unquote(x["content"])  # Decoding URL-encoded characters
                        original_path = os.path.join(main_directory, img_src)
                        new_name = f"{img_counter}.jpg"
                        new_path = os.path.join(cdn_directory, new_name)
                        if os.path.exists(original_path):
                            shutil.copy2(original_path, new_path)
                            logs.append(f"Copied {original_path} to {new_path}")
                            x["content"] = f"cdn/{new_name}"  # Updating the path in JSON
                            img_counter += 1
            if content["type"] == "image":
                img_src = urllib.parse.unquote(content["content"])  # Decoding URL-encoded characters
                original_path = os.path.join(main_directory, img_src)
                new_name = f"{img_counter}.jpg"
                new_path = os.path.join(cdn_directory, new_name)
                if os.path.exists(original_path):
                    shutil.copy2(original_path, new_path)
                    logs.append(f"Copied {original_path} to {new_path}")
                    content["content"] = f"cdn/{new_name}"  # Updating the path in JSON
                    img_counter += 1

# Save the updated JSON
with open("ExtractedFixImg_v1.json", "w", encoding="utf-8") as file:
    json.dump(extracted_data, file, ensure_ascii=False, indent=4)

# Print logs or save them to a file for inspection
for log in logs:
    print(log)

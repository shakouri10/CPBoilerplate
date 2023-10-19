import os
import json
from PIL import Image
from pytesseract import image_to_string

def check_image_for_text(img_path):
    """Check if the image contains text using pytesseract"""
    try:
        img = Image.open(img_path)
        text = image_to_string(img, lang='eng')
        return len(text.strip()) > 0
    except Exception as e:
        print(f"Error processing image {img_path}: {e}")
        return False

# Define the CDN directory path
cdn_directory = "cdn/"

# Load the JSON data
with open("ExtractedFixImg_v1.json", "r", encoding="utf-8") as file:
    extracted_data = json.load(file)

# List to track images to remove from JSON
images_to_remove = []

# Check each image in the CDN directory
for image_file in os.listdir(cdn_directory):
    img_path = os.path.join(cdn_directory, image_file)
    if check_image_for_text(img_path):
        print(f"Removing image {img_path} as it contains text.")
        os.remove(img_path)
        images_to_remove.append(f"cdn/{image_file}")

# Remove the corresponding entries from JSON
for entry in extracted_data:
    if entry.get("header_picture_url", "") in images_to_remove:
        entry["header_picture_url"] = ""
    for section in entry.get("body", []):
        for content in section.get("body", []):
            if content.get("type") == "image" and content.get("content") in images_to_remove:
                section["body"].remove(content)
            if content.get("type") == "figure":
                for x in content.get("body", []):
                    if x["type"] == "image" and x["content"] in images_to_remove:
                        content["body"].remove(x)

# Save the updated JSON
with open("ExtractedFixImg_v2.json", "w", encoding="utf-8") as file:
    json.dump(extracted_data, file, ensure_ascii=False, indent=4)

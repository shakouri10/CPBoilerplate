import os
import easyocr
import json

cdn_directory = "cdn/"
reader = easyocr.Reader(['fa'])  # Initialize with Farsi (fa) language

# List of images to delete
images_to_delete = []

# Iterate over images in CDN
for img_file in os.listdir(cdn_directory):
    img_path = os.path.join(cdn_directory, img_file)
    try:
        result = reader.readtext(img_path)
        # If text is detected, add to the deletion list
        if result:
            images_to_delete.append(img_file)
    except Exception as e:
        print(f"Error processing image {img_path}: {e}")

# Now, you can remove images from the CDN directory and from the JSON
for img in images_to_delete:
    os.remove(os.path.join(cdn_directory, img))

# Removing from JSON
with open("ExtractedFixImg.json", "r", encoding="utf-8") as file:
    data = json.load(file)

for entry in data:
    if entry.get("header_picture_url", "").split("/")[-1] in images_to_delete:
        entry["header_picture_url"] = ""

    for section in entry.get("body", []):
        for content in section.get("body", []):
            if content.get("type") in ["figure", "image"]:
                if content["content"].split("/")[-1] in images_to_delete:
                    content["content"] = ""

# Save the updated JSON
with open("ExtractedFixImg.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

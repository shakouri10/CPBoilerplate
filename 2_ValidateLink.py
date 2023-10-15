import re
import requests
from urllib.parse import urlparse, urlunparse

# Functions for validation
def is_valid_url(url):
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def is_unwanted_page(url):
    # Patterns indicating unwanted pages (comment, tag, telephone links, etc.)
    unwanted_patterns = [
        re.compile(r'.*/comment-page-.*'),
        re.compile(r'.*/tag/.*'),
        re.compile(r'.*/page/\d+/.*'),
        re.compile(r'.*tel:.*')
    ]
    return any(re.search(pattern, url) for pattern in unwanted_patterns)

def normalize_url(url):
    parts = urlparse(url)
    return urlunparse((parts.scheme, parts.netloc, parts.path, "", "", ""))

# Validate and save links with exclusion keywords
def validate_links_exclusion(input_file, output_file, exclusion_keywords):
    validated_links = set()
    try:
        with open(input_file, 'r') as f:
            links = f.read().splitlines()
            for link in links:
                normalized_link = normalize_url(link)
                if (normalized_link not in validated_links and 
                    not is_unwanted_page(normalized_link) and
                    not any(keyword in normalized_link for keyword in exclusion_keywords)):
                    validated_links.add(normalized_link)
                    print(f"Validated Link: {normalized_link}")
    except Exception as e:
        print(f"Error: {str(e)}")
    
    with open(output_file, 'w') as f:
        for link in validated_links:
            f.write(f"{link}\n")

    print(f"Total validated links: {len(validated_links)}")

# Example usage
if __name__ == "__main__":
    # Exclusion keywords list
    exclusion_keywords = [
        # all of this word its good to check in al site
        "wp-content", 
        "category", 
        "product", 
        "vet",
        "contact",
        "cart",
        "blog",
        "shop",
        "store",
        "about",
        "about-us",
        "faq",
        "help",
        "checkout",
        "login",
        "signin",
        "register",
        "signup",
        "search",
        "terms",
        "privacy",
        "support",
        "forum",
        "reviews",
        "profile",
        "dashboard",
        "%d8%" # it must be check in all site
    ]

    # Validate the links and write them to a new file with exclusion logic
    validate_links_exclusion('links.txt', 'validated_links.txt', exclusion_keywords)

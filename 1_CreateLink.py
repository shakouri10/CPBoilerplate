import requests
from bs4 import BeautifulSoup
from collections import deque
import re
import logging

def find_links(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        page_content = BeautifulSoup(response.text, 'html.parser')
        links = [a['href'] for a in page_content.find_all('a', href=True)]
        return links
    except Exception as e:
        logging.error(f"Error fetching links from {url}: {str(e)}")
        return []

def is_blog_link(url):
    # Adjust the regex to better match blog URLs of your target websites
    blog_url_pattern = re.compile(r'https?://[\w\.-]+/[\d]{4}/[\d]{2}/[\w-]+')
    return re.match(blog_url_pattern, url) is not None

def web_crawler(start_url, max_depth=10):
    logging.info(f'Starting web crawler with start_url={start_url}, max_depth={max_depth}')
    visited = set()
    blog_links = set()
    queue = deque([(start_url, 0)])

    try:
        while queue:
            url, depth = queue.popleft()
            logging.info(f'Visiting url={url}, depth={depth}')

            if depth < max_depth:
                for link in find_links(url):
                    if link not in visited:
                        visited.add(link)
                        queue.append((link, depth + 1))
                        if is_blog_link(link):
                            blog_links.add(link)
                            print(f"Depth: {depth+1}, Blog Link: {link}")
                            logging.info(f'Found blog link={link}, depth={depth+1}')
    except KeyboardInterrupt:
        print("Interrupted by user, saving all data.")
        logging.info("Interrupted by user, saving all data.")

    with open('links.txt', 'w') as f:
        for link in blog_links:
            f.write(f"{link}\n")

    print(f"Total found blog links: {len(blog_links)}")
    logging.info(f'Finished web crawler. Found {len(blog_links)} blog links.')

# Clear log file
open('app.log', 'w').close()

# Setup logging
logging.basicConfig(filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s', level=logging.INFO)

# Start web crawling
web_crawler('https://example-blog.com', max_depth=2)

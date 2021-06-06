"""
Post-Build | Cannlytics
Created: 4/18/2021
Resources:
    https://stackoverflow.com/questions/30312715/run-command-after-webpack-build
"""

import json
import time
import os

from bs4 import BeautifulSoup

# Django directories.
APP = 'cannlytics_console'
MODULE_DIR = f'{APP}/plugins/cannlytics'
STATIC_DIR = f'./{APP}/static/{APP}/'
TEMPLATE_DIR = f'./{APP}/templates/{APP}/'

# Specify templates that import bundles.
TEMPLATES = [
    'base.html',
    'pages/account/base_sign_in.html'
]

def get_webpack_hashes():
    """Get the hashes generated by Webpack and fill them into templates."""

    # Get hashes
    hashes = {}
    with open(STATIC_DIR + 'webpack-stats.json', 'r') as stats:
        hashes = json.load(stats)

    # Find the templates.
    for template in TEMPLATES:

        # Open the template.
        with open(TEMPLATE_DIR + template, 'r+', encoding='utf-8') as html:
            soup = BeautifulSoup(html, 'html.parser')

            # Match hash to asset.
            hash_map = {}
            chunks = list(hashes['chunks'].items())
            assets = list(hashes['assets'].items())
            for chunk in chunks:
                chunk_key = chunk[0].split('_')[0]
                try:
                    chunk_type = chunk[0].split('_')[1]
                except IndexError:
                    chunk_type = 'js'
                for asset in assets:
                    filename = asset[0].split('/')[-1]
                    file_key = filename.split('-')[0]
                    ext = filename.split('.')[-1]
                    if file_key == chunk_key and chunk_type == ext:
                        hash_map[chunk[0]] = {
                            'filename': filename,
                            'ext': ext,
                        }

            # Fill in the hashes.
            for tag_id, values in hash_map.items():

                # Get the appropriate tag, moving on if ID is not present.
                tag = soup.find(id=tag_id)
                if tag is None:
                    continue

                # Optional: Use version number if production.
                # (psuedo-code below)
                # debug = env(DEBUG)
                # if not debug:
                    # version = version number from package.json 
                    # replace hash in values['filename'] with version

                # Input the filename into the href or src attribute.
                link = "{%% static '%s/%s'%%}" % (MODULE_DIR, values['filename'])
                if values['ext'] == 'css':
                    tag['href'] = link
                else:
                    tag['src'] = link

            # Save the template.
            text = soup.prettify()
            text = text.replace('<!--', '\n  <!--')
            html.seek(0)
            html.write(text)
            html.truncate()
            print('Updated hashes in %s.' % template)


def clean_bundle_folder(folder, history=300):
    """Remove old bundles.
    Args:
        folder (str): The path to the directory to clean old files.
        history (int): The time in seconds in history to delete files.
    """
    time_ago = time.time() - history
    for doc in os.listdir(folder):
        file_path = folder + '/' + doc
        updated_at = os.stat(file_path)
        time_modified = updated_at.st_mtime
        if time_modified < time_ago:
            os.unlink(file_path)
            print('Removed %s' % file_path)


if __name__ == '__main__':

    clean_bundle_folder(f'./{APP}/static/' + MODULE_DIR)
    get_webpack_hashes()

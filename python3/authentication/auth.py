import json
from oauthlib.oauth2 import LegacyApplicationClient
from requests_oauthlib import OAuth2Session

with open('gitana.json') as f:
    config = json.load(f)

base_url = config['baseURL']
oauth = OAuth2Session(client=LegacyApplicationClient(client_id=config['clientKey']))
token = oauth.fetch_token(token_url=base_url + '/oauth/token',
                          username=config['username'],
                          password=config['password'],
                          client_id=config['clientKey'],
                          client_secret=config['clientSecret'])


print('You can now use this token:', token['access_token'])

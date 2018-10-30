import requests
from auth import *  

with open('author.json') as f:
    data = json.load(f)

postUrl = "http://api.cloudcms.com/repositories/" + config['repositoryId'] + "/branches/" + config['branchId'] +"/nodes"

headers = {'Authorization': 'Bearer ' + token['access_token'], 'Content-Type': 'application/json;charset=UTF-8'}

response = requests.post(postUrl, json = data, headers = headers)

if(response.status_code == 200):
    print("Congratulations. You successfully created your own content in Cloud CMS!")
    nodeId = response.json()["_doc"]
else:
    print("Error connecting with Cloud CMS. Contact Support for assistance")

postUrlForAttachment = "http://api.cloudcms.com/repositories/" + config['repositoryId'] + "/branches/" + config['branchId'] +"/nodes/" + nodeId + "/attachments/default"

headers = {'Authorization': 'Bearer ' + token['access_token'], 'Content-Type': 'image/jpeg'}

data = open('j.k.rowling.jpg','rb').read()

response = requests.post(postUrlForAttachment, data=data, headers = headers)

if(response.status_code == 200):
    print("You have also successfully uploaded an attachment to the node!")
else:
    print("Error connecting with Cloud CMS. Contact Support for assistance")
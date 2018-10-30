import requests
from auth import *  

url = "http://api.cloudcms.com/repositories/" + config['repositoryId'] + "/branches/" + config['branchId'] + "/nodes/" + config['nodeId']

headers = {'Authorization': 'Bearer ' + token['access_token']}

response = requests.get(url, headers = headers)

if(response.status_code == 200):

    response = response.json()

    print("Congratulations. You successfully read your content from Cloud CMS!")

    print("The _doc of node is -  " + response["_doc"]) 

    print("The Node is of type -   " + response["_type"]) 

    print("The title of node is -  " + response["title"])

else:

    print("Error while reading. Check the Node ID again or Contact Cloud CMS for assistance")
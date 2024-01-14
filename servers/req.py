import requests, json

url = 'http://127.0.0.1:8000/api/v1/token/'

data = {
    'username': 'admin',
    'password': 'xisgid-mapcec-vusHi1'
}

# respones = requests.post(url, data)
# print(respones.json())

# {'token': '46bf8bcbf1c79cdabb6d8648540727c94f8d45d2', 'id': 6}


#requests with token

url = 'http://127.0.0.1:8000/api/v1/store/'

headers = {
    'Authorization': 'Token 775bfb8904fdac83bdb8cc1ba7920db2e0f9064b'
}
x = {
  "name": "John",
  "age": 30,
  "city": "New York"
}
data = {
    "name": "v",
    "about": json.dumps(x),
    "price_id": "",
    "data_dead_line": None,
    'author': 1,
    "executor": None,
    "tags": []

}
# {'detail': 'Authentication credentials were not provided.'}
respones = requests.post(url=url, data=data, headers=headers)
print(respones.json())
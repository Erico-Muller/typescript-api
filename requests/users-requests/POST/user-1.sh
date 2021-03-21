curl --request POST \
  --url http://localhost:4000/user \
  --header 'Content-Type: application/json' \
  --cookie connect.sid=s%253AG78_codxU9jBW796r1xk67n4_oIoX7nQ.I4ImbV%252F4E74m10%252BYFM6f2jWLevESrSSqj3iH2gLAh4M \
  --data '{
	"username": "Erico",
	"email": "ericomuller0@gmail.com",
	"password": "1234",
	"roles": [
		"eb1a81d1-bfda-43ad-b58d-7e075341ba85"
	]
}'
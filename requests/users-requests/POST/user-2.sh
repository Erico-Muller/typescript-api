curl --request POST \
  --url http://localhost:4000/user \
  --header 'Content-Type: application/json' \
  --cookie connect.sid=s%253AG78_codxU9jBW796r1xk67n4_oIoX7nQ.I4ImbV%252F4E74m10%252BYFM6f2jWLevESrSSqj3iH2gLAh4M \
  --data '{
	"username": "Maria",
	"email": "mariarosa1@gmail.com",
	"password": "5678",
	"roles": [
		"51e124bc-c81e-4cd3-8933-53b3da59bc26"
	]
}'

# Establish an SSH tunnel for MongoDB Compass to connect to a DB instance running on EC2

ssh -i ~/Downloads/shivalikattumadam_root.pem -N -f -L 8000:localhost:27017 ubuntu@ec2-18-188-121-84.us-east-2.compute.amazonaws.com

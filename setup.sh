#!/bin/bash

# Wait for MongoDB to start
until mongo --host mongodb_container_1:27018 --eval "print(\"connected\")" >/dev/null 2>&1
do
  echo "Waiting for MongoDB to start..."
  sleep 1
done

# Initialize the replica set
mongo --host mongodb_container_1:27018 <<EOF
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb_container_1:27018" }
  ]
})
EOF

# Start the MongoDB daemon
mongod --bind_ip_all --replSet rs0 --port 27017
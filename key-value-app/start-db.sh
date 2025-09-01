MONGODB_IMAGE="mongodb/mongodb-community-server" 
MONGODB_TAG="7.0-ubuntu2204"
source .env.db

# Root credentials
ROOT_USER="root-user"
ROOT_PASS="root-password"

# Connectivity
LOCALHOST_PORT=27017
CONTAINER_PORT=27017
source .env.network

# Storage
VOLUME_CONTAINER_PATH="/data/db"
source .env.volume

source setup.sh

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "A container with the name $DB_CONTAINER_NAME already exist. Skip the container creation"
    echo "The container will be removed when stopped"
    echo "To stop the container, run: docker kill $DB_CONTAINER_NAME"
    exit 1
fi

docker run -d --rm --name $DB_CONTAINER_NAME \
 -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
 -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASS \
 -e KEY_VALUE_DB=$KEY_VALUE_DB \
 -e KEY_VALUE_USER=$KEY_VALUE_USER \
 -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
 -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
 -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
 --network $NETWORK_NAME \
 $MONGODB_IMAGE:$MONGODB_TAG
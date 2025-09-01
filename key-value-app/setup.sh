# Create volumes and networks
source .env.network
source .env.volume

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "A volumen with the name $VOLUME_NAME already exist. Skip the volume creation"
else
    docker volume create $VOLUME_NAME
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "A network with the name $NETWORK_NAME already exist. Skip the network creation"
else
    docker network create $NETWORK_NAME
fi
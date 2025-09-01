#!/bin/sh

# ./traffic-gen.sh www.google.com 1

if [ "$#" -lt  2 ]; then
    echo "Usage: $0 <target> <interval-in-seconds>"
    exit 1
fi

TARGET=$1
INTERVAL=$2

echo "Sending request to $TARGET every $INTERVAL seconds."

while true; do
    echo ""
    
    REQUEST_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    echo $REQUEST_TIME

    RESPONSE=$(curl -s "$TARGET")
    echo $RESPONSE

    sleep $INTERVAL 
done
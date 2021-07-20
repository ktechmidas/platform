CONFIG_NAME="local"
MINING_INTERVAL_IN_SECONDS=30
MASTERNODES_COUNT=3

full_path=$(realpath $0)
dir_path=$(dirname $full_path)
root_path=$(dirname $dir_path)
packages_path="$root_path/packages"

echo "Removing all docker containers and volumes..."
docker rm -f -v $(docker ps -a -q) || true

docker system prune -f --volumes

echo "Remove dashmate configuration..."
rm -rf ~/.dashmate/

${packages_path}/dashmate/bin/dashmate setup ${CONFIG_NAME} --verbose --debug-logs --miner-interval="${MINING_INTERVAL_IN_SECONDS}s" --node-count=${MASTERNODES_COUNT}
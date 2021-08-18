LOCAL_REGISTRY=http://localhost:4873/

PACKAGE_VERSION=$(cat ./package.json | jq '.version')
LOCAL_VERSION=${PACKAGE_VERSION}-local.1

npm version ${LOCAL_VERSION}
npm publish --registry http://localhost:4873/ --tag local

# Then in dapi: npm install @dashevo/dpp@local --registry http://localhost:4873/
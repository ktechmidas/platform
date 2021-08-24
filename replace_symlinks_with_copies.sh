PATH_TO_SCRIPT=$(realpath $0)
PATH_TO_SCRIPT_DIRECTORY=$(dirname $PATH_TO_SCRIPT)
PATH_TO_PACKAGES_DIR=${PATH_TO_SCRIPT_DIRECTORY}/packages
PATH_TO_TOP_LEVEL_NODE_MODULES=${PATH_TO_SCRIPT_DIRECTORY}/node_modules

for symlink_path in $(find ${PATH_TO_SCRIPT_DIRECTORY} -type l);
do
  echo "Replacing symlink ${symlink_path} with copy of the data"
  original_contents=$(readlink $symlink_path);
  rm "$symlink_path";
  cp "$original_contents" "$symlink_path";
done;
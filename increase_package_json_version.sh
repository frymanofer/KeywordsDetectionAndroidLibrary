#!/bin/bash

# Path to package.json
PACKAGE_JSON="package.json"

# Use sed and awk to increment the patch version
if [[ -f $PACKAGE_JSON ]]; then
  # Extract the version line
  VERSION_LINE=$(grep '"version":' $PACKAGE_JSON)
  if [[ $VERSION_LINE =~ ([0-9]+)\.([0-9]+)\.([0-9]+) ]]; then
    MAJOR=${BASH_REMATCH[1]}
    MINOR=${BASH_REMATCH[2]}
    PATCH=${BASH_REMATCH[3]}

    # Increment the patch version
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

    # Replace the old version line with the updated version
    sed -i '' "s/\"version\": \"$MAJOR.$MINOR.$PATCH\"/\"version\": \"$NEW_VERSION\"/" $PACKAGE_JSON

    echo "Updated version to $NEW_VERSION in $PACKAGE_JSON"
  else
    echo "Version not found in $PACKAGE_JSON"
    exit 1
  fi
else
  echo "$PACKAGE_JSON not found."
  exit 1
fi


version=$(grep '"version":' package.json | sed 's/.*"version": "\([^",]*\)",/\1/')
sed -i -E 's/<link href="([^"]+)"/<link href="\1?v='"$version"'"/g' dist/index.html
sed -i -E 's/<script type="text\/javascript" src="([^"]+)"/<script type="text\/javascript" src="\1?v='"$version"'"/g' dist/index.html

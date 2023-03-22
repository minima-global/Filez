version=$(node getVersion.js)

cd build && zip -r filez-${version}.mds.zip . && mv filez-${version}.mds.zip ../

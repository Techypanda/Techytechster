#!/bin/sh
for f in build/*.html; do 
  mv -- "$f" "${f%.html}" # in S3 we dont want them to have file extensions
done
mv build/index build/index.html # in s3 we actually do want this one to have a file extension
echo " 🐵 done cursed solution  🐵"
#!/bin/sh
for f in build/*.html; do 
  filename="${f%.html}"
  mv -- "$f" "${f%.html}"
  key="${filename:6}"
  aws s3api put-object --bucket techytechster --key $key --content-type text/html --body ./$filename
done
echo " 🐵 done cursed solution  🐵"
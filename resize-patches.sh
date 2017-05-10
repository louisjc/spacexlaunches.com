#!/bin/bash
cd _site/patches
mkdir 100px
mkdir 200px
for img in `ls *.png`
do
  convert $img -filter bessel -resize 100x100 100px/$img
  convert $img -filter bessel -resize 200x200 200px/$img
done

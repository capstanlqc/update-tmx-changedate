# Update `changedate` attribute in TMX 

This script updates the value of all instances of the `changedate` attribute in a TMX file with the current timestamp. 

## How to use it

Assumed Node.js v20.16.0.

## 1. Install dependencies:

Clone this repo, change directory to it and install dependencies:
```bash
gh clone repo capstanlqc/update-tmx-changedate
cd /path/to/update-tmx-changedate
npm install
```

## 2. Run the script:

Make a copy of the original to use it:
```bash
cp batch.orig.tmx batch.tmx
```

Execute the script using Node.js and provide the path to the TMX file with the -f flag:

```bash
node script.js -f batch.tmx
```

## Results

This will update all `changedate` attributes in the <tuv> tags of batch.tmx to the current timestamp.


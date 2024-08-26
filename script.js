// Import necessary modules
const fs = require('fs');
const path = require('path');
const { parseStringPromise, Builder } = require('xml2js');

// Function to generate the timestamp string
function getTimestampString() {
  const now = new Date();

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');

  // Constructing the timestamp string in the desired format
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

// Function to update the attribute value
async function updateXmlAttribute(filePath, newAttributeValue) {
  try {
    // Read the XML file
    const xmlData = fs.readFileSync(filePath, 'utf-8');

    // Parse the XML data into an object
    const xmlObj = await parseStringPromise(xmlData);

    // Recursively update all 'changedate' attributes
    const updateAttributes = (obj) => {
      if (typeof obj === 'object' && obj !== null) {
        // If the object has a 'tuv' property, iterate over each 'tuv' and update the 'changedate' attribute
        if (obj.tuv) {
          obj.tuv.forEach((tuv) => {
            if (tuv.$ && tuv.$.changedate) {
              tuv.$.changedate = newAttributeValue;
            }
          });
        }

        // Recursively check and update child objects
        Object.values(obj).forEach(updateAttributes);
      }
    };

    updateAttributes(xmlObj);

    // Convert the updated object back to an XML string
    const builder = new Builder();
    const updatedXml = builder.buildObject(xmlObj);

    // Write the updated XML back to the file
    fs.writeFileSync(filePath, updatedXml);

    console.log(`Successfully updated 'changedate' attributes in ${filePath}`);
  } catch (error) {
    console.error(`Error updating XML file: ${error.message}`);
  }
}

// Get the file path from command-line arguments
const args = process.argv.slice(2);
const fileIndex = args.indexOf('-f');
const timestamp = getTimestampString();


if (fileIndex !== -1 && args[fileIndex + 1]) {
  const filePath = path.resolve(args[fileIndex + 1]);
  updateXmlAttribute(filePath, timestamp);
} else {
  console.error('Usage: node script.js -f <file-path>');
}

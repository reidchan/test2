const fs = require('fs')

function readFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err)
      console.log('Error reading file')

    console.log(data)
  })
}

readFile()
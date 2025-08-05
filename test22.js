const fs = require('fs')
fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})
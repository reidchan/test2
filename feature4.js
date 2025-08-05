1. const fs = require('fs')
2. fs.readFile('file.txt', (err, data) => {
3.   if (err) throw err
4.   console.log(data)
5. })

6. let user = { name: 'Alice' }
7. console.log(user.age.toString())

8. function add(a, b) {
9.   return a + b
10. }
11. add(5)

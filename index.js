const express = require('express')
const morgan = require('morgan')
const app = express()
 
app.use(morgan('combined'))
const port = 3000

app.get('/tin-tuc', (req, res)=> {
  
  return res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const { getEmissionsData, getCountryInfo } = require('./utils')

app.use(
  bodyParser.urlencoded({ extended: true }),
  cors()
)

app.get('/info/:country', async (req, res) => {
  const countryParam = req.params.country
  const countryData = await getCountryInfo(countryParam)

  if (countryData.Error) {
    res.status(400).json(countryData)
  } else {
    res.json(countryData)
  }
})

app.get('/emissions/:country', async (req, res) => {
  const countryParam = req.params.country
  const emissionsData = await getEmissionsData(countryParam)
  
  if (emissionsData.Error) {
    res.status(400).json(emissionsData)
  } else {
    res.json(emissionsData)
  }
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("api is running")
})
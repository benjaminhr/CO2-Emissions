const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const parser = require('xml2json')

const getEmissionsData = async (userCountryName) => {
  const contents = await readFile('data/C02_emissions.xml')
  const JSONData = JSON.parse(parser.toJson(contents))
  const allEmissionsData = JSONData["Root"]["data"]["record"]

  const result = allEmissionsData
    .filter(data => {
      const countryName = data["field"][0]["$t"]
      if (countryName.toUpperCase() === userCountryName.toUpperCase()) {
        if (data["field"][3]["$t"]) {
          return data
        }
      }
    })
    .map(data => {
      return {
        countryName: data["field"][0]["$t"],
        key: data["field"][0]["key"],
        year: data["field"][2]["$t"],
        value: data["field"][3]["$t"]
      }
    })

  return result ? result : { "Error" : "No country data found." }
}

const getCountryInfo = async (countryName) => {
  const content = await readFile('data/countries.json', 'utf-8')
  const allCountryInfo = JSON.parse(content)
  const result = allCountryInfo.find(country => {
    if (country["name"].toUpperCase() === countryName.toUpperCase()) {
      return country
    }
  })
  
  return result ? result : { "Error": "No country found." }
}

module.exports = {
  getEmissionsData,
  getCountryInfo
}
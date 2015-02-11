# Sensing Evolution

## Developer

### Setup

Assuming that `npm` is installed:

    npm install

    bower install

### Building via phonegap cloud build

    grunt cloudbuild:<authToken>

Your auth token can be found on the 'Client Applications' panel of Phonegap's 'Edit Account' page


### Importing data

The data for the app comes from the spreadsheet SensingEvolutionData.xlsx.

This sheet should be exported to .csv into a folder named SensingEvolutionData.

The following task then converts the data to the json format read by the app

    grunt convertData

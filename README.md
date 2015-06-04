# Sensing Evolution

## Developer

### Setup

Assuming that `npm` is installed:

    npm install

    bower install

### Building via phonegap cloud build

    grunt localbuild:ios        //build for ios
    grunt localbuild:ios_r      //build and run for ios
    grunt localbuild:android    //build for android
    grunt localbuild:android_r  //build and run for android

Note, sometimes these commands will run on simulator rather than device. In this case, it may be necessary to run via the cordova cli
e.g.
```
cordova run ios --device
```


### Importing data

The data for the app comes from the spreadsheet SensingEvolutionData.xlsx.

This sheet should be exported to .csv into a folder named SensingEvolutionData.

>Note: When importing the xlsx into Numbers, some extra empty columns and rows are generated on the smaller tables.

>It's necessary to either remove these rows, or else clean up the exported csv. OpenOffice doesn't suffer from this problem, but can only export one sheet at a time.


The following task then converts the data to the json format read by the app

    grunt convertData

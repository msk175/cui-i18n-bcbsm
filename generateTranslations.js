'use strict'

/*
*   Note:
*   This script assumes that 'node initDist.js <version>' has already been ran.
*/

const sheetrock = require('sheetrock')
const generator = require('./generator')
const fs = require('fs')

/*const currentVersion = fs.readdirSync('./dist/')[0]*/
const currentVersion = '1.5.65'
const codes = ['en', 'fr', 'es']
const mainSheetUrl = 'https://docs.google.com/spreadsheets/d/1yIYGAL7nOObK1QVczGto7LWAPzYaWR4gSQHfD3qYJDA/edit?ts=58918e37#gid=521689317'
const overwriteSheetUrl = 'https://docs.google.com/spreadsheets/d/19a35v9oBH9190f5wmKvVy_WUPV0xelnKtDsRTEc87xk/edit#gid=0'

const overrideCallback = (error, options, response, parsedResponse, files) => {
    if (error) {
        console.log(error, response)
        return
    }

    const overwrittenParsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const overwrittenLanguageObject = generator.parseOverrides(parsedResponse, overwrittenParsedResponse, codes)

    generator.createLanguageFilesFromParsedResponse(files, overwrittenLanguageObject)
}

const translationCallback = (error, options, response) => {
    if (error) {
        console.log(error, response)
        return
    }

    const parsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const files = [
        { 
            extension: 'json',
            prefix: 'locale-',
            formatter: generator.jsonFormatter,
            outputDirectory: 'dist/' + currentVersion + '/cui-i18n/angular-translate/'
        }, { 
            extension: 'properties',
            prefix: 'locale-',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: 'dist/' + currentVersion + '/cui-i18n/java/'
        }, { 
            extension: 'json',
            prefix: 'locale-',
            formatter: generator.jsonFormatter,
            outputDirectory: 'dist/cui-i18n/angular-translate/'
        }, { 
            extension: 'properties',
            prefix: 'locale-',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: 'dist/cui-i18n/java/'
        }
    ]

    if (typeof overwriteSheetUrl === 'undefined') {
        generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
    }
    else {
        sheetrock({
            url: overwriteSheetUrl,
            query: 'select *',
            callback: function(error, options, response) {
                overrideCallback(error, options, response, parsedResponse, files)
            }
        })
    }
}

sheetrock({
    url: mainSheetUrl,
    query: 'select *',
    callback: translationCallback
})

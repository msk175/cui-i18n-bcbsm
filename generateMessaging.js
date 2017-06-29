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

const messagingCallback = (error, options, response) => {
    if (error) {
        console.log(error)
        return
    }

    const parsedResponse = generator.sheetrock.parseLanguages(codes, response)
    const files = [
        { 
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/messaging/json/' 
        }, { 
            extension: 'properties',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/' + currentVersion + '/cui-i18n/messaging/java/' 
        }, { 
            extension: 'json',
            formatter: generator.jsonFormatter,
            outputDirectory: './dist/cui-i18n/messaging/json/' 
        }, { 
            extension: 'properties',
            formatter: generator.javaPropertiesFormatter,
            outputDirectory: './dist/cui-i18n/messaging/java/' 
        }
    ]

    generator.createLanguageFilesFromParsedResponse(files, parsedResponse)
}

sheetrock({
    url: 'https://docs.google.com/spreadsheets/d/1yIYGAL7nOObK1QVczGto7LWAPzYaWR4gSQHfD3qYJDA/edit?ts=58918e37#gid=39928113',
    query: 'select *',
    callback: messagingCallback
})

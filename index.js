const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const parseString = require('xml2js').parseString;

var cors = require('cors');
const express = require('express');

//Start web server
var app = express();
var server = app.listen(4000, () => {
    console.log("Listening to requests on port 4000...");
});


var io = require('socket.io')(server);
io.set('origins', '*:*');

//Send index.html on GET /
//app.use(express.static('public'));

// USB Port of Arduino UNO
var path = "/dev/cu.usbmodem142201";
const port = new SerialPort(path, {baudRate: 115200});

const parser = new Readline({delimiter: '\r\n'});
port.pipe(parser);

parser.on('data', function(data){
    processXml(data);
});


var xmlFragementData = '';
var state = 'SEARCHING_START';

function rawDataHandler(data){
    data = data.toString();

    switch(state){
        case 'READ_WHILE_END':
            xmlFragementData += data;
            var endPosition = xmlFragementData.indexOf('</document>');
            if(endPosition >= 0){
                var completeXml = xmlFragementData.substr(0, endPosition + 11); // "</document>".length === 11
                xmlFragementData = xmlFragementData.substr((endPosition + 11)); // "</document>".length === 11
                state = 'SEARCHING_START';
                processXml(completeXml);
            }
            break;

        case 'SEARCHING_START':
            var startPosition = data.indexOf('<?xml');
            if(startPosition >= 0){
                xmlFragementData = data.slice(startPosition);
                state = 'READ_WHILE_END';
                break;
            }
            break;
    }
}

function processXml(xml){
    parseString(xml, function(err, result){
        if(typeof result === "undefined"){
            return;
        }

        //console.dir(result);
        var now = new Date();
        io.sockets.emit('data', {
            humidity: result.document.humidity[0],
            temperature: result.document.temperature[0],
            time: now.getTime()
        });
    });
}
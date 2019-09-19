# Arduino Dashboard
A simple dashboard to view live data collected by an Arduino Uno and an DHT22 build with Angular

![Live Arduino Dashboard](dashboard.gif?raw=true "Live Arduino Dashboard based on Angular")

## Requirements
 - Nodejs
 - Angular 

## Install
```
git clone https://github.com/it-novum/arduino-dashboard.git
cd arduino-dashboard/

# Install backend components
npm install

# Install frontend components
cd ngfrontend
npm install
cd ../
```

## Execute

### Start backend websocket server
```
node index.js
```

You will get an output like this: `Listening to requests on port 4000...`

### Start Angular frontend server
```
cd ngfrontend/
ng serve
```

Open your web browser and navigate to `http://localhost:4200/`

## Arduino Sketch
You canflash the file `sketch/arduino/arduino.ino` to your Arduino.

# License

```
The MIT License

Copyright 2019 it-novum GmbH

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
```

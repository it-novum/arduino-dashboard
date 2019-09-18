/*
 * Requirements
 * https://github.com/adafruit/DHT-sensor-library
 * https://github.com/adafruit/Adafruit_Sensor
 *
 * MIT License <daniel.ziegler@it-novum.com>
 */

#include "DHT.h"
#define DHTPIN 7
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

struct Humidity {
  int humidity;
  unsigned int humidityFrac;

  int temperature;
  unsigned int temperatureFrac;
};

void setup() {
  Serial.begin(115200);
  dht.begin();
}
void loop() {

  delay(250);

  Humidity humidity = getHumidityAndTemperature();

  if(humidity.humidity < 0 || humidity.humidity > 100){
    // Error on reading - loop again
    return;
  }

  writeXmlToSerial(humidity);
}

Humidity getHumidityAndTemperature() {
  struct Humidity humidityStruct;
  float humidity =  dht.readHumidity();
  float temperature = dht.readTemperature();

  humidityStruct.humidity = int(humidity);
  humidityStruct.humidityFrac = (humidity - int(humidity)) * 100;

  humidityStruct.temperature = int(temperature);
  humidityStruct.temperatureFrac = (temperature - int(temperature)) * 100;

  return humidityStruct;
}

void writeXmlToSerial(Humidity humidity){
  Serial.flush();
  
  String response = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><document>";
  response += "<humidity>";
  response += humidity.humidity;
  response += ".";
  response += humidity.humidityFrac;
  response += "</humidity>";

  response += "<temperature>";
  response += humidity.temperature;
  response += ".";
  response += humidity.temperatureFrac;
  response += "</temperature>";
  
  response += "</document>";

  Serial.println(response);

  Serial.flush();
}

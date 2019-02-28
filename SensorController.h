#ifndef SENSORCONTROLLER_H
#define SENSORCONTROLLER_H

#include "Arduino.h"
#include "Meteomoment.h"
#include "PressureSensor.h"

/*
 * This class is resposible of controlling all the sensors and
 * parsing the information sent.
 * Author: Mocoma, 2019
 */
class SensorController
{
public:
  SensorController() = default;

  //Return a meteomoment where every variable is 1 if it is ok or 0 if the sensor fails
  //static Meteomoment check();

  //static Meteomoment GetMeteomoment();
  double getTemperature();
  double getPressure();
  //static double GetHumidity();
  //static double GetPrecipitation();
  //static double GetWind();

private:
  PressureSensor pressure = PressureSensor(50);
};
#endif

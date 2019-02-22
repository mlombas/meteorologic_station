#ifndef SENSORCONTROLLER_H
#define SENSORCONTROLLER_H

#include "Arduino.h"
#include "Meteomoment.h"

/*
 * This class is resposible of controlling all the sensors and
 * parsing the information sent.
 * Author: Mocoma, 2019
 */
class SensorController
{
public:
  static void init();

  static bool check();

  static Meteomoment GetMeteomoment();
  static double GetTemperature();
  static double GetPressure();
  static double GetHumidity();
  static double GetPrecipitation();
  static double GetWind();
}
#endif

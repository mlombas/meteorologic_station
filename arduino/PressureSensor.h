#ifndef PRESSURESENSOR_H
#define PRESSURESENSOR_H

#include <Arduino.h>
#include <SFE_BMP180.h>

class PressureSensor
{
public:
  PressureSensor(unsigned short treshold_in = 1000);
  
  //read values
  double getPressure();
  double getTemperature();

  //tells us if we messed up
  bool fail();
  
private:
  //Sensor and a method to reset it
  SFE_BMP180 sensor;
  void reset();
  //Tells us if we messed up something
  bool failed = true;
  
  //Tries to read values. returns false on fail
  bool read();
  //Temperature variables
  double T, P;

  bool checkTreshold();
  unsigned short treshold;
  unsigned short lastTime;
};

#endif

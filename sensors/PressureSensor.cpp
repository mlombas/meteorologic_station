#include "PressureSensor.h"
#include <Wire.h>

PressureSensor::PressureSensor(unsigned short treshold_in)
  :
  treshold(treshold_in)
{
  lastTime = static_cast<unsigned short>(millis());
  //we dont begin() the sensor yet. checkTreshold will take care of that
}

bool PressureSensor::checkTreshold()
{
  if(failed) //reset if failed
    reset();
    
  unsigned short dt = static_cast<unsigned short>(millis()) - lastTime;
  if(dt > treshold)
  {
    lastTime = static_cast<unsigned short>(millis());
    return true;
  }
  else
  {
    return false;
  }
}

bool PressureSensor::read()
{
  char status = max(sensor.startTemperature(), sensor.startPressure(3));
  if(status == 0)
    return false;

  delay(status);
  status = min(sensor.getTemperature(T), sensor.getPressure(P, T));
  if(status == 0)
    return false;

  return true;
}


bool PressureSensor::fail()
{
  return failed;
}

void PressureSensor::reset()
{
  sensor = SFE_BMP180();
  failed = !sensor.begin();
}

double PressureSensor::getTemperature()
{
  if(checkTreshold())
    failed = read();
    
  return T;
}

double PressureSensor::getPressure()
{
  if(checkTreshold())
    failed = read();
    
  return P;
}


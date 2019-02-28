#include "PressureSensor.h"
#include <Wire.h>

PressureSensor::PressureSensor(unsigned short treshold_in)
  :
  treshold(treshold_in)
{
  lastTime = static_cast<unsigned short>(millis());
  failed = read(); //Read first time to initialize T and P variables without treshold
}

bool PressureSensor::checkTreshold()
{
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
  if(failed) //try to reset if failed. This will automatically reset first time
    if(!reset()) //If reset fails, then exit and return false as we didnt read
      return false;
  
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


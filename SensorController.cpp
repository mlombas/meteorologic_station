#include "SensorController.h"

double SensorController::getPressure()
{
  return pressure.getPressure();
}

double SensorController::getTemperature()
{
  return pressure.getTemperature();
}


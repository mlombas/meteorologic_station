#ifndef METEOMOMENT_H
#define METEOMOMENT_H

#include "Arduino.h"

//Stores a meteorological moment
struct Meteomoment
{
  double temperature;
  double pressure;
  double humidity;
  double precipitation;
  double wind;
};

#endif


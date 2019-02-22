#include "Meteomoment.h"
#include "SensorController.h"

void setup() 
{
  SensorController.init();
}

void loop() 
{
  SensorController.check();
}

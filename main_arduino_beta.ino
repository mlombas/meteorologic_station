#include "Meteomoment.h"
#include "SensorController.h"

SensorController controller;

void setup() 
{
  Serial.begin(9600);
}

void loop() 
{
  Serial.print(controller.getTemperature(), 2);
  Serial.print("C ");
  Serial.print(controller.getPressure(), 2);
  Serial.println("Pa");
}

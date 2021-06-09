#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {

  Serial.begin(9600);
  dht.begin();
}

void loop() {

  delay(5000);

  float temperatura = dht.readTemperature();
  int umidade = dht.readHumidity();

  if (isnan(temperatura) || isnan(umidade))

    return;

  Serial.print(temperatura, 2);
  Serial.print(", ");
  Serial.println(umidade);
}

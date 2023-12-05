#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 13   // D13
#define DHTTYPE DHT11
DHT dht11(DHTPIN, DHTTYPE);

// Use the correct URLs for insert and retrieve
String insertUrl = "[Your URL]/ProyectoESP/app/insert.php";
String retrieveUrl = "[Your URL]/ProyectoESP/app/retrieve.php";
const char* ssid = "[Your Wifi]";
const char* password = "[Your pasword]";
int temperature = 0;
int humidity = 0;

void setup() {
  Serial.begin(115200);
  dht11.begin();
  connectWiFi();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  Load_DHT11_Data();
  insertData();

  // Delay for 5 seconds before sending the next request
  delay(5000);
}

void connectWiFi() {
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to: ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void Load_DHT11_Data() {
  temperature = dht11.readTemperature(); // Celsius
  humidity = dht11.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    temperature = 0;
    humidity = 0;
  }

  Serial.printf("Temperature: %d °C\n", temperature);
  Serial.printf("Humidity: %d %%\n", humidity);
}

void insertData() {
  String postData = "temperature=" + String(temperature) + "&humidity=" + String(humidity);

  HTTPClient http;
  http.begin(insertUrl);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(postData);

  if (httpCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpCode);
    String payload = http.getString();
    Serial.print("Server response: ");
    Serial.println(payload);
  } else {
    Serial.println("HTTP Request failed");
  }

  http.end();
}

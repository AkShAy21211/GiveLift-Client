"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Sun, Thermometer, Wind, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

const fetchWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation_probability`
  );
  return await res.json();
};

export default function WeatherAlert() {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      const data = await fetchWeather(latitude, longitude);
      setWeather(data.current_weather);

      const newAlerts: string[] = [];
      const { current_weather, hourly } = data;

      if (current_weather?.temperature > 35) {
        newAlerts.push(`🔥 Heat alert: ${current_weather.temperature}°C`);
      }
      if (current_weather?.temperature < 15) {
        newAlerts.push(`❄️ Cold alert: ${current_weather.temperature}°C`);
      }
      if (current_weather?.windspeed > 30) {
        newAlerts.push(`💨 Strong wind: ${current_weather.windspeed} km/h`);
      }

      const upcomingRain = hourly?.precipitation_probability?.slice(0, 3);
      if (upcomingRain?.some((p: number) => p > 70)) {
        newAlerts.push(`🌧️ Heavy rain expected soon`);
      }

      setAlerts(newAlerts);
    });
  }, []);

  return (
    <div className="space-y-3 mb-4">
      {/* Compact Weather Display */}
      {weather && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="h-5 w-5 text-orange-500" />
              <div>
                <p className="font-semibold text-gray-800">Current Weather</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Thermometer className="h-3 w-3" />
                    <span>{weather.temperature}°C</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Wind className="h-3 w-3" />
                    <span>{weather.windspeed} km/h</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <Alert key={index} className="bg-orange-50 border-orange-200">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium">
              {alert}
            </AlertDescription>
          </Alert>
        ))
      ) : (
        weather && (
          <Alert className="bg-green-50 border-green-200">
            <Sun className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              ✨ Weather looks good! No alerts right now.
            </AlertDescription>
          </Alert>
        )
      )}
    </div>
  );
}
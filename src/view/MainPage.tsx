import React, { useEffect, useState } from "react";
import weatherForecastService from "../api/helloWorld";

import Text from "../components/Text";

const MainPage = () => {
  const [weatherForecast, setWeatherForecast] = useState<string>("");

  useEffect(() => {
    const getHelloWorld = async () => {
      const weatherForecast = await weatherForecastService.getWeatherForecast();

      setWeatherForecast(weatherForecast);
    };

    getHelloWorld();
  }, []);

  return (
    <>
      <Text text={weatherForecast}/>
    </>
  );
};

export default MainPage;
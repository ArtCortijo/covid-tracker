// Functions that will fetch the data that we need

// Axios to make the API requests
import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    // const { data } = await axios.get(url);
    // const modifiedData = {
    //   confirmed: data.confirmed,
    //   recovered: data.recovered,
    //   death: data.death,
    //   lastUpdate: data.lastUpdate,
    // };

    // Simplier way:
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // console.log(data);

    // Instant return of an object
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

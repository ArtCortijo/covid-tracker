import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/img-covid.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    // fetch the data
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    // set the state
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    // desctructure state
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt='COVID-19' />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;

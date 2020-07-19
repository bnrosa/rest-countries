import React, {useState, useEffect} from 'react';
import Card from './card.component';
const axios = require('axios');



export default function CardList(){

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                setCountries([...res.data]);
                console.log(res.data[0]);
            });
    
    }, []);

    return(
        <div className="columns is-gapless is-multiline">
            {countries.map( country => {
                return(
                    <Card flag={country.flag} population={country.population}
                    region={country.region} key={country.alpha3Code}
                    countryName={country.name} capital={country.capital}
                    />
                )
            })}
        </div>     
    );
}
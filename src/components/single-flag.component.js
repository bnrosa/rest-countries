import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useHistory, useParams} from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';

const axios = require('axios');

const Container = styled.div`
    margin: 0.4rem;
    padding: 0.4rem 0.8rem;
    width: min-content;
    display: flex;
    &:focus {
        box-shadow: none;
    }
`;

const InlineDiv = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const BackBtn = styled.button`
    border: none;
    background: none;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    &:focus {
        outline: none;
        box-shadow: none;
    }

`;

const BackIcon = () => {
    const IconWrapper = styled.div`
        margin: 0 8px 0 0;
        padding-top: 3px
    `
    return <IconWrapper> <MdKeyboardBackspace /> </IconWrapper>
}

export default function SingleFlag(props){

    let history = useHistory();
    let { id } = useParams();

    const [country, setCountry] = useState({
        currencies: [], languages: []
    });

    const [borders, setBorders] = useState([])

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`)
            .then((res) => {
                setCountry(res.data);
                let regions = res.data.borders.map(code =>{
                    return code.toLowerCase();
                })
                axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${regions.join(';')}`)
                    .then((res) =>{
                        const names = res.data.map((border) => {
                            return {name: border.name, code: border.alpha2Code}
                        });
                        setBorders(names);
                    })

            })
            .catch((err) => {
                console.log(err);
            })
    },[id]);

    return(
        <span>
            <BackBtn type="button" onClick={() => history.go(-1)}>
                <Container className="card">
                   <BackIcon/> back 
                </Container>
            </BackBtn>
            <div className="columns">
                <div className="column is-one-half">
                    <figure className="image is-4by3">
                        <img src={country.flag} alt="Flag"/>
                    </figure>
                </div>
                <div className="column is-one-half">
                    <h3 className="title is-3"> {country.name} </h3>
                    <div className="columns">
                        <div className="column is-half">
                            <p><strong>Population: </strong> {country.nativeName} </p>
                            <p><strong>Population: </strong> {country.population} </p>
                            <p><strong>Region:   </strong> {country.region}</p>
                            <p><strong>Sub Region:   </strong> {country.subregion}</p>
                            <p><strong>Capital:  </strong> {country.capital} </p>
                        </div>
                        <div className="column is-half">
                            <p><strong>Top Level Domain:   </strong> {country.topLevelDomain}</p>
                            <p><strong>Currencies:   </strong> {
                                country.currencies.map((currency, index) => {
                                    if(index !== country.currencies.length -1){
                                        return currency.name+',';
                                    }
                                    else{
                                        return currency.name;
                                    }
                                })
                            }</p>
                            <p><strong>Languages:   </strong> {
                                country.languages.map((language, index) => {
                                    if(index !== country.languages.length -1){
                                        return language.name+', ';
                                    }
                                    else{
                                        return language.name;
                                    }
                                })
                            }</p>

                    </div>
                    </div>

                    <InlineDiv className="container">
                        <strong>Borders Countries:</strong>
                        {
                            borders.map((country) => {
                                return(
                                    <Link key={country.code} to={country.code}>
                                        <Container className="card">
                                            {country.name} 
                                        </Container>
                                    </Link>
                                );
                            })
                        }
                    </InlineDiv>  
                </div>
            </div> 
        </span>
        
    );
}
import React, {useState, useEffect} from 'react';
import Card from './card.component';
import styled from 'styled-components';
import {MdSearch} from 'react-icons/md';

const axios = require('axios');

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const ScreenEnd = styled.div`
    justify-content: flex-end;
    margin-left: auto;
    align-items: stretch;
`;

const Icon = styled.span`
    font-size: 1.4rem;
    color: #aaa;
    height: 2.5em;
    pointer-events: none;
    position: absolute;
    top: 15%;
    width: 2.5em;
    z-index: 4;
    left: 10px;
`;

const SelectOpts = styled.select`
    padding-right: 2.5em;
    cursor: pointer;
    display: block;
    font-size: 1em;
    max-width: 100%;
    outline: none;
    background-color: white;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.5em - 1px);
    padding-left: calc(0.75em - 1px);
    padding-right: calc(0.75em - 1px);
    padding-top: calc(0.5em - 1px);
    position: relative;
    vertical-align: top;
    &::after{
        border-coloer: #999;
        content: '" "';
    }
`;

export default function CardList(){

    const [countries, setCountries] = useState([]);
    const [textFilter, setTextFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');


    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then((res) => {
                setCountries([...res.data]);
            });
    
    }, []);

    const filterCountries = () => {
        let displayed = [...countries];
        if(regionFilter !== ''){
            displayed = displayed.filter(e => e.region === regionFilter);
        }
        let reg = new RegExp(textFilter.toLowerCase());
        if(textFilter !== ''){
            displayed = displayed.filter(e => e.name.toLowerCase().match(reg));
        }
        return displayed.map( country => {
            return(
                <Card flag={country.flag} population={country.population}
                    region={country.region} key={country.numericCode}
                    code={country.alpha2Code}
                    countryName={country.name} capital={country.capital}
                />                    
            )
        })
    }

    return(
        <span>
            <Container>
            <div className="control has-icons-left has-icons-right">
                <input 
                    className="input"
                    type="text"
                    placeholder="Search for a country"
                    onChange={(e) => setTextFilter(e.target.value)}
                />
                <Icon>
                    <MdSearch/>
                </Icon>
            </div>
                <ScreenEnd> 
                <div className="field">
                    <div className="control">
                        <div className="select">
                            <SelectOpts onChange={(e) => setRegionFilter(e.target.value)} className="has-text-grey">
                                <option value=""></option>
                                <option value="Africa">Africa</option>
                                <option value="Americas">Americas</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Oceania">Oceania</option>
                            </SelectOpts>
                        </div>
                    </div>
                </div>
                </ScreenEnd>
            </Container>
            <div className="columns is-gapless is-multiline">
                {filterCountries()}
            </div>     
        </span>
    );
}
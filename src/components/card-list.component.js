import React, {useState, useEffect} from 'react';
import Card from './card.component';
import styled from 'styled-components';
import {MdSearch} from 'react-icons/md';
import { useSelector } from 'react-redux';

const axios = require('axios');

const Container = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 769px) {
        flex-direction: column;
    }
`;

const ScreenEnd = styled.div`
    justify-content: flex-end;
    margin-left: auto;
    align-items: stretch;
`;

const Icon = styled.span`
    font-size: 1.4rem;
    background: none;
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    height: 2.5em;
    pointer-events: none;
    position: absolute;
    top: 15%;
    width: 2.5em;
    z-index: 4;
    left: 10px;
`;

const SelectOpts = styled.select`
    background: ${props => props.isDark ? '#2B3945' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    border-radius: 4px;
    padding-right: 2.5em;
    cursor: pointer;
    display: block;
    font-size: 1em;
    max-width: 100%;
    outline: none;
    align-items: center;
    border: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    justify-content: flex-start;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
    &::after{
        content: " ";
        border-color: #111517;
        z-index: 4;
        top: 50%;
        right: 4px;
        position: absolute;
    }
    @media (max-width: 769px) {
        margin-top: 10px;
    }
`;

const MyInput = styled.input`
    background: ${props => props.isDark ? '#2B3945' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    border: none;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
    ::placeholder {
        color: ${props => props.isDark ? '#fff' : '#202C37'};
    }
`

const MySection = styled.section`
    background: ${props => props.isDark ? '#202C37' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
`;

export default function CardList(){

    const [countries, setCountries] = useState([]);
    const [textFilter, setTextFilter] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    let isDarkMode = useSelector(state => state.isDark);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        axios.get(`${process.env.REACT_APP_API_ENPOINT}/all`)
            .then((res) => {
                isMounted && setCountries([...res.data]);
            })
            .catch((err) => {
                console.error(err);
            });
        
        return () => {
            isMounted = false;
            controller.abort();
        }
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
        return displayed.map(( country, index) => {
            return( 
                <Card flag={country.flag} population={country.population}
                    region={country.region} key={index} 
                    code={country.alpha2Code}
                    countryName={country.name} capital={country.capital}
                />                              
            )
        })
    }

    return(
        <MySection isDark={isDarkMode} className="section">
            <div className="container" style={{top: '70px'}}>
                <Container className="is-desktop">
                    <div className="control has-icons-left has-icons-right">
                        <MyInput 
                            isDark={isDarkMode}
                            className="input"
                            type="text"
                            placeholder="Search for a country"
                            onChange={(e) => setTextFilter(e.target.value)}
                        />
                        <Icon isDark={isDarkMode}>
                            <MdSearch/>
                        </Icon>
                    </div>
                    <ScreenEnd> 
                        <div className="field">
                            <div className="control">
                                <div className="">
                                    <SelectOpts isDark={isDarkMode} onChange={(e) => setRegionFilter(e.target.value)}>
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
            </div>
        </MySection>
    );
}
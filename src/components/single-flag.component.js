import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useHistory, useParams} from 'react-router-dom';
import {MdKeyboardBackspace} from 'react-icons/md';
import { useSelector } from 'react-redux';

const axios = require('axios');

const Container = styled.div`
    background: ${props => props.isDark ? '#2B3945' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
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

const MyStrong = styled.strong`
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-weight: 800;
`;

const MyTitle = styled.h3`
    color: ${props => props.isDark ? '#fff' : '#202C37'};
    font-weight: 800;
    font-size: 1.8rem;
`;

const IconWrapper = styled.div`
    margin: 0 8px 0 0;
    padding-top: 3px;
`;

const MySection = styled.section`
    background: ${props => props.isDark ? '#202C37' : '#fff'};
    color: ${props => props.isDark ? '#fff' : '#202C37'};
`;

export default function SingleFlag(props){

    let history = useHistory();
    let { id } = useParams();
    let isDarkMode = useSelector(state => state.isDark);

    const [country, setCountry] = useState({
        currencies: [], languages: []
    });

    const [borders, setBorders] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ENPOINT}/alpha/${id}`)
            .then((res) => {
                setCountry(res.data);
                let regions = res.data.borders.map(code =>{
                    return code.toLowerCase();
                })
                axios.get(`${process.env.REACT_APP_API_ENPOINT}/alpha?codes=${regions.join(';')}`)
                    .then((res) =>{
                        const names = res.data.map((border) => {
                            return {name: border.name, code: border.alpha2Code}
                        });
                        setBorders(names);
                    })
                    .catch((err) =>{
                        console.log(err);
                        setBorders([{name: "I'm so lonelly, will you be my friend? 😣",
                            code: ''
                        }]);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    },[id]);

    return(
        <MySection isDark={isDarkMode}  className="section">
            <div className="container" style={{top: '70px'}}>
                <BackBtn type="button" onClick={() => history.go(-1)}>
                    <Container isDark={isDarkMode} className="card">
                        <IconWrapper> <MdKeyboardBackspace /> </IconWrapper> back 
                    </Container>
                </BackBtn>
                <div className="columns">
                    <div className="column is-one-half">
                        <figure className="image is-4by3">
                            <img src={country.flag} alt={`${country.name} Flag`}/>
                        </figure>
                    </div>
                    <div className="column is-one-half">
                        <MyTitle isDark={isDarkMode} className="title is-3"> {country.name} </MyTitle>
                        <div className="columns">
                            <div className="column is-one-half">
                                <p><MyStrong isDark={isDarkMode}>Population: </MyStrong> {country.nativeName} </p>
                                <p><MyStrong isDark={isDarkMode}>Population: </MyStrong> {country.population} </p>
                                <p><MyStrong isDark={isDarkMode}>Region:   </MyStrong> {country.region}</p>
                                <p><MyStrong isDark={isDarkMode}>Sub Region:   </MyStrong> {country.subregion}</p>
                                <p><MyStrong isDark={isDarkMode}>Capital:  </MyStrong> {country.capital} </p>
                            </div>
                        <div className="column is-one-half">
                            <p><MyStrong isDark={isDarkMode}>Top Level Domain:   </MyStrong> {country.topLevelDomain}</p>
                            <p><MyStrong isDark={isDarkMode}>Currencies:   </MyStrong> {
                                country.currencies.map((currency, index) => {
                                    if(index !== country.currencies.length -1){
                                        return currency.name+',';
                                    }
                                    else{
                                        return currency.name;
                                    }
                                })
                            }</p>
                            <p><MyStrong isDark={isDarkMode}>Languages:   </MyStrong> {
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
                        <MyStrong isDark={isDarkMode}>Borders Countries:</MyStrong>
                        {
                            borders.map((country) => {
                                return(
                                    <Link key={country.code} to={country.code}>
                                        <Container isDark={isDarkMode} className="card">
                                            {country.name} 
                                        </Container>
                                    </Link>
                                );
                            })
                        }
                    </InlineDiv>  
                </div>
            </div>
            </div>
        </MySection>
    );
}
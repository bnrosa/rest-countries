import React from 'react';
import styled from 'styled-components';
import {FiMoon } from 'react-icons/fi';

const HeaderWrapper = styled.nav`
    width: 100%;
    white-space: nowrap;
    padding: 20px;
    box-shadow: 0 2px 1px 0 rgba(0,0,0,0.05), 0 2px 1px -4px rgba(0,0,0,1), 0 1px 3px 0 rgba(0,0,0,0.05);
`;

const Heading = styled.span`
    color: black;
    font-size: 1rem;
    font-weight: bold;
`;

const DarkMode = styled.span`
    margin: 3px 6px;
`;

const DarkModeBtn = styled.button`
    border: none;
    background: none;
    font-size: 1rem;
`;

export default function Header(){
    return(
        <HeaderWrapper className="navbar" role="navigation" aria-label="main navigation">
                <Heading>Where in the world?</Heading>
                <div className="navbar-end">
                    <DarkModeBtn>
                        <DarkMode> <FiMoon/> </DarkMode> Dark Mode
                    </DarkModeBtn>
                </div>
        </HeaderWrapper>
        
    );
}


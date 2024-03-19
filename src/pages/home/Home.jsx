import React from 'react';
import styled from 'styled-components';
import FirstHomeContainer from './FirstHomeContainer';
import SecondHomeContainer from './SecondHomeContainer';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-image: url(${`${process.env.PUBLIC_URL}/assets/starsky.jpg`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

`;

const Home = () => {
  return (
    <Container>
      <FirstHomeContainer />
      <SecondHomeContainer />
    </Container>
  );
};

export default Home;

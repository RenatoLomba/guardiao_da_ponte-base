/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  // ROTEAMENTO DO NEXT
  const router = useRouter();

  // ESTADO
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{`${db.title} - Página Inicial`}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(e) => {
              // PREVÉM QUE A PÁGINA SEJA RECARREGADA NO SUBMIT DO FORM
              e.preventDefault();

              // MANDA PARA OUTRA PÁGINA PASSANDO O PARAMETRO NOME NA URL
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Diz aí seu nome para jogar" />
              <Button disabled={name === ''} type="submit">JOGAR {name}</Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/RenatoLomba/guardiao_da_ponte-base" />
    </QuizBackground>
  );
}

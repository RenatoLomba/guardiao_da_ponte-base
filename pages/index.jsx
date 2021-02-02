/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import Link from '../src/components/Link';

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
        <Widget 
          as={motion.section}
          transition={{ duration: 0.5 , delay: 0 }}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '-100%'}
          }}
          initial="hidden"
          animate="show"
        >
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
              <Input
                name="nomeDoUsuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz aí seu nome para jogar"
              />
              <Button disabled={name === ''} type="submit">JOGAR {name}</Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget 
          as={motion.section}
          transition={{ duration: 0.5 , delay: 0.5 }}
          variants={{
            show: {opacity: 1, x: '0'},
            hidden: {opacity: 0, x: '100%'}
          }}
          initial="hidden"
          animate="show">
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link, index) => {
                const [project, author] = 
                  link.replace('https:', '').replace('.vercel.app/', '').replace(/\//g, '').split('.');
                return (
                  <li>
                    <Widget.Topic 
                      as={Link}
                      key={`quiz__${index}`} 
                      href={`/quiz/${project}___${author}`}
                    >
                      {`${project[0].toUpperCase() + project.slice(1)} by ${author[0].toUpperCase() + author.slice(1)}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer 
          as={motion.footer}
          transition={{ duration: 0.5 , delay: 1 }}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'}
          }}
          initial="hidden"
          animate="show"/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/RenatoLomba/guardiao_da_ponte-base" />
    </QuizBackground>
  );
}

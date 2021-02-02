/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';

const LoadingWidget = () => (
    <Widget>
        <Widget.Header>
            Carregando...
        </Widget.Header>

        <Widget.Content>
            [Desafio do Loading]
        </Widget.Content>
    </Widget>
);

const ResultWidget = ({ results }) => (
    <Widget>
        <Widget.Header>
            Resultado do Quiz
        </Widget.Header>

        <Widget.Content>
            {/* <p>Você acertou {results.reduce((sum, result) => (result ? sum + 1 : sum), 0)} perguntas</p> */}
            <p>Você acertou {results.filter((x) => x).length} perguntas</p>
            <ul>
                {results.map((result, index) => {
                    const acertou = result ? 'Acertou!' : 'Errou!';
                    return (<li key={`result__${index}`}>Pergunta {`#0${index + 1}: ${acertou}`}</li>);
                })}
            </ul>
        </Widget.Content>
    </Widget>
);

const QuestionWidget = ({ question, totalQuestions, onSubmit, questionIndex, addResult }) => {
    const [selectedAlt, setSelectedAlt] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlt === question.answer;
    const hasQuestionSelected = selectedAlt !== undefined;

    return (

        <Widget>
            <Widget.Header>
                <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />

            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <AlternativesForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setIsQuestionSubmited(false);
                            setSelectedAlt(undefined);
                        }, 2000);
                    }}
                >
                    {question.alternatives.map((alt, index) => {
                        const altId = `alternative__${index}`;
                        const selectAlternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlt === index;
                        return (
                            <div>
                                <Widget.Topic
                                    htmlFor={altId}
                                    as="label"
                                    key={altId}
                                    data-selected={isSelected}
                                    data-status={isQuestionSubmited && selectAlternativeStatus}
                                >
                                    <input
                                        style={{display: 'none'}}
                                        id={altId}
                                        type="radio"
                                        name={questionId}
                                        onClick={() => setSelectedAlt(index)}
                                    />
                                    {alt}
                                </Widget.Topic>
                            </div>
                        );
                    })}
                    <Button type="submit" disabled={!hasQuestionSelected}>
                        Confirmar
                    </Button>

                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou...</p>}
                </AlternativesForm>

            </Widget.Content>
        </Widget>
    );
};

// ESTADOS DE CONTROLE DA PÁGINA
const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    // MUDA O ESTADO DA PÁGINA
    const totalQuestions = db.questions.length;
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const [results, setResults] = useState([]);
    const [questionIndex, setIndex] = useState(0);
    const question = db.questions[questionIndex];

    const addResult = (result) => {
        setResults([
            ...results,
            result
        ]);
    };

    // CHAMA O USE EFFECT QUANDO CARREGAR A PÁGINA APENAS UMA VEZ
    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1000);
    }, []);

    // MUDA A QUESTÃO DA PÁGINA
    const handleSubmitQuiz = () => {
        if (questionIndex >= totalQuestions - 1) {
            setScreenState(screenStates.RESULT);
        } else {
            setIndex(questionIndex + 1);
        }
    };

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>{`${db.title} - Quiz`}</title>
            </Head>
            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        totalQuestions={totalQuestions}
                        questionIndex={questionIndex}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}

                {screenState === screenStates.RESULT && <ResultWidget results={results} />}

            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/RenatoLomba/guardiao_da_ponte-base" />
        </QuizBackground>
    );
}

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExtern }) {
  // const [db, setDb] React.useState({})
  // React.useEffect(() => {
  // });
  console.log(dbExtern);
  return (
    <>
        <ThemeProvider theme={dbExtern.theme}>
            <QuizScreen
                externalQuestions={dbExtern.questions}
                externalBg={dbExtern.bg}
                externalTitle={dbExtern.title}
            />
        </ThemeProvider>
    </>
  );
}

//SERVER SIDE RENDER
export async function getServerSideProps(context) {
    const [project, author] = context.query.id.split('___');

    const dbExtern = await fetch(`https://${project}.${author}.vercel.app/api/db`)
        .then((response) => {
            if(response.ok)
                return response.json();

            throw new Error('Falha em pegar os dados');
        })
        .catch((error) => {
            console.error(error);
        });

    return {
        props: {
            dbExtern,
        }, // will be passed to the page component as props
    };
};

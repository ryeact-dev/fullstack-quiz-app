import { DUMMY_DATA } from '@/data/dummyData';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { randomNumber } from '@/helpers/randomNumber';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetAllQuestions } from '@/hooks/question.hook';
import { Home, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function TakeQuiz() {
  const navigate = useNavigate();
  const { subject } = useLocation().state;
  const [endQuiz, setEndQuiz] = useState(false);

  const { data: listOfQuestions } = useGetAllQuestions(subject, 0, 100);

  const [quizInfo, setQuizInfo] = useState({
    questionNumber: 0,
    questionCounter: 1,
    score: 0,
    selectedAnswer: null,
    isAnswerSubmitted: false,
  });

  const {
    questionNumber,
    questionCounter,
    score,
    selectedAnswer,
    isAnswerSubmitted,
  } = quizInfo;

  const handleSelectAnswer = (index) => {
    if (isAnswerSubmitted) return;
    setQuizInfo({ ...quizInfo, selectedAnswer: index });
  };

  const handleHomeClick = () => {
    navigate('/', { replace: true });
  };

  const handleEndQuiz = () => {
    setEndQuiz(true);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer && !isAnswerSubmitted) {
      setQuizInfo({ ...quizInfo, isAnswerSubmitted: true });
      if (
        selectedAnswer ===
        Number(listOfQuestions?.questions[questionNumber]?.answer) + 1
      ) {
        setQuizInfo({ ...quizInfo, score: score + 1, isAnswerSubmitted: true });
      }
      return;
    }

    // Create random number for random question
    // const randomIndex = randomNumber(questionNumber, DUMMY_DATA.length);

    setQuizInfo({
      ...quizInfo,
      questionNumber: questionNumber + 1,
      selectedAnswer: null,
      isAnswerSubmitted: false,
      questionCounter: questionCounter + 1,
    });
  };

  useEffect(() => {
    if (Number(questionCounter) > listOfQuestions?.questions?.length)
      setEndQuiz(true);
  }, [questionCounter]);

  return (
    <>
      <div className='w-full max-w-xl flex justify-between'>
        <Button
          className='mb-6'
          variant='destructive'
          onClick={handleHomeClick}
        >
          <Home size={18} className='mr-1' /> Home
        </Button>
        <Button onClick={handleEndQuiz} disabled={endQuiz}>
          <XCircle size={18} className='mr-1' /> End Quiz
        </Button>
      </div>
      <Card className='max-w-xl w-full'>
        {!endQuiz ? (
          <>
            <CardHeader>
              <CardTitle className='text-blue-500'>
                Question #{questionCounter}
              </CardTitle>
              <CardDescription className='text-lg text-slate-700 font-semibold'>
                {listOfQuestions?.questions[questionNumber]?.question}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              {listOfQuestions?.questions[questionNumber]?.options.map(
                (option, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    size=''
                    className={`w-full text-lg py-7 border-slate-500 hover:bg-blue-300 hover:text-foreground justify-start text-wrap text-left leading-4 ${
                      selectedAnswer === index + 1 ? 'bg-blue-300' : ''
                    } ${
                      isAnswerSubmitted &&
                      Number(
                        listOfQuestions?.questions[questionNumber]?.answer
                      ) === index
                        ? 'bg-green-300'
                        : isAnswerSubmitted && selectedAnswer === index + 1
                        ? 'bg-red-400'
                        : ''
                    }  `}
                    onClick={() => handleSelectAnswer(index + 1)}
                  >
                    {option}
                  </Button>
                )
              )}
            </CardContent>
            <CardFooter className='flex justify-between'>
              <div className='flex flex-col items-center'>
                <Badge className='text-base font-bold px-6'>You Scores:</Badge>
                <p className='text-2xl font-medium '>
                  {`${score} out of ${listOfQuestions?.questions?.length}`}
                </p>
              </div>
              <Button
                disabled={selectedAnswer === null}
                size='lg'
                className={`w-auto text-xl py-8 ${
                  selectedAnswer && isAnswerSubmitted
                    ? 'bg-accent hover:bg-accent/90'
                    : 'bg-primary hover:bg-primary/90'
                } `}
                onClick={handleSubmitAnswer}
              >
                {selectedAnswer && isAnswerSubmitted
                  ? 'Next Question'
                  : ' Submit Answer'}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardHeader className='text-center py-10 gap-4'>
            <CardTitle className='text-blue-500 text-3xl font-bold'>
              Your Scores:
              <CardDescription className='text-3xl text-slate-700 font-semibold'>
                {score}/{listOfQuestions?.questions?.length}
              </CardDescription>
            </CardTitle>
            <Button
              size='lg'
              className='w-auto text-xl py-8 bg-blue-500 hover:bg-blue-700'
              onClick={() => window.location.reload()}
            >
              Reset Quiz
            </Button>
          </CardHeader>
        )}
      </Card>
    </>
  );
}

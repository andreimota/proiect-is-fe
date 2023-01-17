import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Typography, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import GenericButton from "../../components/GenericButton";

import { Answer, Question, Quiz } from "../../types/Quiz/Quiz.types";

import api from "../../api/api";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState<Question>({} as Question);
  const [currentAnswer, setCurrentAnswer] = useState(0);

  const [questionState, setQuestionState] = useState<any[]>([]);

  const [currentScore, setCurrentScore] = useState(0);

  const [radioButtonColor, setRadioButtonColor] = useState<any>("secondary");
  const [textColor, setTextColor] = useState<any>("white");
  const [questionStatus, setQuestionStatus] = useState("");

  useEffect(() => {
    api
      .get(`/quiz/${quizId}`)
      .then(response => {
        setQuiz(response);
        setQuestion(response?.questions?.at(0) || {} as Question);
        setQuestionState(Array(response.questions.length).fill(undefined));
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setQuestion(quiz?.questions?.at(questionNumber) || {} as Question);
  }, [questionNumber]);

  useEffect(() => {
    switch(questionState.at(questionNumber)?.isCorrect) {
    case true: 
      setRadioButtonColor("success");
      setTextColor("#2a812e");
      setQuestionStatus("Correct!");
      break;
    case false: 
      setRadioButtonColor("error");
      setTextColor("#d32f2f");
      setQuestionStatus("Incorrect.");
      break;
    default: 
      setRadioButtonColor("secondary");
      setTextColor("white");
      setQuestionStatus("");
      break;
    }
    
  }, [JSON.stringify(questionState), questionNumber]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(questionState.at(questionNumber) === undefined)
      setCurrentAnswer(parseInt((e.target as HTMLInputElement).value));
  };

  const handleNavigation = (count: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(!((questionNumber + count) < 0) && !((questionNumber + count) === quiz?.questions?.length)) {
      setCurrentAnswer(questionState[questionNumber + count]?.answerId);
      setQuestionNumber(questionNumber + count);
    }
  };

  const handleAttemptFinish = () => {
    const { id: userId } = jwtDecode(localStorage.getItem("jwt") as string) as any;

    api
      .put({ score: currentScore }, `/quiz/${quiz.courseId}/${userId}`)
      .then(response => {
        navigate("/courses");
        
        toast("Quiz score sent! Your best attempt will be saved.", {
          type: "success"
        });
      });
  };

  const handleAnswerSubmit = () => {
    if(questionState[questionNumber] === undefined) {
      const answer: any = question?.answers?.find(ans => ans.id === currentAnswer);
      const updatedQuestionState = [
        ...questionState.slice(0, questionNumber),
        { 
          answerId: currentAnswer,
          isCorrect: answer.isCorrect,
        },
        ...questionState.slice(questionNumber + 1)
      ];

      setQuestionState(updatedQuestionState);

      setCurrentScore(currentScore + (answer.isCorrect ? 1 : 0));
    }
  };

  useEffect(() => {
    console.log(quiz?.questions?.length);
  }, [quiz?.questions?.length]);

  return(
    <Container maxWidth='md' sx={{marginTop: "5rem"}}>
      <Grid container direction="column">
        <Grid item>
          <Typography textAlign="center" variant="h3">{"Quiz: " + quiz.title}</Typography>
          <Typography color="secondary" textAlign="center" variant="h4">{`${currentScore} / ${quiz?.questions?.length || 0} points`}</Typography>
        </Grid>
        <Grid item sx={{marginTop: "3rem"}}>
          <FormControl>
            <FormLabel>
              <Grid container direction="row" alignItems="stretch">
                <Typography>{(questionNumber + 1) + ". " + question.text}</Typography>
                <Typography color={textColor} textAlign="center">{questionStatus}</Typography>
              </Grid>
            </FormLabel>
            <RadioGroup
              name="question"
              value={currentAnswer || 0}
              onChange={handleAnswerChange}
            >
              {
                question?.answers?.map(ans => <FormControlLabel key={ans.id} value={ans.id} control={<Radio color={radioButtonColor} />} label={ans.text} />)
              }
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid container item direction="row" justifyContent="space-between" sx={{marginTop: "4rem"}}>
          <GenericButton onClick={handleNavigation(-1)}>Previous Question</GenericButton>
          <GenericButton onClick={handleAnswerSubmit}>Submit answer</GenericButton>
          {
            questionNumber < quiz?.questions?.length - 1 ?
              <GenericButton onClick={handleNavigation(1)}>Next Question</GenericButton>
              :
              <GenericButton onClick={handleAttemptFinish}>Finish Attempt</GenericButton>
          }
        </Grid>
      </Grid>
    </Container>
  ); 
};

export default QuizPage;
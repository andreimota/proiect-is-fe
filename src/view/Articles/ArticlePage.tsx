import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, CircularProgress, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Compiler from "../../components/Compiler/Compiler";

import "./Articles.css";

import { Article, Course } from "./CourseTypes";
import api from "../../api/api";
import GenericButton from "../../components/GenericButton";


const languagesByTechnology = {
  "Python": "python3",
  "C#": "csharp",
  "JavaScript": "nodejs"
};

const ArticlePage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState<Course>({} as Course);

  const [currentArticle, setCurrentArticle] = useState<Article | undefined>({} as Article);
  const [currentArticleOrder, setCurrentArticleOrder] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(currentArticle?.paragraphs) {
      const paragraphCopy = [...currentArticle.paragraphs];
      paragraphCopy.sort((a, b) => a.order - b.order);

      setCurrentArticle({
        ...currentArticle,
        paragraphs: paragraphCopy,
      });
    }
  }, [currentArticle?.paragraphs?.length]);

  useEffect(() => {
    const firstArticle = course?.articles?.filter(art => art.order === currentArticleOrder);

    if(firstArticle?.length) {
      setCurrentArticle(firstArticle?.at(0));
    }
  }, [currentArticleOrder, course]);

  useEffect(() => {
    api
      .get(`/course/${courseId}`)
      .then(response => {
        setCourse(response);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleArticleChange = (change: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentArticleOrder(currentArticleOrder + change);
  };

  return <>
    <Box className="article">
      {loading ? 
        <Grid container item justifyContent="center" alignItems="center" marginTop="20rem">
          <CircularProgress color="secondary" />
        </Grid>
        :
        <> 
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={9} justifyContent="center" alignItems="center">
              <Typography variant="h2">{currentArticle?.title}</Typography>
            </Grid>
            <Grid container item direction="row" xs={3} alignItems="center" justifyContent="flex-end">
              <Grid container item xs={3}>
                <Avatar alt={course?.author?.lastName} src="" />
              </Grid>
              <Grid container item direction="column" xs={5} marginTop="0.2rem">
                <Typography fontSize="14px" color="secondary">{course?.author?.firstName + " " + course?.author?.lastName}</Typography>
                <Typography fontSize="14px">{(new Date(course?.publishedAt)).toDateString()}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="column" className="paragraph">
            {currentArticle?.paragraphs?.map(paragraph => (
              <Grid container item key={paragraph.id}>
                <Typography>{paragraph.textSection}</Typography>
                {paragraph.codeSection && <Compiler language={languagesByTechnology[course.technology as keyof typeof languagesByTechnology]} code={paragraph.codeSection}/>}
              </Grid>
            ))}
          </Grid>
          <Grid container direction="row" alignItems="flex-end" justifyContent="space-between" marginTop="5rem"> {/* Navigation */}
            <GenericButton disabled={currentArticleOrder <= 1} onClick={handleArticleChange(-1)}>Previous Article</GenericButton>
            <GenericButton disabled={currentArticleOrder > course?.articles?.length} onClick={handleArticleChange(+1)}>Next Article</GenericButton>
          </Grid>
        </>
      }
    </Box>
  </>;
};

export default ArticlePage;
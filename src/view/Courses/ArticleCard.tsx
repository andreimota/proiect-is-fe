import React from "react";

import { Grid, Typography } from "@mui/material";

import { Article } from "./CourseTypes";

import "./Courses.css";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Article
}

const ArticleCard = ({
  course,
} : CourseCardProps) => {
  return (
    <Grid container direction="row" className="card">
      <Grid item xs={3} md={3}> {/* Image */}
        <img src="./react.jpg"></img>
      </Grid>
      <Grid container item direction="column" xs={9} md={9} columnSpacing={3}> {/* Content */}
        <Link to={`/course/${course.id}`} className="course-link">{course.title}</Link>
        <Typography paddingBottom="1rem">{course.description}</Typography>
        <Typography>{course.technology}</Typography>
      </Grid>
    </Grid>
  );
};

export default ArticleCard;
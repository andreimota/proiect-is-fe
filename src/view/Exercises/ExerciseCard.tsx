import React from "react";

import { Grid, Typography } from "@mui/material";

import "./Exercises.css";
import { Link } from "react-router-dom";
import { Exercise } from "./Exercises.types";
 
interface CourseCardProps {
  exercise: Exercise
}

const ExerciseCard = ({
  exercise,
} : CourseCardProps) => {
  return (
    <Grid container direction="row" className="card">
      <Grid container item direction="column" xs={9} md={9} columnSpacing={3}> {/* Content */}
        <Link to={`/exercise/${exercise.id}`} className="course-link">{exercise.title}</Link>
        <Grid container direction="row">
          <Typography fontWeight="bold" color="secondary">{exercise.technology}</Typography>
          <Typography marginLeft="2rem" fontSize="16px" fontFamily="Frutiger" color="grey">{exercise.difficulty}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExerciseCard;
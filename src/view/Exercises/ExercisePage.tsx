import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import ExerciseCompiler from "../../components/Compiler/ExerciseCompiler";
import { Exercise } from "./Exercises.types";

const ExercisePage = () => {
  const { exerciseId } = useParams();

  const [exercise, setExercise] = useState<Exercise>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/exercise/${exerciseId}`)
      .then(res => {
        setExercise(res);
        setLoading(false);
      });
  }, []);

  return <Box className="article">
    {loading ? 
      <Grid container item justifyContent="center" alignItems="center" marginTop="20rem">
        <CircularProgress color="secondary" />
      </Grid>
      :
      <> 
        <Grid item xs={9} justifyContent="center" alignItems="center">
          <Typography variant="h2">{exercise?.title}</Typography>
        </Grid>
        <Grid container direction="column" className="paragraph">
          <Typography>{exercise?.text}</Typography>
          <ExerciseCompiler exerciseId={exercise?.id || 0} code={exercise?.startingCode || ""}/>
        </Grid>
      </>
    }
  </Box>;
};

export default ExercisePage;


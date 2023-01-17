import React, { useEffect, useState } from "react";

import { CircularProgress, Container, Grid, Pagination, Typography } from "@mui/material";

import api from "../../api/api";
import { Exercise } from "./Exercises.types";
import ExerciseCard from "./ExerciseCard";
import ExerciseFilters from "./ExerciseFilters";

import "./Exercises.css";


const Exercises = () => {
  const [loading, setLoading] = useState(true);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  
  const exercisesPerPage = 5;

  const handlePageChange = ( event: React.ChangeEvent<unknown>, value: number ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    
    api.get("/exercise")
      .then((response) => {
        setTimeout(() => {
          setExercises(response);
          setLoading(false);
        }, 1000);
        
        
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setFilteredExercises(exercises);
  }, [exercises]);

  useEffect(() => {
    setCurrentPage(1);
    setPages(Math.ceil(exercises.length / exercisesPerPage));
  }, [filteredExercises.length, exercisesPerPage]);

  useEffect(() => {
    const lastCourseIndex = currentPage * exercisesPerPage;
    const firstCourseIndex = lastCourseIndex - exercisesPerPage;
    
    setCurrentExercises(filteredExercises.slice(firstCourseIndex, lastCourseIndex));
  }, [currentPage, filteredExercises]);

  return (
    <>
      <Typography variant="h3" className="title">Exercises</Typography>

      <Grid container spacing={5}>
        <Grid item xs={3} md={3}> {/* Filters */}
          <ExerciseFilters exercises={exercises} setFilteredExercises={setFilteredExercises} />
        </Grid>

        {loading ? /* exercises */
          <Grid container item xs={9} md={9} justifyContent="center" alignItems={"center"}>
            <CircularProgress color="secondary" />
          </Grid> 
          :
          <Grid item xs={9} md={9}> 
            {
              currentExercises.map( exercise => (
                <ExerciseCard exercise={exercise} key={exercise.id}/>
              ))
            }
            <Grid container justifyContent="center">
              <Pagination count={pages} page={currentPage} color="secondary" className="pagination" onChange={handlePageChange}/>
            </Grid>
          </Grid>
        }
      </Grid>
    </>
  );
};

export default Exercises;
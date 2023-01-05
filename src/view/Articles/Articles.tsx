import React, { useEffect, useState } from "react";

import { CircularProgress, Container, Grid, Pagination, Typography } from "@mui/material";
import { Course } from "./CourseTypes";

import ArticleCard from "./ArticleCard";

import "./Articles.css";
import ArticleFilters from "./ArticleFilters";
import api from "../../api/api";


const Articles = () => {
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [currentCourses, setCurrentCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  
  const coursesPerPage = 5;

  const handlePageChange = ( event: React.ChangeEvent<unknown>, value: number ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    
    api.get("/course")
      .then((response) => {
        setTimeout(() => {
          setCourses(response);
          setLoading(false);
        }, 1000);
        
        
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    setCurrentPage(1);
    setPages(Math.ceil(courses.length / coursesPerPage));
  }, [filteredCourses.length, coursesPerPage]);

  useEffect(() => {
    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    
    setCurrentCourses(filteredCourses.slice(firstCourseIndex, lastCourseIndex));
  }, [currentPage, filteredCourses]);

  return (
    <>
      <Typography variant="h3" className="title">Course library</Typography>

      <Grid container spacing={5}>
        <Grid item xs={3} md={3}> {/* Filters */}
          <ArticleFilters articles={courses} setFilteredArticles={setFilteredCourses} />
        </Grid>

        {loading ? /* Courses */
          <Grid container item xs={9} md={9} justifyContent="center" alignItems={"center"}>
            <CircularProgress color="secondary" />
          </Grid> 
          :
          <Grid item xs={9} md={9}> 
            {
              currentCourses.map( course => (
                <ArticleCard course={course} key={course.id}/>
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

export default Articles;
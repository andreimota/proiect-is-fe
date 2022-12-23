import React, { useEffect, useState } from "react";

import { Container, Grid, Pagination, Typography } from "@mui/material";
import { Article } from "./CourseTypes";

import ArticleCard from "./ArticleCard";

import "./Courses.css";
import ArticleFilters from "./ArticleFilters";
import api from "../../api/api";


const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticles, setCurrentArticles] = useState<Article[]>([].slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);
  
  const coursesPerPage = 5;
  const pages = Math.ceil(articles.length / coursesPerPage);

  const handlePageChange = ( event: React.ChangeEvent<unknown>, value: number ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    api.get("/article")
      .then((response) => )
  }, []);

  useEffect(() => {
    const lastCourseIndex = currentPage * coursesPerPage;
    const firstCourseIndex = lastCourseIndex - coursesPerPage;
    
    setCurrentArticles(articles.slice(firstCourseIndex, lastCourseIndex));
  }, [currentPage]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" className="title">Course library</Typography>

      <Grid container spacing={5}>
        <Grid item xs={3} md={3}> {/* Filters */}
          {/* <ArticleFilters courses={articles} setFilteredCourses={setFilteredCourses} /> */}
        </Grid>

        <Grid item xs={9} md={9}> {/* Courses */}
          {
            currentArticles.map( course => (
              <ArticleCard course={course} key={course.id}/>
            ))
          }
          <Grid container justifyContent="center">
            <Pagination count={pages} page={currentPage} color="secondary" className="pagination" onChange={handlePageChange}/>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Articles;
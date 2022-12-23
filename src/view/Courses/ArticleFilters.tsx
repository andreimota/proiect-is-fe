import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextInput from "../../components/TextInput";

import { Article } from "./CourseTypes";

interface CourseFiltersProps {
  courses: Article[],
  setFilteredCourses: Dispatch<React.SetStateAction<Article[]>>
}

const ArticleFilters = ({ courses, setFilteredCourses }: CourseFiltersProps) => {
  const [searchWord, setSearchWord] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });
  
  const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setSearchWord(e.target.value.toLowerCase());
  };

  const handleDifficultyChange = ( e: ChangeEvent<HTMLInputElement>, checked: boolean ) => {
    setDifficultyFilter({
      ...difficultyFilter,
      [e.target.name]: checked
    });
  };

  return (
    <Box sx={{ borderRadius: "25px" }}>
      <Typography variant="h5" padding="1rem 1rem 1rem 0rem">Filters</Typography>

      <TextInput 
        label="Search"
        className="search-input"
        value={searchWord}
        onChange={handleChange}
      />

      <Accordion defaultExpanded className="accordions">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Difficulty</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row">
            <Checkbox  color="secondary" name="beginner" onChange={handleDifficultyChange} />
            <Typography paddingTop="0.6rem">Beginner</Typography>
          </Grid>
          <Grid container direction="row">
            <Checkbox color="secondary" name="intermediate" onChange={handleDifficultyChange} />
            <Typography paddingTop="0.6rem">Intermediate</Typography>
          </Grid>
          <Grid container direction="row">
            <Checkbox color="secondary" name="advanced" onChange={handleDifficultyChange} />
            <Typography paddingTop="0.6rem">Advanced</Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Topic</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row">
            <Checkbox  color="secondary" />
            <Typography paddingTop="0.6rem">React</Typography>
          </Grid>
          <Grid container direction="row">
            <Checkbox color="secondary" />
            <Typography paddingTop="0.6rem">C#</Typography>
          </Grid>
          <Grid container direction="row">
            <Checkbox color="secondary" />
            <Typography paddingTop="0.6rem">Python</Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ArticleFilters;
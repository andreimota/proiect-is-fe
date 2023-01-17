import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import TextInput from "../../components/TextInput";


import stringHelpers from "../../common/stringHelpers";
import { Exercise } from "./Exercises.types";

interface CourseFiltersProps {
  exercises: Exercise[]
  setFilteredExercises: Dispatch<SetStateAction<Exercise[]>>
}

interface Filter {
  searchWord: string
  difficultyFilters: string[]
  technologyFilters: string[]
}

const difficulties = ["beginner", "intermediate", "advanced"];
const technologies = ["python", "javascript"];

const ExerciseFilters = ({ exercises, setFilteredExercises }: CourseFiltersProps) => {
  const [filters, setFilters] = useState<Filter>({
    searchWord: "",
    difficultyFilters: difficulties,
    technologyFilters: technologies
  });
  
  const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setFilters({
      ...filters,
      searchWord: e.target.value.trim().toLowerCase()
    });
  };

  const handleCheckboxChange = ( filterType: string ) => ( e: ChangeEvent<HTMLInputElement>, checked: boolean ) => {
    let newFilter: string[] = [];

    if(checked) {
      newFilter = [...(filters[filterType as keyof Filter] as string[]), e.target.name];
    } else {
      newFilter = (filters[filterType as keyof Filter] as string[]).filter(item => item !== e.target.name);
    }

    setFilters({
      ...filters,
      [filterType]: newFilter
    });
  };

  useEffect(() => {
    const filteredExercises = exercises
      .filter(item => 
        item.title.toLowerCase().includes(filters.searchWord) &&
        filters.difficultyFilters.includes(item.difficulty.toLowerCase()) &&
        filters.technologyFilters.includes(item.technology.toLowerCase())
      );
    console.log(filters);
    setFilteredExercises(filteredExercises);
  }, [filters, filters.difficultyFilters.length, filters.technologyFilters.length]);

  return (
    <Box sx={{ borderRadius: "25px" }}>
      <Typography variant="h5" padding="1rem 1rem 1rem 0rem">Filters</Typography>

      <TextInput 
        label="Search"
        className="search-input"
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
          {difficulties.map(difficulty => (
            <Grid container direction="row" key={difficulty}>
              <Checkbox defaultChecked color="secondary" name={difficulty} onChange={handleCheckboxChange("difficultyFilters")} />
              <Typography paddingTop="0.6rem">{stringHelpers.capitalize(difficulty)}</Typography>
            </Grid>
          ))}
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
          {technologies.map(technology => (
            <Grid container direction="row" key={technology}>
              <Checkbox defaultChecked color="secondary" name={technology} onChange={handleCheckboxChange("technologyFilters")} />
              <Typography paddingTop="0.6rem">{stringHelpers.capitalize(technology)}</Typography>
            </Grid>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ExerciseFilters;
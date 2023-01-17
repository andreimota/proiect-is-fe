import React, { useEffect, useState } from "react";

import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import api from "../../api/api";
import jwtDecode from "jwt-decode";

import "./Dashboard.css";

interface DashboardCourse {
  id: number
  title: string
  technology: string
  difficulty: string
  image: any
  points: number
  quizTotalPoints: number
}

interface DashboardExercise {
  id: number
  title: string
  technology: string
  difficulty: string
  score: number
}

interface UserDashboard { 
  firstName: string
  lastName: string
  email: string
  username: string
  courses: DashboardCourse[]
  exercises: DashboardExercise[]
}

const Dashboard = () => {
  const jwt = localStorage.getItem("jwt");

  const {id: userId}: any = jwtDecode(jwt as string);

  const [userDashboard, setUserDashboard] = useState<UserDashboard>({} as UserDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/user/${userId}`)
      .then(response => {
        setUserDashboard(response);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h2">{`Welcome back, ${userDashboard?.username}!`}</Typography>

      <Typography variant="h3" marginTop="4rem">Your courses</Typography>
      <Grid container direction="row" sx={{overflowX: "scroll", flexWrap: "nowrap"}} spacing={2}>
        {
          userDashboard?.courses?.map(course => (
            <Grid item key={course.id}>
              <Card sx={{ width: "20rem", height: "20rem", backgroundColor: "#0D0D0E" }}>
                <CardContent>
                  <Grid container direction="column" >
                    <Grid item xs={9} sx={{height: "20"}}>
                      <img src={`data:image/jpeg;base64,${course.image}`}></img>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography component="a" href={`/course/${course.id}`} variant="h5" sx={{textDecoration: "none"}}>
                        {course.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="secondary">
                        {course.technology + "   " + course.difficulty}
                      </Typography>
                      {
                        course.quizTotalPoints !== 0 && <Typography variant="body2">
                          {`Quiz grade: ${course.points}/${course.quizTotalPoints}`}
                        </Typography>
                      }
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>)
          )
        }
      </Grid>

      <Typography variant="h3" marginTop="4rem">Your exercises</Typography>
      <Grid container direction="row" sx={{overflowX: "scroll", flexWrap: "nowrap"}} spacing={2}>
        {
          userDashboard?.exercises?.map(exercise => (
            <Grid item key={exercise.id}>
              <Card sx={{ width: "20rem", height: "10rem", backgroundColor: "#0D0D0E" }}>
                <CardContent>
                  <Typography component="a" href={`/course/${exercise.id}`} variant="h5" sx={{textDecoration: "none"}}>
                    {exercise.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="secondary">
                    {exercise.technology + "   " + exercise.difficulty}
                  </Typography>
                  {
                    <Typography variant="body2">
                      {`Points: ${exercise.score}/100`}
                    </Typography>
                  }
                </CardContent>
              </Card>
            </Grid>)
          )
        }
      </Grid>
    </Box>
  );
};

export default Dashboard;
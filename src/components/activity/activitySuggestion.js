import React from 'react';
import './activity.css';
import {
  Grid
} from '@mui/material'; 

function ActivitySuggestion(props) {
  const { data } = props;
  const activities = data?.prediction || [];

  return (
    <div className="activity-container">
      <h1>Eco-Friendly Activity Suggestions:</h1>
      <br />
      <Grid container>
        {activities.map((activity, index) => (
          <Grid item xs = {12} md = {3} sm = {6} className = "activity" key={index}>{activity}</Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ActivitySuggestion;

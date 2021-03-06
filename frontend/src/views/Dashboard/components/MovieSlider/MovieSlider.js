import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Paper, Link } from '@material-ui/core';
import MovieCard from '../../../../components/MovieCard';
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    position: 'relative'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  seeMore: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(3),
    padding: '0'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const MovieSlider = props => {
  const { movies, title, config, user, setPopup, userList, setUserList, movieIDs } = props;
  const classes = useStyles();

  const addToUserList = (id, list) => {
    console.log('adding to list: ' + list);
    setUserList({...userList, [id]: list})
  }

   
  return (
    <Paper className={classes.root}>
    <Typography variant="h5" component="h2" className={classes.title}>{title}</Typography>
    <Typography variant="button" className={classes.seeMore}>
    <Link component={RouterNavLink} to={'/movies/'+ encodeURI(title)}>
      View All
    </Link>
    </Typography>
    <Grid container justify="center" spacing={2}>
      {(movies || []).map(movie => (
        <Grid key={movie.id} item xs={6} sm={4}>
          <MovieCard movie={movie} base_url={config.base_url} userID={user ? user.sub : null} list={userList[movie.id]} id={movieIDs[movie.id]} addToUserList={addToUserList} setPopup={setPopup}/>
        </Grid>
      ))}
    </Grid>
    </Paper>
  );
};

MovieSlider.propTypes = {
  className: PropTypes.string
};

export default MovieSlider;

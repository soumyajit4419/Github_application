import React, { Component } from 'react';
import './App.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NavBar from './nav';
import UserCard from './UserCard';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


const axios = require('axios');
const GhPolyglot = require("gh-polyglot");


class App extends Component {
  state = {
    status: "",
    userName: '',
    name: '',
    imageUrl: '',
    linkUrl: '',
    noOfRepo: '',
    followers: '',
    following: '',
    bio: '',
    location: '',
    repoList: []
  }

  handleChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let x = this.state.userName;
    axios.get(`https://api.github.com/users/${x}`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          name: res.data.name,
          imageUrl: res.data.avatar_url,
          linkUrl: res.data.html_url,
          noOfRepo: res.data.public_repos,
          followers: res.data.followers,
          following: res.data.following,
          bio: res.data.bio,
          location: res.data.location,
          status: "200"

        })
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          status: "400"
        })
      });

    const me = new GhPolyglot(`${x}/git-stats`);
    me.userStats((err, stats) => {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(stats);
      }
    });
    me.getAllRepos((err, stats) => {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(stats);
      }
    });
  }

  render() {
    if (this.state.status === "200") {
      const userCard =
        <UserCard name={this.state.name} userName={this.state.userName}
          noOfRepo={this.state.noOfRepo}
          followers={this.state.followers}
          following={this.state.following}
          bio={this.state.bio}
          image={this.state.imageUrl}
          linkUrl={this.state.linkUrl}
          location={this.state.location}
        />
      return (
        <div style={{ textAlign: "center" }}>
          <NavBar />
          <Grid container spacing={2} style={{ paddingTop: "90px" }}> {userCard}</Grid>
        </div>
      )

    }
    else if (this.state.status === "400") {
      const errorCard =
        <Card >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Sry No User found.
            </Typography>
          </CardContent>
        </Card>
      return (
        <div>
          <NavBar />
          <Grid style={{ paddingTop: "90px", textAlign: "center" }}> {errorCard}</Grid>
        </div>
      );
    }

    return (
      <div className="App">
        <NavBar />
        <ValidatorForm
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >

          <TextValidator
            label="Enter Your User Name"
            onChange={this.handleChange}
            type="text"
            value={this.state.userName}
            id="outlined-basic"
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
            size='medium'
          />

          <br /><br />
          <Button variant="contained" color="primary" type="submit">
            Get Detail </Button>
        </ValidatorForm>

      </div>
    );
  }
}


export default App;

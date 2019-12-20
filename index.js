const axios = require("axios");
const inquirer = require("inquirer");
//const extractor = require("extractor");
const fs = require("fs");
const util = require("util");
inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub username:"
    },
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    }
  ])
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function(res) {
      console.log(res.data.avatar_url);
      console.log(res.data.login);
      console.log(res.data.location);
      /// https://www.google.com/maps/place/Richmond,+VA
      console.log(res.data.url);
      console.log(res.data.blog);
      console.log(res.data.bio);
      console.log(res.data.public_repos);
      console.log(res.data.followers);
      console.log(res.data.following);
      //console.log(res);
      //console.log(queryUrl);
    });
  });

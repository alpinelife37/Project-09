const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
//const extractor = require("extractor");
const writeFileAsync = util.promisify(fs.writeFile);
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
      const a = res.data;
      const avatar = a.avatar_url;
      const githubUser = a.login;
      const location = a.location;
      /// https://www.google.com/maps/place/Richmond,+VA
      const githubLink = a.url;
      const blogLink = a.blog;
      const bio = a.bio;
      const repos = a.public_repos;
      const followers = a.followers;
      const following = a.following;

      const queryUrlStars = `https://api.github.com/users/${username}/starred`;
      axios.get(queryUrl).then(function(stars) {
        console.log(queryUrlStars);
        const starsLength = stars.length;
        console.log(starsLength);
      });
    });
  });

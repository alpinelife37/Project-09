const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const htmlToPdf = require("electron-html-to");
const writeFileAsync = util.promisify(fs.writeFile);

function generateHTML(githubUserData) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${githubUserData.name}</h1>
    <p class="lead">I am from ${githubUserData.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${githubUserData.githubUser}</li>
      <li class="list-group-item">LinkedIn: ${githubUserData.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

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
      const name = a.name;
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
      axios.get(queryUrlStars).then(function(stars) {
        const starsLength = stars.data.length;

        const githubUserData = {
          name,
          avatar,
          githubUser,
          location,
          githubLink,
          blogLink,
          bio,
          repos,
          followers,
          following,
          starsLength
        };

        const html = generateHTML(githubUserData);
        console.log(html);
      });
    });
  });

// promptUser()
//   .then(function(answers) {
//     const html = generateHTML(answers);

//     return writeFileAsync("index.html", html);
//   })
//   .then(function() {
//     console.log("Successfully wrote to index.html");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

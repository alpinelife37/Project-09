const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const htmlToPdf = require("electron-html-to");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "what is your gitHub username?"
    },
    {
      type: "list",
      name: "color",
      message: "What color would you like your profile's template to be?",
      choices: ["red", "purple", "blue", "green"]
    }
  ]);
};
promptUser().then(function({ username }) {
  const queryUrl = `https://api.github.com/users/${username}`;
  axios.get(queryUrl).then(function(res) {
    const a = res.data;
    const name = a.name;
    const avatar = a.avatar_url;
    const githubUser = a.login;
    const location = a.location;
    const githubLink = a.html_url;
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
      console.log(queryUrl);
      const html = generateHTML(githubUserData);
      writeFileAsync("index.html", html);
      console.log(html);
    });
  });
});
function generateHTML(githubUserData) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      body {
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="card">
          <div class="card">
            <div class="image"><img src="${githubUserData.avatar}" height="150px" width="150px" alt="Profile Image"></div>
            <h1 class="name">Hi! My name is ${githubUserData.name}</h1>
            <div class="location">
            <a href="https://www.google.com/maps/place/${githubUserData.location}"><i class="fas fa-map-marked-alt"></i>${githubUserData.location}</a>
           
            </div>
            <div class="githublink">
            <a href="${githubUserData.githubLink}"><i class="fab fa-github"></i>Github</a>
            </div>
            <div class="blog">
            <a href="${githubUserData.blogLink}"><i class="fas fa-blog"></i>Blog</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
       <br />
        <div class="bio">${githubUserData.bio}</div>
      </div>
       <br />
      <div class="row">
        <div class="card publicRepos">Number of public repositories ${githubUserData.repos}</div>
        <div class="card followers">Followers ${githubUserData.followers}</div>
        <div class="card githubStars">Github Stars ${githubUserData.starsLength}</div>
        <div class="card following">Following ${githubUserData.following}</div>
      </div>
    </div>
     <script
      src="https://kit.fontawesome.com/2308dc1f41.js"
      crossorigin="anonymous"
    ></script>
  </body>
</html>

`;
}

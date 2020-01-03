const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const htmlToPdf = require("electron-html-to");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "what is your gitHub username?"
    },
    {
      type: "list",
      name: "colors",
      message: "What color would you like your profile's template to be?",
      choices: ["green", "blue", "pink", "red"]
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
function generateHTML(githubUserData, colors) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Github Profile</title>
    <style>@page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="card">
          <div class="card">
            <div class="image"><img src="${
              githubUserData.avatar
            }" height="150px" width="150px" alt="Profile Image"></div>
            <h1 class="name">Hi! My name is ${githubUserData.name}</h1>
            <div class="location">
            <a href="https://www.google.com/maps/place/${
              githubUserData.location
            }"><i class="fas fa-map-marked-alt"></i>${
    githubUserData.location
  }</a>
           
            </div>
            <div class="githublink">
            <a href="${
              githubUserData.githubLink
            }"><i class="fab fa-github"></i>Github</a>
            </div>
            <div class="blog">
            <a href="${
              githubUserData.blogLink
            }"><i class="fas fa-blog"></i>Blog</a>
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
        <div class="card col col-sm-6 publicRepos">Number of public repositories ${
          githubUserData.repos
        }</div>
        <div class="card col col-sm-6 followers">Followers ${
          githubUserData.followers
        }</div>
        <div class="card col col-sm-6 githubStars">Github Stars ${
          githubUserData.starsLength
        }</div>
        <div class="card col col-sm-6 following">Following ${
          githubUserData.following
        }</div>
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

const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
//const extractor = require("extractor");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
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
    ]);
}
    
  function axiosCall () = (function({ username }) {
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
      axios.get(queryUrl).then(function(stars) {
        console.log(queryUrlStars);
        const starsLength = stars.length;
        console.log(starsLength);
      });
    });
});
  
function generateHTML(username) {
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
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}
async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();
    const axios = axiosCall(username);
    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

init();


const core = require('@actions/core');
const github = require('@actions/github');
const https = require("https");
const fs = require('fs');
const path = require('path')


try {
  const options = {
    hostname: 'api.github.com',
    method : 'GET',
    path: '/search/repositories?q=topic:hack-for-la&sort=updated&order=desc',
    headers: {
      'Accept': 'application/vnd.github.mercy-preview+json',
      'User-Agent': 'HackForLA'
    }
  }
  https.get(options, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body)
      let newBody = JSON.stringify(body, null, 2);

      let jsonPath = path.join(__dirname, '..', 'db', 'db.json');
      core.setOutput("json", newBody)
      // fs.writeFileSync(jsonPath, newBody)
    });
  });
  // let jsonPath = path.join(__dirname, '..', 'db', 'db.json');
  // console.log(jsonPath);
  // let newFileInfo = JSON.parse(fs.readFileSync(jsonPath, "utf8", 'r+'));
  // console.log("it worked!");
  // console.log(newFileInfo);
} catch (error) {
  // let jsonPath = path.join(__dirname, '..', 'db', 'db.json');
  // let newFileInfo = JSON.parse(fs.readFileSync(jsonPath, "utf8", 'r+'));
  // console.log(newFileInfo);
  core.setFailed(error.message);
}

// required packages
const branchName = require('current-git-branch');
const Cache = require("@11ty/eleventy-cache-assets");
const fs = require('fs');
const request = require('request');

let rawdata = fs.readFileSync('_data/config.json');
let config = JSON.parse(rawdata);

console.log('ELEVENTY_ENV:',process.env.ELEVENTY_ENV)
console.log('BRANCH:', process.env.BRANCH)
var client = process.env.BRANCH;
if (branchName() != '(HEAD detached at FETCH_HEAD)' ) { client = branchName(); }
console.log('site client:', client)

var urls = [];
urls = config.websites.map(function (url) {
  return url.url
});

var requestAsync = function(url) {
  return Cache(url, {
    duration: "1s", // 1 day
    type: "json" // also supports "text" or "buffer"
  });
};

module.exports = async function() {
  var getParallel = async function() {
    //transform requests into Promises, await all
    try {
        var data = await Promise.all(urls.map(requestAsync));
    } catch (err) {
        console.error(err);
    }
    return(data)
  }
  return getParallel();
};

// Promises!
import fs from "node:fs/promises";

type User = {
  name: string;
  age: number;
  region: string;
};

type NewsArticle = {
  id: string;
  headline: string;
  content: string;
};

type Regions = {
  [key: string]: string[];
};

let user: User;
let regions: Record<string, string[]>; //
let allNews: Array<NewsArticle>; // NewsArticle[]

// Promise ... -> receipt that some work is being done.
// new Promise()
// - pending
// - settled
//		- resolved <- i got my food! async operation has finished successfully.
//    - rejected

fs.readFile("user.json", "utf-8")
  .then((data) => {
    user = JSON.parse(data);
    return fs.readFile("regions.json", "utf-8");
  })
  .then((data) => {
    regions = JSON.parse(data);
    return fs.readFile("news.json", "utf-8");
  })
  .then((data) => {
    allNews = JSON.parse(data);
    const userRegionIDs = regions[user.region];
    const userNews = allNews.filter((article) =>
      userRegionIDs?.includes(article.id),
    );

    userNews.forEach((article) => {
      console.log(article.headline);
      console.log(article.content);
      console.log("-------");
    });
  });
// 1 -> 2 -> 3 -> ....
// 1 ...
// 2 ..    ->
// 3 ....

Promise.all([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
])
  .then(([userString, regionString, newsString]) => {
    let user: User = JSON.parse(userString);
    let regions: Record<string, string[]> = JSON.parse(regionString);
    let allNews: NewsArticle[] = JSON.parse(newsString);
    const userRegionIDs = regions[user.region];
    const userNews = allNews.filter((article) =>
      userRegionIDs?.includes(article.id),
    );

    userNews.forEach((article) => {
      console.log(article.headline);
      console.log(article.content);
      console.log("-------");
    });
  })
  .catch((err) => {
    console.log(err);
  });

Promise.allSettled([
  fs.readFile("user.json", "utf-8"),
  fs.readFile("regions.json", "utf-8"),
  fs.readFile("news.json", "utf-8"),
]).then(([userObj, regionObj, newsObj]) => {
  if (userObj.status === "fulfilled") {
    user = JSON.parse(userObj.value);
  } else {
    user = { region: "NI", age: 12, name: "Bob" };
  }
});

const pr = fs.readFile("user.json", "utf-8");

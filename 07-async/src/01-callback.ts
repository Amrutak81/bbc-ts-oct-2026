// callbacks -> Promises (2015) -> async/await (2017)
import fs from "node:fs";

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
// Callback Hell!
fs.readFile("user.json", "utf-8", (err: Error | null, data: string) => {
  if (err) {
    console.log(err);
  }
  const user: User = JSON.parse(data);
  fs.readFile("regions.json", "utf-8", (err: Error | null, data: string) => {
    if (err) {
      console.log(err);
    }
    const regions = JSON.parse(data);
    const regionArticles = regions[user.region];
    fs.readFile("news.json", "utf-8", (err: Error | null, data: string) => {
      if (err) {
        console.log(err);
      }
      const allNews: NewsArticle[] = JSON.parse(data);
      const userNews = allNews.filter((article) =>
        regionArticles.includes(article.id),
      );
      userNews.forEach((news) => {
        console.log(news.headline);
        console.log(news.content);
        console.log("---------------");
      });
    });
  });
});

// No access to the data!!

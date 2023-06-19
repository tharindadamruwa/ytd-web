const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

const isYouTubeLink = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;

  // Check if the URL matches the YouTube regex
  if (youtubeRegex.test(url)) {
    return true; // It is a YouTube link
  } else {
    return false; // It is not a YouTube link
  }
};

app.use(express.json());
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get("/videoInfo", async function (request, response) {
  const videoURL = request.query.videoURL;
  if (isYouTubeLink(videoURL)) {
    const info = await ytdl.getInfo(videoURL);
    response.status(200).json(info);
  } else {
    const err = "noytlink";
    response.status(200).json(err);
  }
});

app.get("/download", (request, response) => {
  const url = request.query.url;
  const itag = request.query.itag;

  response.header("Content-Disposition", 'attachment; filename="Video.mp4"');
  ytdl(url, { quality: itag, format: "mp4" }).pipe(response);
});

const server = app.listen(process.env.PORT || 5000);

if (server) {
  console.log("Server started on port 5000");
}

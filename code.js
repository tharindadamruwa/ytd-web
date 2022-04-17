const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/",function(request,response){
    response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo",async function(request,response){
    const videoURL = request.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    response.status(200).json(info);
});

app.get('/download',(request,response)=>{
    var url = request.query.url;
    response.header("Content-Disposition", 'attachment; filename="Video.mp4');
       ytdl(url, {format: 'mp4'}).pipe(response);
   });

app.listen(process.env.PORT || 5000);
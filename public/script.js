const host = "https://ytd-web.herokuapp.com/";

document.querySelector("#get-video-info-btn").addEventListener("click",function(){

    let videoURL = document.querySelector("#videoURL").value.trim();
    
    if(videoURL.length == 0) {

        alert("please enter Youtube video link");
        return;

    }

    document.querySelector(".loading").style.display = "flex";

    fetch(host+"videoInfo?videoURL="+videoURL).then(function(response){

        return response.json();

    }).then(function(data){

        console.log(data);

        let detailsNodes = {

            thumbnail:document.querySelector(".video-data .thumbnail img"),
            title:document.querySelector(".video-data .info h2"),
            description:document.querySelector(".video-data .info p"),
            videoURL:document.querySelector(".video-data .controls #video-url")

        }

        let html = "";

        for (let i = 0; i < data.formats.length; i++) {
            
            detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length -1].url;
            detailsNodes.title.innerText = data.videoDetails.title;
            detailsNodes.description.innerText = data.videoDetails.description;

            detailsNodes.videoURL.value = videoURL;
            
            document.querySelector(".video-data").style.display = "block";

            document.querySelector(".video-data").scrollIntoView({

                behavior:"smooth"

            });

            document.querySelector(".loading").style.display = "none";

        }

    }).catch(function(error){

        alert("Something Wen't Wrong");

        document.querySelector(".loading").style.display = "none";

    });

});
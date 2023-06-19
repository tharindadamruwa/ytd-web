const host = "https://ytd-web.netlify.app/";

document
  .querySelector("#get-video-info-btn")
  .addEventListener("click", function () {
    let videoURL = document.querySelector("#videoURL").value.trim();
    if (videoURL.length == 0) {
      document.querySelector("div.error").innerText =
        "Please eneter YouTube link.";
      document.querySelector(".form .form-element.er").style.display = "flex";
      return;
    }

    document.querySelector(".loading").style.display = "flex";

    fetch(host + "videoInfo?videoURL=" + videoURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data == "noytlink") {
          document.querySelector("div.error").innerText =
            "Your link isn't YouTube link.";
          document.querySelector(".form .form-element.er").style.display =
            "flex";
          document.querySelector(".loading").style.display = "none";
        } else {
          document.querySelector(".form .form-element.er").style.display =
            "none";
          let detailsNodes = {
            thumbnail: document.querySelector(".video-data .thumbnail img"),
            title: document.querySelector(".video-data .info h2"),
            description: document.querySelector(".video-data .info p"),
            videoURL: document.querySelector(
              ".video-data .controls #video-url"
            ),
            qualitySelect: document.querySelector("#quality-select"),
          };

          detailsNodes.thumbnail.src =
            data.videoDetails.thumbnails[
              data.videoDetails.thumbnails.length - 1
            ].url;
          detailsNodes.title.innerText = data.videoDetails.title;
          detailsNodes.description.innerText = data.videoDetails.description;
          detailsNodes.videoURL.value = videoURL;

          // Populate the quality options
          detailsNodes.qualitySelect.innerHTML = "";
          for (let i = 0; i < data.formats.length; i++) {
            const format = data.formats[i];
            const option = document.createElement("option");
            option.value = format.itag;
            option.text = format.qualityLabel || format.resolution;
            detailsNodes.qualitySelect.appendChild(option);
          }

          document.querySelector(".video-data").style.display = "block";
          document.querySelector(".controls").style.display = "flex";
          document
            .querySelector(".video-data")
            .scrollIntoView({ behavior: "smooth" });
          document.querySelector(".loading").style.display = "none";
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log("Something went wrong");
        document.querySelector(".loading").style.display = "none";
      });
  });

document
  .querySelector("#download-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let videoURL = document.querySelector("#videoURL").value.trim();
    let selectedQuality = document.querySelector("#quality-select").value;

    if (videoURL.length == 0 || selectedQuality.length == 0) {
      alert("Please enter a YouTube video link and select a quality");
      return;
    }
    const downloadURL =
      host +
      "download?url=" +
      encodeURIComponent(videoURL) +
      "&itag=" +
      selectedQuality;
    window.location.href = downloadURL;
  });

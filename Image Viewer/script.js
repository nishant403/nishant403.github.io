import imageDetails from "./items.js";

//If string length is more than outputLength :
//replace the middle part with '...' such that final string length ~ outputLength
const truncateString = function (str, outputLength = 33) {
  if (str.length <= outputLength) {
    return str;
  } else {
    const partLength = (outputLength - 3) / 2;

    return (
      str.substr(0, partLength) +
      "..." +
      str.substr(str.length - partLength, partLength)
    );
  }
};

let currentImageId = 0;

//replace currentImage by newImage
const updateDisplay = function (newImageId) {
  let list = document.querySelector(".imageList");

  let lastImage = list.childNodes[currentImageId];
  lastImage.classList.remove("selected");

  currentImageId = newImageId;

  let newListItem = list.childNodes[currentImageId];
  newListItem.classList.add("selected");

  let imageView = document.querySelector(".image");
  imageView.src = imageDetails[currentImageId]["previewImage"];

  let imageCaption = document.querySelector(".imageCaption");
  imageCaption.innerText = imageDetails[currentImageId]["title"];
};

//Return 'li' element with proper thumbnail,text and click event
const createListItem = function (item, index) {
  const title = item["title"];
  const link = item["previewImage"];

  const thumbnail = document.createElement("img");
  thumbnail.src = link;
  thumbnail.alt = title;

  const para = document.createElement("p");
  para.innerText = truncateString(title);

  const listItem = document.createElement("li");
  listItem.append(thumbnail);
  listItem.append(para);

  listItem.addEventListener("click", () => {
    updateDisplay(index);
  });

  return listItem;
};

//Events for arrowKeys movement
window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    if (currentImageId > 0) {
      updateDisplay(currentImageId - 1);
    }
  } else if (event.key == "ArrowDown") {
    if (currentImageId < imageDetails.length - 1) {
      updateDisplay(currentImageId + 1);
    }
  }
});

// Initial Setup
imageDetails.forEach((item, index) => {
  const listItem = createListItem(item, index);
  const imageList = document.querySelector(".imageList");
  imageList.append(listItem);
});

updateDisplay(0);

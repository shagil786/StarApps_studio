const umbrellaImage = document.getElementById("umbrella-image");
const colorCircles = document.querySelectorAll(".color-circle");
const fileUpload = document.getElementById("file-upload");
const container = document.querySelector(".container");
const loadingSvg = document.querySelector(".umbrella-container svg");
const uploadClick = document.querySelector(".upload");
const logo = document.getElementById("logo-mark");
const remove = document.querySelector(".remove");
const baseUrl = "assets/images";
let timeoutId;
// Above are the elments which im going to use for DOM manuplication.

const reduceOpacity = (colorString, opicity) => {
  /* 
  For the background-color which we want as a reduce opacity of the circle-button we select,
   we convert the string to rgba.
   */
  const rgbaValues = colorString.match(/\d+/g);

  if (rgbaValues && rgbaValues.length === 4) {
    const red = parseInt(rgbaValues[0]);
    const green = parseInt(rgbaValues[1]);
    const blue = parseInt(rgbaValues[2]);

    const reducedAlpha = opicity;
    return `rgba(${red}, ${green}, ${blue}, ${reducedAlpha})`;
  } else {
    return null;
  }
};

function changeUmbrellaColor(color, backgroud) {
  /*
  Main function which adds different umbrella on change of cicle selected, 
  as well as background color, loading image color, 
  loading image delay after selecting the new circle color.
  */
  loadingSvg.style.display = "inline";
  umbrellaImage.style.display = "none";
  logo.style.visibility = "hidden";

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    umbrellaImage.src = `${baseUrl}/umbrella-${color}.png`;
    container.style.backgroundColor = reduceOpacity(backgroud, 0.2);
    logo.style.visibility = fileUpload.value == "" ? "hidden" : "visible";
    loadingSvg.style.display = "none";
    umbrellaImage.style.display = "inline";
    loadingSvg.setAttribute("fill", reduceOpacity(backgroud, 1));
    uploadClick.style.backgroundColor = `${reduceOpacity(backgroud, 1)}`;
  }, 2000);
}

colorCircles.forEach((circle) => {
  /* 
  This function iterates through all the color circles, 
  and adds a disable click on the one's for which we don't have umbrella, 
  as well as add and remove the onclick from the rest, only keeps it for the circle which is selected.
  */
  circle.addEventListener("click", (e) => {
    if (circle.getAttribute("aria-disabled")) return;

    colorCircles.forEach((otherCircle) => {
      if (otherCircle !== circle && otherCircle.classList.contains("clicked")) {
        otherCircle.classList.remove("clicked");
      }
    });

    e.target.classList.toggle("clicked");

    if (e.target.classList.contains("clicked")) {
      const color = circle.dataset.color;
      const left = circle.style.cssText.split("; ")[0];
      changeUmbrellaColor(color, left);
    }
  });
});

fileUpload.addEventListener("change", (event) => {
  /* 
  This is to handle image/logo upload, 
  and the effects like loading image after that and then making the logo visible.
  */
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    remove.style.visibility = "visible";
    reader.onload = () => {
      loadingSvg.style.display = "inline";
      umbrellaImage.style.display = "none";
      logo.src = reader.result;
      setTimeout(() => {
        loadingSvg.style.display = "none";
        logo.style.visibility = "unset";
        umbrellaImage.style.display = "inline";
      }, 2000);
    };
    reader.readAsDataURL(file);
  }
});

remove.addEventListener("click", (event) => {
  /* 
  This event is for removing the uploaded file once we click on remove(X) button, 
  and also remove the logo selected, so we can upload a new one.
  */
  fileUpload.value = "";
  logo.src = "";
  remove.style.visibility = "hidden";
  logo.style.visibility = "hidden";
});

// This whole js code achives the problems which we have to consider and achive in the problem statment.

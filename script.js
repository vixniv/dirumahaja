/*Setting up canvas*/

var canvas = new fabric.Canvas("c");
if ($(window).width() < 500) {
  $(".toolWindow").width(356);
  canvas.setWidth(356);
  canvas.setHeight(356);
}
canvas.preserveObjectStacking = true; //stop bringtofront on selected objects
var imgElement = document.getElementById("my-image");

/* binding event listeners */
$(window).bind("keydown", function(event) {
  if (event.which == 46 || event.which == 8) {
    event.preventDefault();
    deleteActiveObjects();
  }
  if (canvas.isEmpty()) {
    emptyCanvas();
  }
});

function emptyCanvas() {
  showPrevStep();
}

/*Read the uploaded image and append it to canvas*/
$("#file").bind("change", function(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function(f) {
    showNextStep();
    var data = f.target.result;
    fabric.Image.fromURL(
      data,
      function(img) {
        //center the image
        // img.setAttribute("crossorigin", "anonymous");
        var scaleXNum = canvas.width / img.width;
        var scaleYNum = canvas.height / img.height;
        var minFactor = Math.min(scaleXNum, scaleYNum); //get minimum factor for scale
        var oImg = img.scale(minFactor);
        canvas.centerObject(oImg);

        //render image onto canvas
        canvas.add(oImg).renderAll();
        

        //set controls for image
        oImg.set({
          borderColor: "#1DA2FB",
          cornerColor: "#1DA2FB",
          cornerSize: 12,
          transparentCorners: false,
          lockUniScaling: true,
          centeredScaling: true
        });
        //set image as active object
        canvas.setActiveObject(oImg);
        canvas.renderAll();
      },
      {
        crossOrigin: "Anonymous"
      }
    );
  };
  reader.readAsDataURL(file);
  $(this)[0].value = ""; //erase current file value so that eventlistener can detect a change event
});

/* Shows step 2*/
function showNextStep() {
  $(".stepOne").hide(); //hide previous step
  $(".stepTwo").show(); //show curr step
}

function showPrevStep() {
  $(".stepTwo").hide(); //hide previous step
  $(".stepOne").show(); //show curr step
}

/*Delete a mask or clear the canvas*/

// document.getElementById('clear').addEventListener('click', () => {
// 	!deleteActiveObjects() && canvas.clear();
// });

function deleteActiveObjects() {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects.length) return false;

  if (activeObjects.length) {
    activeObjects.forEach(function(object) {
      canvas.remove(object);
    });
  } else {
    canvas.remove(activeObjects);
  }

  return true;
}

/*Download the image*/
$("#download").bind("click", function(e) {
  var that = this;
  // debugger;
  var dataURL = canvas.toDataURL("image/png");
  
  const link = document.createElement("a");
  link.download = "image.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
});


/*Adds a mask to the canvas*/

function add_mask(filter) {
  var $this = $(filter);
  var element = filter; // This is the DOM object being clicked
  var filterNum = $(element).data("filter"); //get filter number
  var imgElement = $("img[data-filter=" + filterNum + "]")[0]; //get img element associated with button
  var imgSrc = $(element).attr("src"); //add img src to fabric image element
  var img = new Image();
  img.src = imgSrc;
  debugger;
  img.setAttribute("crossorigin", "anonymous");
  img.onload = i => {
    var imgInstance = new fabric.Image(
      img,
      {
        orderColor: "#1DA2FB",
        cornerColor: "#1DA2FB",
        cornerSize: 12,
        transparentCorners: false,
        lockUniScaling: true,
        centeredScaling: true
      },
      {
        crossOrigin: "Anonymous"
      }
    );
    imgInstance.scale(0.5);
    canvas.centerObject(imgInstance);
    canvas.add(imgInstance);
    canvas.setActiveObject(imgInstance);
  };
}



function hover(element) {
  element.setAttribute(
    "src",
    "assets/folder_mask.png"
  );
}

function unhover(element) {
  element.setAttribute(
    "src",
    "assets/folder_nomask.png"
  );
}


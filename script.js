function emptyCanvas(){showPrevStep()}function showNextStep(){$(".stepOne").hide(),$(".stepTwo").show()}function showPrevStep(){$(".stepTwo").hide(),$(".stepOne").show()}function deleteActiveObjects(){const e=canvas.getActiveObjects();return!!e.length&&(e.length?e.forEach(function(e){canvas.remove(e)}):canvas.remove(e),!0)}function add_mask(e){$(e);var n=e,t=$(n).data("filter"),a=($("img[data-filter="+t+"]")[0],$(n).attr("src")),c=new Image;c.src=a,c.setAttribute("crossorigin","anonymous"),c.onload=(e=>{var n=new fabric.Image(c,{orderColor:"#1DA2FB",cornerColor:"#1DA2FB",cornerSize:12,transparentCorners:!1,lockUniScaling:!0,centeredScaling:!0},{crossOrigin:"Anonymous"});n.scale(.5),canvas.centerObject(n),canvas.add(n),canvas.setActiveObject(n)})}function hover(e){e.setAttribute("src","assets/folder_mask.png")}function unhover(e){e.setAttribute("src","assets/folder_nomask.png")}var canvas=new fabric.Canvas("c");$(window).width()<500&&($(".toolWindow").css("width","336px"),canvas.setWidth(330),canvas.setHeight(330)),canvas.preserveObjectStacking=!0;var imgElement=document.getElementById("my-image");$(window).bind("keydown",function(e){46!=e.which&&8!=e.which||(e.preventDefault(),deleteActiveObjects()),canvas.isEmpty()&&emptyCanvas()}),$("#file").bind("change",function(e){var n=e.target.files[0],t=new FileReader;t.onload=function(e){showNextStep();var n=e.target.result;fabric.Image.fromURL(n,function(e){var n=canvas.width/e.width,t=canvas.height/e.height,a=Math.min(n,t),c=e.scale(a);canvas.centerObject(c),canvas.add(c).renderAll(),c.set({borderColor:"#1DA2FB",cornerColor:"#1DA2FB",cornerSize:12,transparentCorners:!1,lockUniScaling:!0,centeredScaling:!0}),canvas.setActiveObject(c),canvas.renderAll()},{crossOrigin:"Anonymous"})},t.readAsDataURL(n),$(this)[0].value=""}),$("#download").bind("click",function(e){var n=canvas.toDataURL({format:"image/png",multiplier:2});const t=document.createElement("a");t.download="image.png",t.href=n,document.body.appendChild(t),t.click(),document.body.removeChild(t)}),$("#download2").bind("click",function(e){var n=canvas.toDataURL({format:"image/png",multiplier:4});const t=document.createElement("a");t.download="image.png",t.href=n,document.body.appendChild(t),t.click(),document.body.removeChild(t)});
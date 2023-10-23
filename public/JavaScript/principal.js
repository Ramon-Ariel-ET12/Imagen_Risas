function toggleMenu() {
    var menu = document.getElementById("menuOptions");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
var profileImage = document.getElementById("profile-image");
profileImage.addEventListener("click", function() {
    var fullscreenImage = document.createElement("div");
    fullscreenImage.className = "fullscreen-image";
    fullscreenImage.innerHTML = '<img src="' + profileImage.src + '">';
    document.body.appendChild(fullscreenImage);
    fullscreenImage.addEventListener("click", function() {
        document.body.removeChild(fullscreenImage);
    });
});
function toggleMenu() {
    var menu = document.getElementById("menuOptions");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function previewImage(event) {
    var image = document.getElementById("profile-image");
    var file = event.target.files[0];
    
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
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
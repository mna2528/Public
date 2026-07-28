const gallery = document.getElementById("gallery");

const images = [
{
    title: "Morning Darshan",
    image: "images/darshana1.png"
},
{
    title: "Alankara",
    image: "images/darshana2.jpg"
},
{
    title: "Evening Deepa Aarati",
    image: "images/darshana3.jpeg"
}
];

images.forEach(item => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<img src="${item.image}" alt="${item.title}" class="darshan-image">

<div class="card-content">
<h2>${item.title}</h2>

<div class="buttons">
<button class="download" data-image="${item.image}">
    ⬇ Download
</button>

<button class="share" data-image="${item.image}">
    🔗 Share
</button>
</div>

</div>
`;

gallery.appendChild(card);

});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");

document.querySelectorAll(".darshan-image").forEach(img => {

img.addEventListener("click",()=>{

lightbox.style.display="flex";
lightboxImg.src=img.src;

});

});

closeBtn.onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};
// Download from popup
document.getElementById("popupDownload").onclick = () => {

    const link = document.createElement("a");
    link.href = lightboxImg.src;
    link.download = "darshan.jpg";
    link.click();

};
document.querySelectorAll(".download").forEach(button => {

    button.addEventListener("click", function(e) {

        e.stopPropagation();

        const link = document.createElement("a");
        link.href = this.dataset.image;
        link.download = "";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });

});
// Share from gallery card
document.querySelectorAll(".share").forEach(button => {

    button.addEventListener("click", async function(e) {

        e.stopPropagation();

        const imageUrl = this.dataset.image;

        try {

            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const file = new File(
                [blob],
                imageUrl.split("/").pop(),
                { type: blob.type }
            );

            if (navigator.canShare && navigator.canShare({ files: [file] })) {

                await navigator.share({
                    files: [file],
                    title: "Temple Darshan",
                    text: "Today's Darshan"
                });

            } else {

                alert("Your browser doesn't support direct image sharing.");

            }

        } catch (err) {

            console.error(err);
            alert("Unable to share image.");

        }

    });

});
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

// Sample images (use your own images)
const images = [
    "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
];

let selectedImages = [];
let randomizedImages = [];

function generateImages() {
    let imagesCopy = [...images];
    let duplicateImage = imagesCopy[Math.floor(Math.random() * imagesCopy.length)];
    imagesCopy.push(duplicateImage);

    randomizedImages = imagesCopy.sort(() => Math.random() - 0.5);

    imageContainer.innerHTML = "";
    randomizedImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.dataset.index = index;
        img.onclick = () => selectImage(img);
        imageContainer.appendChild(img);
    });
}

function selectImage(img) {
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        img.classList.add("selected");
        selectedImages.push(img);
    }

    if (selectedImages.length === 2) {
        verifyBtn.style.display = "inline-block";
    }
    resetBtn.style.display = "inline-block";
}

function verifySelection() {
    if (selectedImages[0].src === selectedImages[1].src) {
        message.innerText = "You are a human. Congratulations!";
        message.style.color = "green";
    } else {
        message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
        message.style.color = "red";
    }
    
    verifyBtn.style.display = "none";
}

function resetGame() {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    message.innerText = "";
    verifyBtn.style.display = "none";
    resetBtn.style.display = "none";
}

generateImages();

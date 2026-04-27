const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

let images = [];

// Allowed file types
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//Image Upload + Preview
imageInput.addEventListener("change", function () {
  const files = imageInput.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Type check
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, WEBP allowed!");
      continue;
    }

    //Size check (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File must be less than 10MB!");
      continue;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageData = e.target.result;
      images.push(imageData);

      //Create preview container
      const div = document.createElement("div");
      div.classList.add("preview-item");

      //Image
      const img = document.createElement("img");
      img.src = imageData;

      // Remove button
      const btn = document.createElement("button");
      btn.innerText = "X";
      btn.classList.add("remove-btn");

      btn.onclick = () => {
        div.remove();
        images = images.filter((item) => item !== imageData);
      };

      div.appendChild(img);
      div.appendChild(btn);
      preview.appendChild(div);
    };

    reader.readAsDataURL(file);
  }


  imageInput.value = "";
});


//Convert to PDF 
function convertToPDF() {
  if (images.length === 0) {
    alert("Please upload images first!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  images.forEach((img, index) => {
    if (index !== 0) pdf.addPage();
    
    pdf.addImage(img, "JPEG", 10, 10, 190, 270);
  });

  pdf.save("converted.pdf");
}
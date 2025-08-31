document.getElementById("bmi-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Kullanıcıdan verileri alıyoruz
  const height = parseFloat(document.getElementById("height").value) / 100; // cm to meters
  const weight = parseFloat(document.getElementById("weight").value);

  // BMI hesaplama
  const bmi = weight / (height * height);

  // BMI sonucu ve kategoriyi hesapla
  let bmiCategory = "";
  let arrowMovement = "";

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    arrowMovement = "move-arrow-up";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiCategory = "Normal";
    arrowMovement = "move-arrow-up";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = "Overweight";
    arrowMovement = "move-arrow-down";
  } else if (bmi >= 30 && bmi < 34.9) {
    bmiCategory = "Obese";
    arrowMovement = "move-arrow-down";
  } else {
    bmiCategory = "Extremely Obese";
    arrowMovement = "move-arrow-down";
  }

  // Kategoriye göre renk değiştirme
  const bmiArrow = document.querySelector(".bmi-arrow");
  const bmiCategoryDivs = document.querySelectorAll(".bmi-chart div");

  bmiCategoryDivs.forEach((div) => {
    if (div.textContent.toLowerCase() === bmiCategory.toLowerCase()) {
      div.style.backgroundColor = "#ff6600"; // Seçilen kategoriyi renklendir
    } else {
      div.style.backgroundColor = "";
    }
  });

  // BMI sonucunuzu gösterme
  alert("Your BMI is " + bmi.toFixed(2) + ", Category: " + bmiCategory);

  // Üçgen animasyonunu ekleme
  bmiArrow.classList.remove("move-arrow-up", "move-arrow-down");
  bmiArrow.classList.add(arrowMovement);
});

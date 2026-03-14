const allIssues = document.getElementById("allIssues");
function login() {
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  if (userName.value === "admin" && password.value === "admin123") {
    window.location.href = "main.html";
  } else {
    alert("Invalid userName or Password!");
  }
}

function loadIssues() {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
}
function displayIssues(data) {
  allIssues.innerHTML = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 w-96 shadow-sm";
    div.innerHTML = `
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      `;
      allIssues.append(div);
  });
}
loadIssues();

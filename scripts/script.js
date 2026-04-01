const allIssues = document.getElementById("allIssues");
const loadingSpinner = document.getElementById("loadingSpinner");


function login() {
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  if (userName.value === "admin" && password.value === "admin123") {
    window.location.href = "main.html";
  } else {
    alert("Invalid userName or Password!");
  }
}

  function showLoading() {
  allIssues.innerHTML = `
    <div class="col-span-4 flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  `;
}

function loadIssues() {
  showLoading();
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayIssues(data.data));
}
function displayIssues(data) {
  const allIssuesLength = data.length;
  document.getElementById('length').innerText = allIssuesLength;
  allIssues.innerHTML = "";
  data.forEach((element) => {
    const labelButtons = element.labels
      .map(
        (label) =>
          `<span class="badge badge-success badge-outline text-sm py-1 px-2 flex items-center justify-center">${label}</span>`
      )
      .join("");
    const div = document.createElement("div");
    // div.classList = "card bg-base-100 w-96 shadow-sm";
    div.innerHTML = `
        <div onclick="my_modal_1.showModal()" class="card bg-base-100 flex flex-col w-96 h-full shadow-sm p-4 space-y-4 border-t-4 ${element.status === "closed" ? "border-t-purple-700" : "border-t-green-700"} ">
          <div class="flex justify-between">
            ${element.status === "closed" ? `<img src="./assets/Closed- Status .png" alt="" />` : `<img src="./assets/Open-Status.png" />`}
            <button class="btn rounded-full">${element.priority.toUpperCase()}</button>
          </div>
          <div class="space-y-4">
            <h2 class="text-xl font-bold">
              ${element.title}
            </h2>
          </div>
          <div>
            <p class="text-gray-400 line-clamp-2">
              ${element.description}
            </p>
          </div>
          <div class="flex gap-2 mt-2">
              ${labelButtons}
          </div>
          <hr class="text-gray-300 mt-auto" />
          <div class="text-gray-400 space-y-4">
            <p>#1 by ${element.author}</p>
            <p>${element.createdAt}</p>
          </div>
        </div>
      `;
    allIssues.append(div);
  });
}
loadIssues();

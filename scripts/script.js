const allIssues = document.getElementById("allIssues");
const loadingSpinner = document.getElementById("loadingSpinner");
let allData = [];

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
  setActiveTab("all");

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allData = data.data;
      displayIssues(allData);
    });
}
function displayIssues(data) {
  const allIssuesLength = data.length;
  document.getElementById("length").innerText = allIssuesLength;
  allIssues.innerHTML = "";
  data.forEach((element) => {
    const labelButtons = element.labels
      .map(
        (label) =>
          `<span class="badge badge-success badge-outline text-sm py-1 px-2 flex items-center justify-center">${label}</span>`,
      )
      .join("");
    const div = document.createElement("div");
    // div.classList = "card bg-base-100 w-96 shadow-sm";
    div.innerHTML = `
        <div onclick="loadSingleIssue(${element.id})" class="card bg-base-100 flex flex-col h-full shadow-sm p-4 space-y-4 border-t-4 ${element.status === "closed" ? "border-t-purple-700" : "border-t-green-700"} ">
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

function showOpen() {
  const openIssues = allData.filter((issue) => issue.status === "open");
  displayIssues(openIssues);
  setActiveTab("open");
}

function showClosed() {
  const closedIssues = allData.filter((issue) => issue.status === "closed");
  displayIssues(closedIssues);
  setActiveTab("closed");
}

function setActiveTab(tab) {
  document.getElementById("allTab").classList.remove("btn-primary");
  document.getElementById("openTab").classList.remove("btn-primary");
  document.getElementById("closedTab").classList.remove("btn-primary");

  document.getElementById(tab + "Tab").classList.add("btn-primary");
}

function loadSingleIssue(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => showModal(data.data));
}
function showModal(issue) {
  const modal = document.getElementById("my_modal");
  const labelButtons = issue.labels
    .map(
      (label) =>
        `<span class="badge badge-success badge-outline rounded-full">${label}</span>`,
    )
    .join("");

  modal.innerHTML = `
        <div class="modal-box space-y-4">
          <h3 class="text-3xl font-bold">${issue.title}</h3>
          <div>
            <div class="flex items-center gap-3 text-sm mb-3">
              <span class="badge badge-success rounded-full">${issue.status}</span>
              <span class="text-gray-400"> •  Opened by ${issue.author}</span>
              <span class="text-gray-400">•  ${issue.createdAt}</span>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
              ${labelButtons}
          </div>
          <p class="text-gray-600 mb-6">${issue.description}</p>

          <div class="flex gap-35 items-center bg-gray-100 rounded-md p-4">
              <div>
                <p class="text-gray-400 text-[16px]">Assignee:</p>
                <p class="font-semibold">${issue.assignee}</p>
              </div>

              <div>
                <p class="text-gray-400 text-[16px]">Priority:</p>
                <span class="badge badge-error rounded-full bg-red-600">${issue.priority.toUpperCase()}</span>
              </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
        `;

  modal.showModal();
}

function searchIssues(){
  const searchText = document.getElementById("searchInput").value;
  // console.log(searchText);
  fetch(` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
  .then(res => res.json())
  .then(data => displayIssues(data.data));
}

loadIssues();

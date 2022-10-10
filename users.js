const api_url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";

function getapi() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      show(data);
    });
}
getapi();

function show(data) {
  let tableBody = document.getElementById("table-body");
  data.forEach((users) => {
    let tablerow = document.createElement("tr");
    tablerow.classList.add("something");
    for (const key in users) {
      if (key == "profilePic") {
        let element = document.createElement("img");
        element.src = users[key];
        element.classList.add(key);
        tablerow.appendChild(element);
        continue;
      }
      if (key == "currentCity") {
        let element = document.createElement("td");
        element.innerText = users[key] + "," + users.currentCountry;
        element.classList.add(key);
        tablerow.appendChild(element);
        continue;
      }
      if (key == "currentCountry") {
        continue;
      }
      let element = document.createElement("td");
      element.innerText = users[key];
      element.classList.add(key);
      tablerow.appendChild(element);
    }
    tableBody.appendChild(tablerow);
  });
}

function search() {
  let searchinput = $("input:text").val();
  let newDataList = [];
  fetch(api_url)
    .then((response) => response.json())
    .then((userList) => {
      newDataList = userList.filter((user) => {
        return user.fullName.includes(searchinput);
      });
      $("#table-body").empty();
      show(newDataList);
    });
}

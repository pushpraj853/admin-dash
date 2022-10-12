const api_url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";

function getapi() {
  $("#table-body").empty();
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
        let element1 = document.createElement("td");
        let element = document.createElement("img");
        element.src = users[key];
        element.classList.add(key);
        element1.appendChild(element);
        tablerow.appendChild(element1);
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

function search(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); //to stop page relaod when hit enter
    let searchinput = $("#my-input").val();
    if (searchinput.length < 3) {
      alert("Please Enter more than two characters");
    } else {
      let newDataList = [];
      fetch(api_url)
        .then((response) => response.json())
        .then((userList) => {
          newDataList = userList.filter((user) => {
            return user.fullName.toLowerCase().includes(searchinput.toLowerCase());
          });
          $("#table-body").empty();
          show(newDataList);
        });
    }
  }
}

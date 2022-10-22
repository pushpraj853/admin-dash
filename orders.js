const api_url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";

fetch(api_url)
  .then((response) => response.json())
  .then((data) => {
    show(data);
  });

function show(data) {
  let count = document.getElementsByClassName("count-item");
  count[0].innerText = "Count: " + data.length;

  let tableBody = document.getElementById("table-body");
  data.forEach((order) => {
    let tablerow = document.createElement("tr");

    for (const key in order) {
      //we're skipping time bcos when we get date we use time also
      if (key == "orderTime") {
        continue;
      }
      let element = document.createElement("td");
      if (key == "amount") {
        element.innerText = "$" + order[key];
      } else {
        element.innerText = order[key];
      }

      if (key == "orderStatus") {
        tablerow.classList.add(order[key]);
        tablerow.classList.add("something");
      }
      if (key == "orderDate") {
        let linebreak = document.createElement("br");
        let time = document.createElement("span");
        time.classList.add("time");
        time.innerText = order.orderTime;

        element.appendChild(linebreak);
        element.appendChild(time);
      }
      element.classList.add(key);
      tablerow.appendChild(element);
    }
    tableBody.appendChild(tablerow);
  });
}

function clicked() {
  // Collecting filters which are checked
  let checklist = [];
  let checkBoxes = document.getElementsByTagName("input");
  Array.from(checkBoxes).forEach((checkbox) => {
    if (checkbox.checked == true) {
      checklist.push(checkbox.value);
    }
  });
  console.log(checklist);

  //Collecting list which match with checked filter
  let newDataList = [];
  fetch(api_url)
    .then((response) => response.json())
    .then((orderList) => {
      newDataList = orderList.filter((order) => {
        return checklist.includes(order.orderStatus);
      });
      $("#table-body").empty();
      show(newDataList);
    });
}

function logout() {
  window.localStorage.setItem("isLoggedIn", false);
}

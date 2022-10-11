const api_url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";

function getapi() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      show(data);
    });
}

getapi();

function show(data) {
  let count = document.getElementsByClassName("count-item");
  count[0].innerText = "Count: " + data.length;

  let tableBody = document.getElementById("table-body");
  data.forEach((order) => {
    let tablerow = document.createElement("tr");
    tablerow.classList.add("something");
    for (const key in order) {
      let element = document.createElement("td");
      if (key == "prescriptionRequired") {
        continue;
      }
      if (key == "unitPrice") {
        element.innerText = "$" + order[key];
      } else if (key == "expiryDate") {
        element.innerText = formatDate(order[key]);
      } else {
        element.innerText = order[key];
      }
      element.classList.add(key);
      tablerow.appendChild(element);
    }
    tableBody.appendChild(tablerow);
  });
}

function formatDate(givendate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let mydate = new Date(givendate);

  let d = mydate.getDate();
  let m = mydate.getMonth();
  let y = mydate.getFullYear();
  return `${d} ${months[m]}, ${y} `;
}

function isExpired(givendate) {
  let q = new Date();
  let m = q.getMonth();
  let d = q.getDay();
  let y = q.getFullYear();

  let date = new Date(y, m, d);

  let mydate = new Date(givendate);
  if (date > mydate) {
    return true;
  } else {
    return false;
  }
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

  if (checklist.length == 0) {
    console.log("filter cleared");
    getapi();
    return;
  }
  //Collecting list which match with checked filter
  let newDataList = [];
  fetch(api_url)
    .then((response) => response.json())
    .then((orderList) => {
      checklist.forEach((filterItem) => {
        orderList.forEach((order) => {
          if (filterItem == "Expired" && isExpired(order.expiryDate)) {
            newDataList.push(order);
          } else if (filterItem == "Low-Stock" && order.stock < 100) {
            newDataList.push(order);
          }
        });
      });
      $("#table-body").empty();
      show(newDataList);
    });
}

const api_url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";

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
    tablerow.classList.add("something");
    for (const key in order) {
      let element = document.createElement("td");
      if (key == "prescriptionRequired") continue;
      element.innerText = order[key];
      element.classList.add(key);
      tablerow.appendChild(element);
    }
    tableBody.appendChild(tablerow);
  });
}

function isExpired(givendate) {
  let q = new Date();
  let m = q.getMonth();
  let d = q.getDay();
  let y = q.getFullYear();

  let date = new Date(y, m, d);

  let mydate = new Date(givendate);
  console.log(date);
  console.log(mydate);

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
  console.log(checklist);

  //Collecting list which match with checked filter
  let newDataList = [];
  fetch(api_url)
    .then((response) => response.json())
    .then((orderList) => {
      // newDataList = orderList.filter((order) => {
      //    return checklist.includes(order.orderStatus);
      // });
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

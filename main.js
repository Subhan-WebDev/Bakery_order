// Function to create a new order element
function createOrderElement(username, orderName, quantity, orderDate) {
    const newOrder = document.createElement("div");
    newOrder.classList.add("order");
    newOrder.innerHTML = `
      <p class="user">Username: ${username}</p>
      <p class="order-name">Order Name: ${orderName}</p>
      <p class="quantity">Quantity: ${quantity}</p>
      <p class="order-date">Order Date: ${orderDate}</p>
      <span class="btns edit">Edit<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
      <span class="btns delete">Delete<span class="bg"></span><span class="bg bg2"></span><span class="bg1"></span><span class="bg1 bg3"></span></span>
      <hr>
    `;
    return newOrder;
  }
  
  // Function to save orders to local storage
  function saveOrdersToLocalStorage() {
    const orders = [];
    const orderElements = document.querySelectorAll(".order");
    orderElements.forEach(order => {
      const username = order.querySelector(".user").textContent.split(": ")[1];
      const orderName = order.querySelector(".order-name").textContent.split(": ")[1];
      const quantity = order.querySelector(".quantity").textContent.split(": ")[1];
      const orderDate = order.querySelector(".order-date").textContent.split(": ")[1];
      orders.push({ username, orderName, quantity, orderDate });
    });
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const orderName = document.getElementById("orderName").value;
    const quantity = document.getElementById("quantity").value;
    const orderDate = document.getElementById("orderDate").value;
    const newOrder = createOrderElement(username, orderName, quantity, orderDate);
    const submittedData = document.getElementById("submittedData");
    submittedData.appendChild(newOrder);
    saveOrdersToLocalStorage();
    this.reset(); // Clear form
  }
  
  // Function to handle delete and edit button clicks
  function handleButtonClick(event) {
    const target = event.target;
    if (target.classList.contains("delete")) {
      const order = target.closest(".order");
      order.remove();
      saveOrdersToLocalStorage();
    } else if (target.classList.contains("edit")) {
      const order = target.closest(".order");
      const username = prompt("Enter new username:");
      const orderName = prompt("Enter new order name:");
      const quantity = prompt("Enter new quantity:");
      order.querySelector(".user").textContent = `Username: ${username}`;
      order.querySelector(".order-name").textContent = `Order Name: ${orderName}`;
      order.querySelector(".quantity").textContent = `Quantity: ${quantity}`;
      saveOrdersToLocalStorage();
    }
  }
  
  // Add event listeners
  const bakeryForm = document.getElementById("bakeryForm");
  const submittedData = document.getElementById("submittedData");
  bakeryForm.addEventListener("submit", handleFormSubmission);
  submittedData.addEventListener("click", handleButtonClick);
  
  // Load orders from local storage on page load
  window.addEventListener("DOMContentLoaded", function() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.forEach(order => {
      const { username, orderName, quantity, orderDate } = order;
      const newOrder = createOrderElement(username, orderName, quantity, orderDate);
      submittedData.appendChild(newOrder);
    });
  });


  const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the search query
    const searchInput = document.getElementById("searchInput").value.toLowerCase().trim();

    // Get all order elements
    const orderElements = document.querySelectorAll(".order");

    // Loop through each order element
    orderElements.forEach(order => {
        const username = order.querySelector(".user").textContent.toLowerCase();
        const orderName = order.querySelector(".order-name").textContent.toLowerCase();
        const orderDate = order.querySelector(".order-date").textContent.toLowerCase();

        // Check if any field matches the search query
        const match = username.includes(searchInput) || orderName.includes(searchInput) || orderDate.includes(searchInput);

        // Show or hide the order element based on the match
        if (match) {
            order.style.display = "block"; // Show the order element
        } else {
            order.style.display = "none"; // Hide the order element
        }
    });
});

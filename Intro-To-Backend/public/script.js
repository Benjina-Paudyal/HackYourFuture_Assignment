  document.addEventListener("DOMContentLoaded", () => { 
    fetch("/user-count")
      .then(response => response.json())
      .then(data => {
        document.getElementById("userCount").textContent = data.count;
      })
      .catch(err => {
        document.getElementById("userCount").textContent = "Error loading count";
        console.error(err);
      });
    });
  
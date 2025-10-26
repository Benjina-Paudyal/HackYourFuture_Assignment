document.getElementById("colorChangeButton").addEventListener("click", () => {
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
  document.body.style.backgroundColor = randomColor;
});

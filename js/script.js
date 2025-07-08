function openCategory(category) {
    window.location.href = `category.html?cat=${encodeURIComponent(category)}`;
}

// Update task count on homepage for each box
function updateTaskCounts() {
    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => {
        const category = box.querySelector('h2').textContent.trim();
        const tasks = JSON.parse(localStorage.getItem(category)) || [];
        const countSpan = document.getElementById(`count-${category}`);
        if (countSpan) {
            countSpan.textContent = tasks.length;
        }
    });
}

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Oye hoye! Right-click allowed nahi hai boss 😎");
});

updateTaskCounts(); // Run it on page load
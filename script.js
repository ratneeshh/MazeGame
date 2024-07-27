document.addEventListener("DOMContentLoaded", () => {
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const scary = document.getElementById("scary");
    const scarySound = document.getElementById("scary-sound");
    let currentCell = start;

    currentCell.classList.add("active");

    setTimeout(() => {
        displayScary();
    }, 20000);

    function displayScary() {
        scary.style.display = "flex";
        scarySound.play();
    }

    document.addEventListener("keydown", (event) => {
        const [row, col] = currentCell.dataset.pos.split('-').map(Number);

        let newRow = row, newCol = col;

        switch (event.key) {
            case "ArrowUp":
                newRow = row - 1;
                break;
            case "ArrowDown":
                newRow = row + 1;
                break;
            case "ArrowLeft":
                newCol = col - 1;
                break;
            case "ArrowRight":
                newCol = col + 1;
                break;
            default:
                return;
        }

        const nextCell = document.querySelector(`.cell[data-pos="${newRow}-${newCol}"]`);
        if (nextCell && !nextCell.classList.contains("wall")) {
            currentCell.classList.remove("active");
            nextCell.classList.add("active");
            currentCell = nextCell;

            if (currentCell === end) {
                displayScary();
            }
        }
    });
});

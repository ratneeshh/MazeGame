document.addEventListener("DOMContentLoaded", () => {
    const maze = document.getElementById("maze");
    const scary = document.getElementById("scary");
    const scarySound = document.getElementById("scary-sound");
    let currentCell;

    const mazeLayout = [
        "S.....W.",
        "WWWW..W.",
        "....W...",
        ".WWWWWW.",
        ".W...W..",
        ".W.W.W.W",
        "...W...W",
        "WWWWWW.E"
    ];

    function createMaze() {
        for (let i = 0; i < mazeLayout.length; i++) {
            for (let j = 0; j < mazeLayout[i].length; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.pos = `${i}-${j}`;

                switch (mazeLayout[i][j]) {
                    case 'S':
                        cell.classList.add("start");
                        currentCell = cell;
                        break;
                    case 'E':
                        cell.classList.add("end");
                        break;
                    case 'W':
                        cell.classList.add("wall");
                        break;
                    default:
                        cell.classList.add("path");
                }

                maze.appendChild(cell);
            }
        }
        currentCell.classList.add("active");
    }

    createMaze();

    setTimeout(() => {
        displayScary();
    }, 30000);

    function displayScary() {
        scary.style.display = "flex";
        scarySound.play();
    }

    function movePlayer(direction) {
        const [row, col] = currentCell.dataset.pos.split('-').map(Number);

        let newRow = row, newCol = col;

        switch (direction) {
            case "up":
                newRow = row - 1;
                break;
            case "down":
                newRow = row + 1;
                break;
            case "left":
                newCol = col - 1;
                break;
            case "right":
                newCol = col + 1;
                break;
            default:
                return;
        }

        if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) return;

        const nextCell = document.querySelector(`.cell[data-pos="${newRow}-${newCol}"]`);
        if (nextCell && !nextCell.classList.contains("wall")) {
            currentCell.classList.remove("active");
            nextCell.classList.add("active");
            currentCell = nextCell;

            if (currentCell.classList.contains("end")) {
                displayScary();
            }
        }
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                movePlayer("up");
                break;
            case "ArrowDown":
                movePlayer("down");
                break;
            case "ArrowLeft":
                movePlayer("left");
                break;
            case "ArrowRight":
                movePlayer("right");
                break;
        }
    });

    // On-screen controls
    document.getElementById("up").addEventListener("click", () => movePlayer("up"));
    document.getElementById("down").addEventListener("click", () => movePlayer("down"));
    document.getElementById("left").addEventListener("click", () => movePlayer("left"));
    document.getElementById("right").addEventListener("click", () => movePlayer("right"));
});
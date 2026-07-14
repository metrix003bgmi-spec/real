function initProjectButtons() {
    const buttons = document.querySelectorAll(".js-trigger-button");
    const grids = document.querySelectorAll(".js-grid");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const category = button.dataset.category;

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            grids.forEach(grid => {
                if (grid.dataset.category === category) {
                    grid.classList.remove("hidden");
                } else {
                    grid.classList.add("hidden");
                }
            });

        });
    });
}

initProjectButtons();
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("displayIpt");
    const buttons = document.querySelectorAll("input[type='button']");
    let pressedKeys = new Set(); // Set to track pressed keys

    document.addEventListener("keydown", function (event) {
        event.preventDefault(); // Prevent browser default behavior
        let keyPressed = event.key;

        if (pressedKeys.has(keyPressed)) return; // Ignore if key is already registered
        pressedKeys.add(keyPressed); // Add key to the set

        setTimeout(() => {
            pressedKeys.delete(keyPressed); // Remove key after a short delay
        }, 200); // Adjust delay if needed

        if (keyPressed === "Enter" || keyPressed === "=") {
            try {
                display.value = new Function("return " + display.value)();
            } catch (error) {
                display.value = "error!";
            }
        } else if (keyPressed === "Backspace") {
            display.value = display.value.slice(0, -1);
        } else if (keyPressed === "Delete") {
            display.value = "";
        } else if ("0123456789+-*/%.".includes(keyPressed)) {
            display.value += keyPressed;
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.value;

            if (value === "=") {
                try {
                    display.value = new Function("return " + display.value)();
                } catch (error) {
                    display.value = "Error";
                }
            } else if (value === "AC") {
                display.value = "";
            } else if (value === "DE") {
                display.value = display.value.slice(0, -1);
            } else {
                display.value += value;
            }
        });
    });
});

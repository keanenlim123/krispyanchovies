document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');

    incrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = Math.min(currentValue + 1, 99); // Limit to 99
    });

    decrementBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = Math.max(currentValue - 1, 1); // Limit to 1
    });
});


//[STEP 0]: Make sure our document is A-OK
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";

    // Attach an event listener to the form, not the button
    document.getElementById("add-orders").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form's default submission behavior

        // Retrieve form data
        let item = document.getElementById("Name").value;
        let quantity = document.getElementById("quantity").value;
        let itemPrice = document.getElementById("Price").value;
        let totalPrice = document.getElementById("TotalPrice").value;

        // Create the data to send
        let jsondata = {
            "Name": item,
            "Quantity": quantity,
            "Price": itemPrice,
            "Total_Price": totalPrice
        };

        // Fetch settings
        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        };

        // Make the API call
        fetch("https://krispyanchovies-33fe.restdb.io/rest/cart", settings)
            .then(data => {
                console.log("Success:", data);
                // Reset the form after successful submission
                document.getElementById("add-orders").reset();
                // Optionally show a success message
                alert("Order added successfully!");
            })
            .finally(() => {
                // Re-enable the submit button after the request is done
                document.getElementById("submit").disabled = false;
            });

        // Disable the submit button to prevent multiple submissions
        document.getElementById("submit").disabled = true;
    });
});

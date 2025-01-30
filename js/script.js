document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";
    const API_URL = "https://krispyanchovies-33fe.restdb.io/rest/cart";

    // Function to handle increment and decrement buttons
    function addEventListenersForModal(formId, quantityId, nameId, priceId, totalID) {
        const form = document.getElementById(formId);
        const quantityInput = document.getElementById(quantityId);
        const nameInput = document.getElementById(nameId);
        const priceInput = document.getElementById(priceId);
        const totalprice = document.getElementById(totalID);

        form.querySelector(".btn-outline-secondary:first-of-type").addEventListener("click", function () {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        form.querySelector(".btn-outline-secondary:last-of-type").addEventListener("click", function () {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent form submission from reloading the page

            // Gather form data
            const itemName = nameInput.value;
            const quantity = parseInt(quantityInput.value);
            const itemPrice = parseInt(priceInput.value);
            const totalPrice = totalprice.value;

            // Check if the item already exists in the cart
            fetch(`${API_URL}?q={"Name":"${itemName}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache",
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        alert("This item already exists in your cart!");
                    } else {
                        // Add the new item to the cart
                        const jsonData = {
                            Name: itemName,
                            Quantity: quantity,
                            Price: itemPrice.toFixed(2),
                            Total_Price: totalPrice,
                        };

                        fetch(API_URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-apikey": APIKEY,
                                "Cache-Control": "no-cache",
                            },
                            body: JSON.stringify(jsonData),
                        })
                            .then(response => response.json())
                            .then(() => {
                                alert("Item added to cart successfully!");
                                form.reset();
                                quantityInput.value = 1; // Reset quantity to 1
                            })
                            .catch(() => {
                                alert("Error adding item to the cart. Please try again.");
                            });
                    }
                })
                .catch(() => {
                    alert("Error checking cart. Please try again.");
                });
        });
    }

    // Add event listeners for each modal form
    addEventListenersForModal("add-orders-hammerhead", "quantity", "Name", "Price", "TotalPrice");
    addEventListenersForModal("add-orders-seahorse", "quantity2", "Name2", "Price2", "TotalPrice2");
    addEventListenersForModal("add-orders-dolphin", "quantity3", "Name3", "Price3", "TotalPrice3");
    addEventListenersForModal("add-orders-whale", "quantity4", "Name4", "Price4", "TotalPrice4");
    addEventListenersForModal("add-orders-turtle", "quantity5", "Name5", "Price5", "TotalPrice5");
    addEventListenersForModal("add-orders-lobster", "quantity6", "Name6", "Price6", "TotalPrice6");
    addEventListenersForModal("add-orders-sardine", "quantity7", "Name7", "Price7", "TotalPrice7");
    addEventListenersForModal("add-orders-otter", "quantity8", "Name8", "Price8", "TotalPrice8");
    addEventListenersForModal("add-orders-crab", "quantity9", "Name9", "Price9", "TotalPrice9");
});


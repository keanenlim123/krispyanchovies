document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";
    const API_URL = "https://krispyanchovies-33fe.restdb.io/rest/cart";

    function addEventListenersForModal(formId, quantityId, nameId, priceId, totalID, emailID) {
        const form = document.getElementById(formId);
        const quantityInput = document.getElementById(quantityId);
        const nameInput = document.getElementById(nameId);
        const priceInput = document.getElementById(priceId);
        const totalPriceInput = document.getElementById(totalID);
        const emailInput = document.getElementById(emailID);

        // Get user email from sessionStorage
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            emailInput.value = user.Email; // Store email instead of Full_Name
        }

        form.querySelector(".btn-outline-secondary:first-of-type").addEventListener("click", function () {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        form.querySelector(".btn-outline-secondary:last-of-type").addEventListener("click", function () {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const itemName = nameInput.value;
            const quantity = parseInt(quantityInput.value);
            const itemPrice = parseFloat(priceInput.value);
            const totalPrice = (quantity * itemPrice).toFixed(2);
            const userEmail = emailInput.value;


            // Check if the item already exists for this user's email
            fetch(`${API_URL}?q={"Name":"${itemName}", "Email":"${userEmail}"}`, {
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
                        alert("This item is already in your cart!");
                    } else {
                        const jsonData = {
                            Name: itemName,
                            Quantity: quantity,
                            Price: itemPrice.toFixed(2),
                            Total_Price: totalPrice,
                            Email: userEmail // Store email instead of User
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
                                quantityInput.value = 1;
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

    // Apply changes to all forms
    addEventListenersForModal("add-orders-hammerhead", "quantity", "Name", "Price", "TotalPrice", "Email");
    addEventListenersForModal("add-orders-seahorse", "quantity2", "Name2", "Price2", "TotalPrice2", "Email2");
    addEventListenersForModal("add-orders-dolphin", "quantity3", "Name3", "Price3", "TotalPrice3", "Email3");
    addEventListenersForModal("add-orders-whale", "quantity4", "Name4", "Price4", "TotalPrice4", "Email4");
    addEventListenersForModal("add-orders-turtle", "quantity5", "Name5", "Price5", "TotalPrice5", "Email5");
    addEventListenersForModal("add-orders-lobster", "quantity6", "Name6", "Price6", "TotalPrice6", "Email6");
    addEventListenersForModal("add-orders-sardine", "quantity7", "Name7", "Price7", "TotalPrice7", "Email7");
    addEventListenersForModal("add-orders-otter", "quantity8", "Name8", "Price8", "TotalPrice8", "Email8");
    addEventListenersForModal("add-orders-crab", "quantity9", "Name9", "Price9", "TotalPrice9", "Email9");
});


document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";
    document.getElementById("register").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        let fullname = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let points = document.getElementById("points").value;

        let jsondata = {
            "Full_Name": fullname,
            "Email": email,
            "Password": password,
            "Points": points
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        };

        fetch("https://krispyanchovies-33fe.restdb.io/rest/customer", settings)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Success:", data);
                alert("Account created successfully!");
                document.getElementById("register").reset();
                // Redirect to login.html after successful registration
                window.location.href = "login.html";
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Account exists! Please try again.");
            })
            .finally(() => {
                document.getElementById("submit").disabled = false;
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";

    document.getElementById("login").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Fetch user data from RestDB
        fetch(`https://krispyanchovies-33fe.restdb.io/rest/customer?q={"Email":"${email}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                alert("Account does not exist. Please sign up.");
                return;
            }

            let user = data[0]; // Get the first matching user
            if (user.Password === password) {
                alert("Login successful!");
                // Store user session (you can replace this with a proper session system)
                sessionStorage.setItem("user", JSON.stringify(user));
                window.location.href = "index.html"; // Redirect after login
            } else {
                alert("Incorrect password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while logging in. Please try again.");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let user = sessionStorage.getItem("user");

    if (!user) {
        alert("You must be logged in to view rewards!");
        window.location.href = "login.html"; // Redirect to login
        return;
    }

    user = JSON.parse(user);
    let points = user.Points || 0; // Default to 0 if Points is missing

    // Update the reward balance display
    document.getElementById("rewards").innerHTML = `Reward Balance: <h1><span class="text-success">${points} Coins</span></h1>`;
});
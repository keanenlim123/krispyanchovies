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

    document.getElementById("contact-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        let email = document.getElementById("email").value;
        let fullname = document.getElementById("fullname").value;
        let message = document.getElementById("message").value;

        // Create JSON data to send to the server
        let jsonData = {
            "Email": email,
            "Full_Name": fullname,
            "Message": message
        };

        // Send the data to the server (for example, to store in the database or send an email)
        fetch("https://krispyanchovies-33fe.restdb.io/rest/contactus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Contact request sent successfully:", data);
                alert("Thank you for contacting us! We will get back to you soon.");
                document.getElementById("contact-form").reset(); // Reset the form
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("contact-message").innerText = "An error occurred while submitting your message. Please try again.";
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
    const APIKEY = "678a60df19b96a25f2af6326";
    const API_URL = "https://krispyanchovies-33fe.restdb.io/rest/cart";

    let user = JSON.parse(sessionStorage.getItem("user"));
    const userEmail = user.Email;

    function fetchOrders() {
        fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("order-table-body");
                const subtotalCell = document.getElementById("subtotal-value");
                tableBody.innerHTML = "";
                let subtotal = 0;

                let userOrders = data.filter(order => order.Email === userEmail);

                if (userOrders.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="6" class="text-center">No orders found</td></tr>`;
                    subtotalCell.textContent = "$0.00";
                    document.getElementById("modal-total-price").textContent = "$0.00";
                    return;
                }

                userOrders.forEach((order, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${order.Name || "N/A"}</td>
                        <td>${order.Quantity || "0"}</td>
                        <td>$${order.Price || "0.00"}</td>
                        <td>$${order.Total_Price || "0.00"}</td>
                        <td>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${order._id}">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);

                    subtotal += parseFloat(order.Total_Price) || 0;
                });

                subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
                document.getElementById("modal-total-price").textContent = `$${subtotal.toFixed(2)}`;

                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id = this.getAttribute("data-id");
                        deleteOrder(id);
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                document.getElementById("order-table-body").innerHTML =
                    `<tr><td colspan="6" class="text-center text-danger">Failed to load data</td></tr>`;
            });
    }

    function deleteOrder(id) {
        if (confirm("Are you sure you want to delete this order?")) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Order deleted successfully!");
                        fetchOrders();
                    } else {
                        alert("Failed to delete the order.");
                    }
                })
                .catch(error => {
                    console.error("Error deleting order:", error);
                    alert("An error occurred while deleting the order.");
                });
        }
    }

    document.getElementById("checkout-btn").addEventListener("click", function () {
        let subtotal = document.getElementById("subtotal-value").textContent;
        document.getElementById("modal-total-price").textContent = subtotal;
    });

    fetchOrders();
});

document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";

    document.getElementById("forgot-password-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent default form submission

        let email = document.getElementById("forgot-email").value;
        let newPassword = document.getElementById("new-password").value;

        // Step 1: Fetch the user details using the provided email
        try {
            let response = await fetch(`https://krispyanchovies-33fe.restdb.io/rest/customer?q={"Email":"${email}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let users = await response.json();

            // If user not found
            if (users.length === 0) {
                document.getElementById("forgot-password-message").innerText = "Email not found. Please try again.";
                return;
            }

            let user = users[0]; // Get first matching user
            let userId = user._id; // RESTdb unique ID for the entry
            let fullname = user.Full_Name; // Get stored Full_Name
            let points = user.Points; // Get stored Points

            // Step 2: Update only the password while keeping Full_Name & Points unchanged
            let updateData = {
                "Full_Name": fullname, // Keep original full name
                "Email": email, // Keep original email
                "Password": newPassword, // Update password
                "Points": points // Keep original points
            };

            let updateResponse = await fetch(`https://krispyanchovies-33fe.restdb.io/rest/customer/${userId}`, {
                method: "PUT", // Use PUT for updates
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(updateData)
            });

            if (!updateResponse.ok) {
                throw new Error(`HTTP error! Status: ${updateResponse.status}`);
            }

            alert("Password updated successfully!");
            document.getElementById("forgot-password-form").reset();
            window.location.href = "login.html"; // Redirect to login page

        } catch (error) {
            console.error("Error:", error);
            document.getElementById("forgot-password-message").innerText = "Error resetting password. Please try again.";
        }
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let points = user.Points || 0;
    let userId = user._id;

    document.getElementById("rewards").innerHTML = `Reward Balance: <h1><span class="text-success">${points} Coins</span></h1>`;

    let redeemButtons = document.querySelectorAll(".redeem-btn");

    redeemButtons.forEach(button => {
        button.addEventListener("click", async function () {
            let cost = parseInt(this.getAttribute('data-cost'));
            let couponCode = this.getAttribute('data-coupon-code');
            let couponName = this.getAttribute('data-coupon-name');

            // Check if the user already has this coupon
            let alreadyHasCoupon = await checkIfCouponExists(user.Email, couponCode);

            if (alreadyHasCoupon) {
                alert(`You already own the "${couponName}" coupon.`);
                return;
            }

            if (points < cost) {
                alert("You don't have enough coins for this reward.");
                return;
            }

            let confirmRedeem = confirm(`Are you sure you want to redeem "${couponName}" for ${cost} coins?`);
            if (!confirmRedeem) return;

            this.disabled = true; // Prevent multiple clicks

            points -= cost;
            user.Points = points;
            sessionStorage.setItem("user", JSON.stringify(user));

            document.getElementById("rewards").innerHTML = `Reward Balance: <h1><span class="text-success">${points} Coins</span></h1>`;
            alert(`You have successfully redeemed "${couponName}"!`);

            await updateUserPointsInDB(userId, points);
            await addCouponToDB(user.Email, couponCode, couponName, this);
        });
    });

    async function checkIfCouponExists(email, couponCode) {
        try {
            let response = await fetch(`https://krispyanchovies-33fe.restdb.io/rest/coupons?q={"Email":"${email}","Coupon":"${couponCode}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "678a60df19b96a25f2af6326",
                    "Cache-Control": "no-cache"
                }
            });

            if (!response.ok) throw new Error("Failed to check for existing coupon");

            let existingCoupons = await response.json();
            return existingCoupons.length > 0; // Returns true if coupon exists
        } catch (error) {
            console.error("Error checking for existing coupon:", error);
            return false;
        }
    }

    async function updateUserPointsInDB(userId, newPoints) {
        let updateData = {
            "Full_Name": user.Full_Name,
            "Email": user.Email,
            "Password": user.Password,
            "Points": newPoints
        };

        try {
            let response = await fetch(`https://krispyanchovies-33fe.restdb.io/rest/customer/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "678a60df19b96a25f2af6326",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error("Failed to update points in the database");
            console.log("Database updated successfully:", await response.json());
        } catch (error) {
            console.error("Error updating database:", error);
        }
    }

    async function addCouponToDB(email, couponCode, code, button) {
        let newCouponData = {
            "Email": email,
            "Coupon": couponCode,
            "Code": code
        };

        try {
            console.log(`Creating new coupon: ${couponCode}`);

            let createResponse = await fetch("https://krispyanchovies-33fe.restdb.io/rest/coupons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "678a60df19b96a25f2af6326",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(newCouponData)
            });

            if (!createResponse.ok) throw new Error("Failed to add new coupon");
            console.log("New coupon added:", await createResponse.json());

            button.disabled = false; // Re-enable button after success
        } catch (error) {
            console.error("Error adding coupon:", error);
            alert("There was an error processing your reward. Please try again.");
            button.disabled = false; // Re-enable button if error occurs
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(sessionStorage.getItem("user"));


    let userEmail = user.Email;
    let points = user.Points || 0;

    document.getElementById("rewards").innerHTML = `Reward Balance: <h1><span class="text-success">${points} Coins</span></h1>`;

    fetchCartData(userEmail);

    document.getElementById("checkout-btn").addEventListener("click", showCheckoutModal);
});

document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "678a60df19b96a25f2af6326";
    const COUPON_API = "https://krispyanchovies-33fe.restdb.io/rest/coupons";
    const ORDER_API = "https://krispyanchovies-33fe.restdb.io/rest/orders";
    const CART_API = "https://krispyanchovies-33fe.restdb.io/rest/cart";
    const CUSTOMER_API = "https://krispyanchovies-33fe.restdb.io/rest/customer";

    let user = JSON.parse(sessionStorage.getItem("user"));
    const userEmail = user.Email;

    document.getElementById("payment-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const cardName = document.getElementById("card-name").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;
        const couponCode = document.getElementById("coupon-code").value.trim();
        const orderTotal = parseFloat(document.getElementById("modal-total-price").textContent.replace("$", "")) || 0;

        // Step 1: Process order
        processOrder(cardName, cardNumber, expiryDate, cvv, couponCode, orderTotal)
            .then(() => {
                // Step 2: Remove coupon from the database (if there's a valid coupon)
                if (couponCode) {
                    removeCouponFromDatabase(couponCode);
                }

                // Step 3: Update customer points
                updateCustomerPoints(userEmail, orderTotal);

                // Step 4: Delete all cart items for this email
                deleteUserCart(userEmail);
            })
            .catch(error => {
                console.error("Error processing order:", error);
                alert("An error occurred while processing your order. Try again later.");
            });
    });
    function removeCouponFromDatabase(couponCode) {
        return fetch(`${COUPON_API}?q={"Code":"${couponCode}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
            .then(response => response.json())
            .then(coupons => {
                if (coupons.length === 0) {
                    console.log("Coupon not found.");
                    return;
                }

                const couponId = coupons[0]._id;  // Assuming coupons[0] is the coupon object

                return fetch(`${COUPON_API}/${couponId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    }
                });
            })
            .then(() => {
                console.log("Coupon deleted successfully.");
            })
            .catch(error => {
                console.error("Error deleting coupon:", error);
            });
    }
    function updateCustomerPoints(email, orderTotal) {
        const pointsEarned = Math.floor(orderTotal / 10);
    
        return fetch(`${CUSTOMER_API}?q={"Email":"${email}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch customer data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Customer data received:", data); // Debugging
            
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Customer not found.");
            }
    
            const customer = data[0];
            console.log("Customer:", customer);  // Check the customer object received
    
            // Ensure Points defaults to 0 if undefined and handle invalid points
            let currentPoints = customer.Points || 0;  
            currentPoints = parseInt(currentPoints, 10);  // Convert Points to an integer
            if (isNaN(currentPoints)) {
                console.error("Invalid current points value:", customer.Points);
                throw new Error("Invalid points value.");
            }
    
            const newPoints = currentPoints + pointsEarned;
    
            console.log(`Updating points: ${currentPoints} -> ${newPoints}`);
    
            // Prepare the updated customer object
            const updatedCustomerData = {
                Email: customer.Email,
                Full_Name: customer.Name,
                Password: customer.Password,
                Points: newPoints // Update points
            };
    
            // Make the PUT request to update customer points
            return fetch(`${CUSTOMER_API}/${customer._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(updatedCustomerData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update customer points: ${response.status} ${response.statusText}`);
            }
            console.log("Customer points updated successfully!");
        })
        .catch(error => {
            console.error("Error updating customer points:", error);
            alert(error.message || "An error occurred while updating customer points.");
        });
    }
    

    function processOrder(cardName, cardNumber, expiryDate, cvv, couponCode, orderTotal) {
        const orderData = {
            Email: userEmail,
            Cardholder_Name: cardName,
            Card_Number: cardNumber,
            Expiry_Date: expiryDate,
            CVV: cvv,
            Coupon: couponCode || "None",
            Total_Order: orderTotal
        };

        return fetch(ORDER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Order placement failed.");
                }
            });
    }

    function deleteUserCart(email) {
        fetch(`${CART_API}?q={"Email":"${email}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) return;

                let deletePromises = data.map(item => fetch(`${CART_API}/${item._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    }
                }));

                return Promise.all(deletePromises);
            })
            .then(() => {
                alert("Payment successful! Your order has been placed and cart has been cleared.");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error clearing cart:", error);
            });
    }
});

# krispyanchovies
Krispy Anchovies is an e-commerce company with a mission to make a positive impact on marine wildlife conservation. Specializing in aquatic animal-themed plushies, we aim to combine comfort and care for the environment. Each purchase contributes to initiatives focused on protecting and preserving marine ecosystems. By choosing one of our plushies, customers not only gain a soft, lovable companion but also become active participants in the effort to save ocean wildlife. Together, we are driving meaningful change, one plushie at a time.

Wireframe url: https://www.figma.com/design/JuX2SLEcaR2ifgpgJztHMJ/IP-Applied-design-Website-design?node-id=0-1&t=dPuwhIpjkLwQ6NEB-1

# Design Process
Theme & Visual Appeal making the website visually engaging while maintaining a professional and approachable feel.

Homepage - keeping it minimal the users will be curious about the contents of the website.By limiting the content, it will entice users to explore further. It also avoids overwhelming users with excessive text while still making the purpose of the site clear. Buttons act as call-to-action elements guiding users to other sections.

About Us - display the company Identity & Credibility. With clear presentation of the mission and fun facts that builds trust. There is also a section that shows the people who are incharge of the website.

Products - display all the company available products which users can click an interact with it. It also display the upcoming producst that will be coming soon.

Rewards - The Rewards Page plays a key role in gamifying the shopping experience, making it more engaging and rewarding for users. Users will be able to get points from buying our products and spending their points with our rewards page section

Cart - To display all the products added to cart

# Features
Navigation: The site features a collapsible hamburger menu for easy navigation in mobile.

Contact us - The users will be able to sent a messgae to us within the homepage.

# Technologies Used
Json
    - The project uses Json display the points on the rewards page.

Restdb
    - The project uses a unstructure databse restdb to manipule and store different types of data such as customer, orders, contact us, coupons and cart.
Bootstrap
    - The project uses bootstrap for compatibility with other devices such as mobile.

# Testing
Scenario 1(New account):
    Register:
        1. Click on "Sign Up!" on the login page
        2. Try to submit the form with empty fields and verify that a relevant error message appears
        3. Try to submit the form with all inputs valid and verify that a success message appears.
        4. Click on "Sign up!" verify that the website is on the login.

    Forget password:
        1. Click on "Forget password" on the login page
        2. Input the different values used in register.
        3. Try to submit the form with all inputs valid and verify that a success message appears.

    Login:
        1. After register the website will be on the login page.
        2. Input the same values use in register for email and password.
        3. Try to submit the form with empty fields and verify that a relevant error message appears.
        4. Try to submit the form with all inputs valid and verify that a success message appears.
        5. Click on "Login" verify that the website is on the homepage.

    Contact us:
        1. After login the website will be on the homepage page.
        2. Scroll down until there is a button called "Contact us".
        3. Click on "Contact us" and fill in the form with all inputs valid.
        4. Verify that a success message will pop up.

    Products:
        1. In the navgiation at the top of the page click on "Products".
        2. Scroll down and click on any of the button that says "Buy Now!".
        3. Change the quantity by clicking the "-" or "+" and fill in your own quantity by filling it with another number.
        4. Click on "Add to cart".
        5. Verify that a success message pop up.

    Cart:
        1. Click on the "cart" icon at the top left at the page.
        2. The table in the cart page should display all the products that were added in the cart from the products page.
        3. Click on "proceed to checkout".
        4. Try to submit the form with empty fields and verify that a relevant error message appears.
        5. Try to submit the form with all inputs valid and verify that a success message appears.

Scenario 2(Test account):
    Login:
        1. In the login page.
        2. Enter for Email "testing@gmail.com".
        3. Enter for Password "123".
        4. Click on "Login" verify that the website is on the homepage.

    Rewards:
        1. After logging in click on "Rewards".
        2. Scroll down and click on any of the 3 availble rewards
        3. Verify that a message pop up and click on "Ok"
        4. Verify that a success message pop up.

# Credits
Data manipulation with REST - https://restdb.io/docs/data-manipulation-with-rest

Bootstrap Grid system - https://getbootstrap.com/docs/4.0/layout/grid/
# Country Explorer App

A web application built using HTML, CSS, and JavaScript to explore countries around the globe.  This app features an interactive 3D globe and a country list view.

## Features

This application uses the following technologies and features:

**HTML:**

*   **Structure:** Uses divs to organize the navigation bar, globe container, country details modal, and error modal.
*   **Navigation Bar:** Includes a search bar, region filter dropdown, search button, and instructions button.
*   **3D Globe:** Employs a `<div>` element as a container for the 3D globe library.
*   **Modals:** Uses divs with CSS to create a modal for displaying country details and an error modal.
*   **Interactive Elements:** Employs buttons and a dropdown for user interaction.

**CSS:**

*   **Styling:** Styles all elements for a visually appealing user interface, including navigation bar, search bar, filter dropdown, buttons, modals, and country details displayed within the modal.
*   **Responsiveness:** Uses media queries to adapt the layout to various screen sizes.
*   **Animations:** Includes animations for a more engaging user experience (shooting stars, milky way background, glow effects).
*   **Layout:** Uses flexbox and grid for efficient layout management.

**JavaScript:**

*   **API Integration:** Fetches country data from the REST Countries API (`https://restcountries.com/v3.1/all`).
*   **3D Globe Library:** Integrates the `globe.gl` library for creating and interacting with the 3D globe.
*   **Data Handling:** Processes and manipulates country data to display points on the globe and details in the modal.
*   **Event Handling:** Uses event listeners for search, filtering, and clicking on countries.
*   **Modal Control:** Manages the display and hiding of modals.
*   **Local Storage:** Uses `localStorage` to store and retrieve favorited countries.
*   **Search Functionality:** Implements both real-time search and filtering based on country name.
*   **Region Filtering:** Enables filtering countries by region.
*   **Favorites:** Allows users to add countries to a favorites list with a limit of 5.
*   **Pagination:** The country list view uses pagination to display a limited number of countries per page.
*   **Error Handling:** Includes error handling for API requests and prevents exceeding the favorites limit.

## Functionality

1.  **Globe View:** Displays a 3D globe with countries represented as points. Clicking on a point displays a modal with country details. Clicking on the globe stops or starts its rotation.

2.  **Country List View:** Displays a list of countries. A search box filters the list. A region filter shows countries in a selected region.  A "Show More" button allows pagination through the list of countries.

3.  **Country Details Modal:** A modal pops up when clicking a country on the globe or in the list, displaying information like the country's flag, capital, population, area, and region.  A heart icon allows users to add the country to their favorites list (maximum 5).

4.  **Favorites:** Favorites are stored in the browser's local storage. The favorites list is displayed in a dedicated panel.

5.  **Instructions:** Provides instructions on how to use the application via a link in the navigation bar.


## Project Files

*   `index.html`: Main HTML file for the globe view.
*   `script.js`: JavaScript file for the globe view.
*   `styles.css`: CSS file for styling.
*   `index1.html`: Main HTML file for the country list view.
*   `script1.js`: JavaScript file for the country list view.
*   `styles1.css`: CSS file for styling the country list view.
*   `details.html`: HTML page for displaying country details.
*   `details.js`: Javascript file for handling country details.
*   `details.css`: CSS file for styling country details.
*   `instructions.html`: HTML page with instructions on using the app.


## Getting Started

1.  Clone this repository.
2.  Open `index.html` or `index1.html` in your web browser.


This README provides a comprehensive overview of the Country Explorer app.  Remember that this application relies on external APIs, and its functionality is dependent on their availability.

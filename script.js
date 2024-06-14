// Assuming you have data and pagination logic in script.js

// Number of pages and current page
const totalPages = 100; // Adjust based on your data
let currentPage = 1; // Initial page
const maxVisiblePages = 13; // Maximum number of visible pages before showing ellipsis

// Function to generate pagination links
function generatePagination() {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = ''; // Clear previous pagination

    // Previous button
    const prevButton = document.createElement('span');
    prevButton.innerHTML = '&lt;';
    prevButton.classList.add('prev-next');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderNewsItems(); // Assuming a function to render news items
            updatePagination(); // Update pagination links
        }
    });
    paginationElement.appendChild(prevButton);

    // Generate page links
    if (totalPages <= maxVisiblePages) {
        // Display all pages if total pages are less than or equal to maxVisiblePages
        for (let i = 1; i <= totalPages; i++) {
            createPageLink(i, paginationElement);
        }
    } else {
        // Determine start and end pages based on current page
        let startPage, endPage;
        if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxVisiblePages / 2);
            endPage = currentPage + Math.floor(maxVisiblePages / 2);
        }

        // Display first page and ellipsis if necessary
        if (startPage > 1) {
            createPageLink(1, paginationElement);
            if (startPage > 2) {
                createEllipsis(paginationElement);
            }
        }

        // Display middle pages
        for (let i = startPage; i <= endPage; i++) {
            createPageLink(i, paginationElement);
        }

        // Display last page and ellipsis if necessary
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                createEllipsis(paginationElement);
            }
            createPageLink(totalPages, paginationElement);
        }
    }

    // Next button
    const nextButton = document.createElement('span');
    nextButton.innerHTML = '&gt;';
    nextButton.classList.add('prev-next');
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderNewsItems(); // Assuming a function to render news items
            updatePagination(); // Update pagination links
        }
    });
    paginationElement.appendChild(nextButton);

    // Function to create page link
    function createPageLink(pageNum, container) {
        const pageLink = document.createElement('a');
        pageLink.href = '#'; // Placeholder link
        pageLink.textContent = pageNum;
        pageLink.classList.add('page-link');
        if (pageNum === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = pageNum;
            renderNewsItems(); // Assuming a function to render news items
            updatePagination(); // Update pagination links
        });
        container.appendChild(pageLink);
    }

    // Function to create ellipsis
    function createEllipsis(container) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        container.appendChild(ellipsis);
    }
}

// Call generatePagination initially
generatePagination();

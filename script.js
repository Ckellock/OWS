// Add your product link here
const PRODUCT_LINK = 'https://example.com/your-product';

// Set the product link when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const productButton = document.getElementById('productLink');
    
    if (productButton && PRODUCT_LINK !== 'https://example.com/your-product') {
        // Convert button to link
        productButton.addEventListener('click', function() {
            window.open(PRODUCT_LINK, '_blank');
        });
    } else {
        // If no link is set, show placeholder message
        productButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Please update the PRODUCT_LINK in script.js with your actual product URL');
        });
    }
    
    // Radix UI button accessibility enhancements
    productButton.setAttribute('role', 'button');
    productButton.setAttribute('tabindex', '0');
    
    // Keyboard support
    productButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            productButton.click();
        }
    });
});

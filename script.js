let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};




const observedParagraph = document.querySelector('.observed-paragraph');
const blackBox = document.querySelector('.black-box');
const highlighted = document.querySelector('.border');
const star = document.querySelector('.boom');
const shirt = document.querySelector('.shirt');

// Hide the shirt initially
shirt.style.opacity = '0';

// Define the callback function when the paragraph is in and out of view
const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The paragraph is now visible in the viewport
            console.log('Paragraph is visible!');

            // Add delay before applying animations
            setTimeout(() => {
                // Add border animation to highlighted elements
                highlighted.style.borderColor = 'rgb(0,0,0)';
                
                // Move and show the star
                star.style.display = 'inline-block';
                blackBox.style.display = 'inline-block';
                star.style.transition = '0.6s all ease-in';

                // Animate blackBox
                const blackBoxAnimation = blackBox.animate([
                    { width: '0' },  // initial state
                    { width: '70px' } // final state
                ], {
                    duration: 600,  // duration of the animation in milliseconds
                    fill: 'forwards' // keep the final state after the animation
                });

                // After blackBox animation is finished, start the shirt animation
                blackBoxAnimation.onfinish = () => {
                    shirt.style.opacity = '1';
                    shirt.animate([
                        { opacity: 0 },   // start with fully transparent
                        { opacity: 1 }    // end with fully opaque
                    ], {
                        duration: 800,  // 2 seconds for the fade-in effect
                        fill: 'forwards' // keep the final state (fully opaque) after the animation
                    });
                };

                // Other animations (if needed)
                highlighted.animate([
                    { clipPath: 'inset(0 100% 0 0)' },  // starts with no visible border (clipped horizontally)
                    { clipPath: 'inset(0 0 0 0)' }      // ends with the border fully covering the content
                ], {
                    duration: 700,  // 1 second for the border to fully expand horizontally
                    fill: 'forwards' // keep the final state (fully expanded border) after the animation
                });

                star.animate([
                    { width: '0' },  // initial state
                    { width: '50px' } // final state
                ], {
                    duration: 1000,  // duration of the animation in milliseconds
                    fill: 'forwards' // keep the final state after the animation
                });

                star.animate([
                    { opacity: 0 },   // start with fully transparent
                    { opacity: 1 }    // end with fully opaque
                ], {
                    duration: 2000,  // 2 seconds for the fade-in effect
                    fill: 'forwards' // keep the final state (fully opaque) after the animation
                });

            }, 300); // 1 second delay
        } else {
            // Reset styles when the paragraph is out of view
            console.log('Paragraph is not visible! Resetting...');

            // Start exit animation for the shirt
            const shirtExitAnimation = shirt.animate([
                { opacity: 1 },   // start with fully opaque
                { opacity: 0 }    // end with fully transparent
            ], {
                duration: 500,  // 0.5 seconds for the fade-out effect
                fill: 'forwards' // keep the final state (fully transparent) after the animation
            });

            // Reset shirt visibility after the exit animation is complete
            shirtExitAnimation.onfinish = () => {
                shirt.style.opacity = '0'; // Ensure it's fully hidden
            };

            // Reset other styles
            highlighted.style.borderColor = 'transparent';
            star.style.display = 'none';
            blackBox.style.display = 'none';
        }
    });
};

// Define the observer options
const options = {
    root: null, // null means the viewport
    threshold: 0.5 // The paragraph is considered visible if 50% of it is in the viewport
};

// Create the Intersection Observer
const observer = new IntersectionObserver(callback, options);

// Start observing the paragraph
observer.observe(observedParagraph);








document.addEventListener("DOMContentLoaded", function() {
    const categories = document.querySelectorAll('.category-btn');
    const allItems = document.querySelectorAll('.item-1'); // Select the parent container

    // Initially hide all items except those in the 'all' category
    allItems.forEach(item => {
        if (item.dataset.category !== 'all') {
            item.style.display = 'none'; // Hide the entire item-1 container
        }
    });

    // Highlight 'ALL' button
    categories.forEach(category => {
        if (category.dataset.category === 'all') {
            category.style.backgroundColor = 'black';
            category.style.color = 'white';
        } else {
            category.style.backgroundColor = '';
        }
    });

    categories.forEach(category => {
        category.addEventListener('click', function() {
            const selectedCategory = this.dataset.category;
            
            allItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = '';  // Show the entire item-1 container
                } else {
                    item.style.display = 'none'; // Hide the entire item-1 container
                }
            });

            // Reset category button styles and highlight the selected one
            categories.forEach(cat => {
                cat.style.backgroundColor = '';
                cat.style.color = '';
            });
            this.style.backgroundColor = 'black';
            this.style.color = 'white';
        });
    });
});





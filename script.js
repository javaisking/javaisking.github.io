document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to handle the smooth scrolling behavior and preserve the scroll position
    const container = document.getElementById('con');
    const scrollingContent = document.getElementById('scrollCon');
    let isScrolling = false;
    let items = [];  // Store all items
    let animationFrameId = null;  // Store animation frame ID for canceling
    
    // Function to initialize items and set their initial positions
    function initializeItems() {
      const allItems = scrollingContent.querySelectorAll('.language-item');
      items = Array.from(allItems); // Convert NodeList to array
    
      let leftOffset = 0; // Initial offset for the first item
    
      // Position each item absolutely side by side
      items.forEach((item, index) => {
        item.style.left = `${leftOffset}px`;
        leftOffset += item.offsetWidth + 20; // Add spacing between items (20px)
      });
    }
    
    // Function to start scrolling when hovering
    function startScrolling() {
      if (!isScrolling) {
        isScrolling = true;
        scrollingContent.style.transition = 'none'; // Disable transition to avoid jumps
        animateScroll(); // Start scrolling animation
      }
    }
    
    // Function to stop scrolling when unhovering
    function stopScrolling() {
      isScrolling = false;
      cancelAnimationFrame(animationFrameId); // Stop the scroll loop
    }
    
    // Function to animate scrolling
    function animateScroll() {
      if (isScrolling) {
        // Move each item to the left by 1px per frame
        items.forEach(item => {
          const currentLeft = parseFloat(item.style.left) || 0;
          item.style.left = `${currentLeft - 1}px`; // Move each item 1px left
    
          // If an item has completely moved off-screen (left side), move it to the right end
          if (currentLeft + item.offsetWidth <= 0) {
            // Move the item to the far right without disrupting the order
            moveItemToEnd(item);
          }
        });
    
        // Request next animation frame for continuous scrolling
        animationFrameId = requestAnimationFrame(animateScroll);
      }
    }
    
    // Function to move an item to the far right
    function moveItemToEnd(item) {
      const lastItem = items[items.length - 1];
      const lastItemLeft = parseFloat(lastItem.style.left) || 0;
      const nextLeftPosition = lastItemLeft + lastItem.offsetWidth + 20; // 20px gap between items
    
      // Reset the item's position to the far right
      item.style.left = `${nextLeftPosition}px`;
    
      // Move the item to the end of the array
      items.push(items.shift()); // Remove the first item and append it to the end of the array
    }
    
    // Event listeners for hover
    container.addEventListener('mouseenter', startScrolling);
    container.addEventListener('mouseleave', stopScrolling);
    
    // Initialize items when the page loads
    initializeItems();
    


    const glow = document.getElementById('glow');
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Track the mouse position
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Smoothly animate the glow
    function animate() {
        // Smoothly interpolate towards the target position
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        // Update glow position
        glow.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();


})

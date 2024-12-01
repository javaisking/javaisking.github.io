document.addEventListener('DOMContentLoaded', () => {
    // JavaScript to handle the smooth scrolling behavior and preserve the scroll position
    const scrollingContent = document.getElementById('scrollCon');
    let items = []; // Store all items
    let animationFrameId = null; // Store animation frame ID for canceling
    let scrollSpeed = 0.5; // Constant scroll speed
    
    // Function to initialize items and set their initial positions
    function initializeItems() {
      const allItems = scrollingContent.querySelectorAll('.language-item');
      items = Array.from(allItems); // Convert NodeList to array
    
      let leftOffset = 0; // Initial offset for the first item
    
      // Position each item absolutely side by side
      items.forEach((item) => {
        item.style.position = 'absolute'; // Ensure absolute positioning
        item.style.left = `${leftOffset}px`;
        leftOffset += item.offsetWidth + 35; // Add spacing between items
      });
    }
    
    // Function to animate scrolling
    function animateScroll() {
      // Move each item to the left by `scrollSpeed` pixels per frame
      items.forEach((item) => {
        const currentLeft = parseFloat(item.style.left) || 0;
        item.style.left = `${currentLeft - scrollSpeed}px`; // Move each item by `scrollSpeed`
    
        // If an item has completely moved off-screen (left side), move it to the right end
        if (currentLeft + item.offsetWidth <= 0) {
          moveItemToEnd(item);
        }
      });
    
      // Request next animation frame for continuous scrolling
      animationFrameId = requestAnimationFrame(animateScroll);
    }
    
    // Function to move an item to the far right
    function moveItemToEnd(item) {
      const lastItem = items[items.length - 1];
      const lastItemLeft = parseFloat(lastItem.style.left) || 0;
      const nextLeftPosition = lastItemLeft + lastItem.offsetWidth + 35; // 35px gap between items
    
      // Reset the item's position to the far right
      item.style.left = `${nextLeftPosition}px`;
    
      // Move the item to the end of the array
      items.push(items.shift()); // Remove the first item and append it to the end of the array
    }
    
    // Initialize items and start the animation
    initializeItems();
    animateScroll();

    
    


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

let cats = []; // Array to hold cat elements

function createCat() {
  const cat = document.createElement('img');
  const catImageUrl = chrome.runtime.getURL(`images/cat${Math.floor(Math.random() * 2) + 1}.gif`); // Random cat image
  cat.src = catImageUrl;
  cat.style.position = 'absolute';
  cat.style.width = '50px'; // Adjust size
  cat.style.height = '50px';
  cat.style.pointerEvents = 'none'; // Crucial for click-through!
  cat.style.zIndex = 9999; // Ensure cats are on top

  // Initial position (random)
  cat.style.left = Math.random() * window.innerWidth + 'px';
  cat.style.top = Math.random() * window.innerHeight + 'px';

  document.body.appendChild(cat);
  cats.push(cat);

  animateCat(cat);
}

function animateCat(cat) {
  // Basic animation (improve this with more sophisticated movement)
  let x = parseInt(cat.style.left);
  let y = parseInt(cat.style.top);
  let dx = Math.random() * 2 - 1; // Random direction
  let dy = Math.random() * 2 - 1;
  const catWidth = parseInt(cat.style.width);   // Get cat's width
  const catHeight = parseInt(cat.style.height); // Get cat's height

  setInterval(() => {
    x += dx;
    y += dy;

    // Boundary checks and bouncing
    if (x < 0) {
      x = 0;
      dx = Math.abs(dx); // Reverse direction to the right
      cat.style.transform = 'scaleX(1)'; // Ensure it faces right
    } else if (x + catWidth > window.innerWidth) {
      x = window.innerWidth - catWidth;
      dx = -Math.abs(dx); // Reverse direction to the left
      cat.style.transform = 'scaleX(-1)'; // Flip the image horizontally
    }
    if (y < 0) {
      y = 0;
      dy = Math.abs(dy); // Reverse direction downwards
    } else if (y + catHeight > window.innerHeight) {
      y = window.innerHeight - catHeight;
      dy = -Math.abs(dy); // Reverse direction upwards
    }

    // Image flipping based on horizontal direction
    if (dx > 0) {
      cat.style.transform = 'scaleX(1)'; // Face right
    } else {
      cat.style.transform = 'scaleX(-1)'; // Face left
    }

    cat.style.left = x + 'px';
    cat.style.top = y + 'px';
  }, 30); // Adjust animation speed
}

// Add initial cats (you can get the number from storage later)
for (let i = 0; i < 3; i++) {  // Start with 3 cats
  createCat();
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addCat") {
    createCat();
  }
  // ... handle removeCat
});
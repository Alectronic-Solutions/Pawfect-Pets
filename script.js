// JavaScript for Modal Functionality
const modalTriggers = document.querySelectorAll('.btn[data-modal-id][data-section]'); // Select all buttons with data-modal-id and data-section
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalFeatures = document.querySelector('.modal-features');
const modalTestimonialText = document.querySelector('.modal-testimonial-text');
const modalTestimonialAuthor = document.querySelector('.modal-testimonial-author');

// Service Data
const servicesData = {
    service1: {
        image: 'images/veterinary.jpg',
        title: 'Veterinary Services',
        description: 'Our experienced veterinarians provide comprehensive care for your pets, including routine check-ups, vaccinations, surgical procedures, and emergency care.',
        features: [
            'Routine Check-ups',
            'Vaccinations',
            'Surgical Procedures',
            'Emergency Care'
        ],
        testimonial: {
            text: '"The staff is incredibly knowledgeable and caring. My pet has never been healthier!"',
            author: '- Sarah T.'
        }
    },
    service2: {
        image: 'images/grooming.jpg',
        title: 'Professional Grooming',
        description: 'Keep your pets looking and feeling their best with our professional grooming services.',
        features: [
            'Bathing',
            'Brushing',
            'Nail Trimming',
            'Ear Cleaning'
        ],
        testimonial: {
            text: '"My dog looks and smells amazing after every grooming session. Highly recommend!"',
            author: '- John D.'
        }
    },
    service3: {
        image: 'images/training.jpg',
        title: 'Pet Training Programs',
        description: 'Our certified trainers use positive reinforcement methods to teach your pets obedience, behavioral correction, and socialization skills.',
        features: [
            'Obedience Training',
            'Behavioral Correction',
            'Socialization',
            'Puppy Training'
        ],
        testimonial: {
            text: '"Our puppy is now well-behaved and listens to commands. Thank you, Pawfect Pets!"',
            author: '- Emily R.'
        }
    }
};

// Blog Data
const blogsData = {
    blog1: {
        image: 'images/blog1.jpg',
        title: '5 Tips for a Happy Pet',
        content: `
            <p>Keeping your pet happy and healthy is a top priority for any pet owner. Here are five tips to ensure your furry friend lives their best life:</p>
            <ul>
                <li><strong>Regular Exercise:</strong> Daily walks, playtime, and interactive toys keep your pet physically and mentally stimulated.</li>
                <li><strong>Balanced Diet:</strong> Feed your pet high-quality food that meets their nutritional needs. Avoid overfeeding to prevent obesity.</li>
                <li><strong>Routine Vet Visits:</strong> Regular check-ups and vaccinations help catch health issues early and keep your pet in top shape.</li>
                <li><strong>Mental Stimulation:</strong> Puzzle toys, training sessions, and new environments can keep your pet's mind sharp and engaged.</li>
                <li><strong>Love and Attention:</strong> Pets thrive on affection. Spend quality time with them, and they'll return the love tenfold.</li>
            </ul>
            <p>By following these tips, you'll create a happy and healthy environment for your pet.</p>
        `,
    },
    blog2: {
        image: 'images/blog2.jpg',
        title: 'The Best Pet Grooming Tools',
        content: `
            <p>Grooming your pet isn't just about keeping them clean; it's also about maintaining their health and comfort. Here are the essential grooming tools every pet owner should have:</p>
            <ul>
                <li><strong>Slicker Brush:</strong> Ideal for removing loose hair and preventing matting in dogs and cats.</li>
                <li><strong>Nail Clippers:</strong> Regular nail trimming prevents discomfort and keeps your pet's nails at a healthy length.</li>
                <li><strong>Shampoo and Conditioner:</strong> Use pet-specific products to avoid skin irritation and ensure a thorough clean.</li>
                <li><strong>Ear Cleaning Solution:</strong> Regular ear cleaning helps prevent infections and keeps your pet's ears healthy.</li>
                <li><strong>Deshedding Tool:</strong> Perfect for pets with thick coats, this tool reduces shedding and keeps your home cleaner.</li>
            </ul>
            <p>Investing in these tools will make grooming sessions easier and more effective for both you and your pet.</p>
        `,
    },
    blog3: {
        image: 'images/blog3.jpg',
        title: 'Training Your Puppy at Home',
        content: `
            <p>Training your puppy is a crucial step in raising a well-behaved and happy dog. Here's a step-by-step guide to help you get started:</p>
            <ol>
                <li><strong>Start Early:</strong> Begin training as soon as you bring your puppy home. Consistency is key.</li>
                <li><strong>Use Positive Reinforcement:</strong> Reward good behavior with treats, praise, and affection. Avoid punishment.</li>
                <li><strong>Teach Basic Commands:</strong> Start with essential commands like "sit," "stay," "come," and "down."</li>
                <li><strong>Be Patient:</strong> Puppies have short attention spans, so keep training sessions short and fun.</li>
                <li><strong>Socialize Your Puppy:</strong> Introduce your puppy to different people, animals, and environments to build confidence.</li>
            </ol>
            <p>With patience and consistency, you'll have a well-trained and obedient puppy in no time.</p>
        `,
    }
};

// Function to show modal with content
function showModal(section, id) {
    let contentData;
    if (section === 'service') {
        contentData = servicesData[id];
    } else if (section === 'blog') {
        contentData = blogsData[id];
    }
    if (contentData) {
        modalImage.src = contentData.image;
        modalTitle.textContent = contentData.title;
        modalDescription.innerHTML = contentData.content || contentData.description;
        modalFeatures.innerHTML = '';
        if (contentData.features) {
            contentData.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });
        }
        modalTestimonialText.textContent = contentData.testimonial ? contentData.testimonial.text : '';
        modalTestimonialAuthor.textContent = contentData.testimonial ? contentData.testimonial.author : '';
        modal.classList.add('active');
        document.documentElement.classList.add('modal-open');
    }
}

// Function to hide modal
function hideModal() {
    modal.classList.remove('active');
    document.documentElement.classList.remove('modal-open');
}

// Add event listeners to triggers
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const section = trigger.getAttribute('data-section');
        const id = trigger.getAttribute('data-modal-id');
        showModal(section, id);
    });
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', hideModal);

// Close modal when clicking outside the content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeLightbox = document.querySelector('.close-lightbox');

// Open lightbox when an image is clicked
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = item.src;
        captionText.innerHTML = item.alt;
    });
});

// Close lightbox when the close button is clicked
if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Initial display
showTestimonial(currentTestimonial);

// Change testimonial every 6 seconds
setInterval(nextTestimonial, 6000);

const modalBtn = document.querySelector('.modal-btn');

modalBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    hideModal(); // Close the modal
    setTimeout(() => {
        // Scroll to the footer after the modal closes
        document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
    }, 300); // Delay to allow the modal to close first
});

// JavaScript for Video Background Switching
const videos = document.querySelectorAll('.hero-video');
let currentVideoIndex = 0;

// Function to start the video slider
function startVideoSlider() {
    videos.forEach((video, index) => {
        if (index === currentVideoIndex) {
            video.classList.add('active');
            video.play();
        } else {
            video.pause();
            video.currentTime = 0;
            video.classList.remove('active');
        }
    });
}

// Function to change to the next video
function nextVideo() {
    videos[currentVideoIndex].pause();
    videos[currentVideoIndex].currentTime = 0;
    videos[currentVideoIndex].classList.remove('active');

    currentVideoIndex = (currentVideoIndex + 1) % videos.length;

    videos[currentVideoIndex].classList.add('active');
    videos[currentVideoIndex].play();
}

// Start the video slider
startVideoSlider();

// Change video every 5 seconds
setInterval(nextVideo, 5000);

// Product Data
const productsData = {
    product1: {
        image: 'images/product1.jpg',
        title: 'Premium Dog Food',
        description: 'High-quality dog food for your furry friend.',
        price: '$29.99'
    },
    product2: {
        image: 'images/product2.jpg',
        title: 'Cat Toys Bundle',
        description: 'A collection of fun toys for your cat.',
        price: '$19.99'
    },
    product3: {
        image: 'images/product3.jpg',
        title: 'Pet Grooming Kit',
        description: 'Essential tools for grooming your pet at home.',
        price: '$39.99'
    }
};

// List of product IDs in order
const productIds = ['product1', 'product2', 'product3'];

// Get the current product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
let currentProductId = urlParams.get('product') || productIds[0];

// Find the index of the current product
let currentIndex = productIds.indexOf(currentProductId);

// Function to get the previous product index with cycling
function getPreviousIndex(index) {
    return (index - 1 + productIds.length) % productIds.length;
}

// Function to get the next product index with cycling
function getNextIndex(index) {
    return (index + 1) % productIds.length;
}

// Function to update product details
function updateProductDetails(productId) {
    const product = productsData[productId];
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <button class="arrow left" data-product="${getPreviousIndex(currentIndex)}">&#8249;</button>
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p class="price">Price: ${product.price}</p>
        <button class="arrow right" data-product="${getNextIndex(currentIndex)}">&#8250;</button>
    `;
    // Update current index
    currentIndex = productIds.indexOf(productId);
}

// Add event listeners to arrows
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('arrow')) {
        const newProductId = productIds[e.target.dataset.product];
        updateProductDetails(newProductId);
    }
});

// Initial product load
updateProductDetails(currentProductId);

// Back to Top Button Functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
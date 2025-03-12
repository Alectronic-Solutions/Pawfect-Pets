// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

function toggleNav() {
    // Toggle nav and burger
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        }
    });
}

// Add this new keyframe animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
`);

burger.addEventListener('click', toggleNav);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleNav();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        toggleNav();
    }
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide/show based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Modal Functionality
const modalTriggers = document.querySelectorAll('.btn[data-modal-id][data-section]');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalBtn = document.querySelector('.modal-btn');

// Service Data
const servicesData = {
    service1: {
        image: 'images/veterinary.jpg',
        title: 'Veterinary Services',
        description: 'Professional medical care for your beloved pets',
        features: [
            'Complete Health Examinations: Thorough physical assessments to ensure your pet\'s overall wellbeing',
            'Vaccinations & Preventive Care: Custom vaccination schedules and preventive treatments',
            'Surgery & Dental Services: State-of-the-art surgical procedures and dental cleaning',
            'Emergency Care Available: 24/7 emergency response team for critical situations',
            'Digital X-rays & Lab Testing: Advanced diagnostic equipment for accurate results',
            'Microchipping Services: Safe and permanent pet identification solution'
        ],
        price: 'Starting from $50',
        availability: '24/7 Emergency Care Available'
    },
    service2: {
        image: 'images/grooming.jpg',
        title: 'Professional Grooming',
        description: 'Spa-like experience for your furry friends',
        features: [
            'Full Service Bath & Brush: Deep cleaning with premium pet-safe products',
            'Breed-Specific Styling: Custom grooming tailored to your pet\'s breed',
            'Nail Trimming & Care: Professional nail maintenance and paw care',
            'Ear Cleaning: Gentle and thorough ear cleaning to prevent infections',
            'De-matting Treatment: Careful removal of tangles and mats',
            'Specialty Treatments: Custom spa treatments for skin conditions'
        ],
        price: 'Starting from $35',
        availability: 'Tuesday - Sunday, 9am - 6pm'
    },
    service3: {
        image: 'images/training.jpg',
        title: 'Pet Training Programs',
        description: 'Expert behavioral training and socialization',
        features: [
            'Basic Obedience Training: Essential commands and behavioral foundations',
            'Behavior Modification: Solutions for common behavioral issues',
            'Puppy Training Classes: Early socialization and basic training for puppies',
            'Private Sessions: One-on-one training tailored to your pet\'s needs',
            'Group Classes: Socialization and training in a group setting',
            'Agility Training: Fun and challenging physical activity courses'
        ],
        price: 'Starting from $45/session',
        availability: 'Flexible Scheduling Available'
    }
};

function showModal(id) {
    const service = servicesData[id];
    if (service) {
        modalImage.src = service.image;
        modalTitle.textContent = service.title;
        modalDescription.innerHTML = `
            <div class="modal-service-info">
                <p class="modal-full-description">${service.description}</p>
                <div class="modal-service-details">
                    <div class="modal-price">
                        <span class="detail-label">💰 Pricing:</span>
                        <span>${service.price}</span>
                    </div>
                    <div class="modal-availability">
                        <span class="detail-label">🕒 Availability:</span>
                        <span>${service.availability}</span>
                    </div>
                </div>
                <div class="modal-features-list">
                    <button class="collapsible">Services Included <span class="arrow-icon">▼</span></button>
                    <div class="collapsible-content">
                        <ul>
                            ${service.features.map(feature => {
                                const [title, description] = feature.split(':');
                                return `
                                    <li>
                                        <i class="fas fa-paw"></i>
                                        <strong>${title}</strong>
                                        <p>${description || ''}</p>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Add collapsible functionality
        const collapsible = modalDescription.querySelector('.collapsible');
        const content = modalDescription.querySelector('.collapsible-content');
        const arrow = collapsible.querySelector('.arrow-icon');
        
        collapsible.addEventListener('click', () => {
            collapsible.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                arrow.textContent = '▼';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                arrow.textContent = '▲';
            }
        });

        modal.classList.add('active');
        document.documentElement.classList.add('modal-open');
    }
}

function hideModal() {
    modal.classList.remove('active');
    document.documentElement.classList.remove('modal-open');
    // Reset collapsible content
    const collapsible = modalDescription.querySelector('.collapsible');
    const content = modalDescription.querySelector('.collapsible-content');
    const arrow = collapsible?.querySelector('.arrow-icon');
    if (collapsible && content && arrow) {
        collapsible.classList.remove('active');
        content.style.maxHeight = null;
        arrow.textContent = '▼';
    }
}

// Add click handlers for service card images
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking the button
        if (!e.target.classList.contains('btn')) {
            const modalId = card.querySelector('.btn').getAttribute('data-modal-id');
            showModal(modalId);
        }
    });
});

// Event Listeners for Modal
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const id = trigger.getAttribute('data-modal-id');
        showModal(id);
    });
});

// Close modal when clicking close button
closeBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        hideModal();
    }
});

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
        `
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
        `
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
        `
    }
};

// Gallery Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeLightbox = document.querySelector('.close-lightbox');
let currentImageIndex = 0;

function updateLightboxContent(index) {
    const item = galleryItems[index];
    lightboxImg.src = item.src;
    captionText.innerHTML = item.alt;
}

function openLightbox(imgSrc, caption, index) {
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    currentImageIndex = index;
    updateLightboxContent(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightboxContent(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent(currentImageIndex);
}

function closeLightboxFunction() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Event Listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(item.src, item.alt, index);
    });
});

closeLightbox.addEventListener('click', closeLightboxFunction);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunction();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightboxFunction();
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

if (modalBtn) {
    modalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal();
        setTimeout(() => {
            const footer = document.querySelector('#contact');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
}

// JavaScript for Video Background
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.classList.add('active');
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video is playing');
            }).catch(error => {
                console.error("Video play failed:", error);
                // Add a fallback background if video fails
                document.querySelector('.video-container').style.background = 'linear-gradient(135deg, #6c5ce7, #4cd1a5)';
            });
        }
    }
});

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

// Product-related code
const productDetails = document.getElementById('product-details');

// Only run product-related code if we're on the store page
if (productDetails) {
    // List of product IDs in order
    const productIds = ['product1', 'product2', 'product3'];

    // Get the current product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentProductId = urlParams.get('product') || productIds[0];

    // Find the index of the current product
    let currentIndex = productIds.indexOf(currentProductId);

    // Function to update product details
    function updateProductDetails(productId) {
        const product = productsData[productId];
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
}

// Store Order Modal Functionality
function createOrderModal() {
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="order-content">
            <span class="close">&times;</span>
            <h2 class="modal-title">Complete Your Order</h2>
            <form class="order-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Product:</span>
                        <span class="product-name"></span>
                    </div>
                    <div class="summary-row">
                        <span>Price:</span>
                        <span class="product-price"></span>
                    </div>
                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span class="total-price"></span>
                    </div>
                </div>
                <button type="submit" class="btn modal-btn">Place Order</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function showOrderModal(product) {
    const orderModal = document.querySelector('.order-modal') || createOrderModal();
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update order summary
    orderModal.querySelector('.product-name').textContent = product.title;
    orderModal.querySelector('.product-price').textContent = product.price;
    orderModal.querySelector('.total-price').textContent = product.price;

    // Add event listeners
    const closeBtn = orderModal.querySelector('.close');
    const form = orderModal.querySelector('form');
    const orderContent = orderModal.querySelector('.order-content');

    // Close on clicking outside
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    closeBtn.addEventListener('click', () => {
        orderModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your order processing logic here
        alert('Order placed successfully!');
        orderModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Update product click handlers
document.querySelectorAll('.product .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.closest('.product').dataset.productId;
        showOrderModal(productsData[productId]);
    });
});

// Update product click handlers
document.querySelectorAll('.product').forEach(product => {
    const productId = product.dataset.productId;
    const productImg = product.querySelector('img');
    const buyBtn = product.querySelector('.btn');

    // Make the whole product card and image clickable
    [productImg, buyBtn].forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            showOrderModal(productsData[productId]);
        });
    });
});

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

// Blog Modal Functionality
function showBlogModal(id) {
    const blog = blogsData[id];
    if (!blog) return;

    const blogModal = document.createElement('div');
    blogModal.className = 'blog-modal';
    blogModal.innerHTML = `
        <div class="blog-modal-content">
            <span class="close">&times;</span>
            <div class="blog-modal-header">
                <img src="${blog.image}" alt="${blog.title}">
                <h2 class="blog-modal-title">${blog.title}</h2>
                <div class="blog-modal-meta">
                    <span><i class="far fa-calendar"></i> ${blog.date || 'March 15, 2024'}</span>
                    <span><i class="far fa-user"></i> ${blog.author || 'By Dr. Sarah Wilson'}</span>
                </div>
            </div>
            <div class="blog-modal-body">
                ${blog.content}
            </div>
            <div class="blog-modal-footer">
                <button class="blog-contact-btn">Contact Us Now</button>
            </div>
        </div>
    `;

    document.body.appendChild(blogModal);
    setTimeout(() => blogModal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
        blogModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(blogModal);
            document.body.style.overflow = '';
        }, 300);
    };

    blogModal.querySelector('.close').addEventListener('click', closeModal);
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) closeModal();
    });

    blogModal.querySelector('.blog-contact-btn').addEventListener('click', () => {
        closeModal();
        setTimeout(() => {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Update blog post click handlers
document.querySelectorAll('[data-section="blog"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-modal-id');
        showBlogModal(id);
    });
});

// Remove the Terms of Service and Privacy Policy modal functionality

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.getElementById('primary-navigation');
const navLinks = document.querySelectorAll('.nav-links li');

// Single robust toggle function (guards if elements missing)
function toggleNav() {
	if (!nav || !burger) return;
	const isActive = nav.classList.toggle('active');
	burger.classList.toggle('active');
	burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
	nav.setAttribute('aria-hidden', isActive ? 'false' : 'true');
	document.body.style.overflow = isActive ? 'hidden' : '';
	navLinks.forEach((link, index) => {
		if (link.style.animation) link.style.animation = '';
		else link.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1 + 0.3}s`;
	});
}

// Attach only when elements exist
if (burger) burger.addEventListener('click', toggleNav);
if (navLinks && navLinks.length) {
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (nav && nav.classList.contains('active')) toggleNav();
		});
	});
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
	if (nav && burger && nav.classList.contains('active') &&
		!nav.contains(e.target) && !burger.contains(e.target)) {
		toggleNav();
	}
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!header) return;
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
    
    lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// Modal accessibility helpers
let lastFocusedElement = null;

function setAriaOpen(element, open) {
    if (!element) return;
    element.setAttribute('aria-hidden', open ? 'false' : 'true');
}

// Simple focus trap (basic)
function trapFocus(modalEl) {
    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input[type="text"], input[type="email"], input[type="tel"], input[type="date"], input[type="time"], input[type="number"], select, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(modalEl.querySelectorAll(focusableSelectors));
    if (!focusables.length) return;
    
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    
    first.focus();
    
    function handleKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        } else if (e.key === 'Escape') {
            // Check which modal is open and close it
            if (document.querySelector('.service-card-modal-overlay')) closeServiceCardModal();
            if (document.querySelector('.gallery-lightbox[style*="display: block"]')) closeLightbox();
            if (document.querySelector('.blog-modal.active')) hideBlogModal();
            if (document.querySelector('.order-modal.active')) hideOrderModal();
        }
    }
    modalEl._trapHandler = handleKey;
    document.addEventListener('keydown', handleKey);
}

function releaseFocus(modalEl) {
    if (!modalEl || !modalEl._trapHandler) return;
    document.removeEventListener('keydown', modalEl._trapHandler);
    modalEl._trapHandler = null;
    if (lastFocusedElement) lastFocusedElement.focus();
}

// --- Data Objects ---
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

const servicesData = {
    service1: {
        image: 'images/veterinary.jpg',
        title: 'Veterinary Services',
        description: 'Professional medical care for your beloved pets',
        longDescription: `Our veterinary team provides preventative care, diagnostics, and advanced treatments. We combine compassionate handling with modern equipment to ensure fast, accurate care.`,
        features: [
            'Complete Health Examinations: Thorough physical assessments to ensure your pet\'s overall wellbeing',
            'Vaccinations & Preventive Care: Custom vaccination schedules and preventive treatments',
            'Surgery & Dental Services: State-of-the-art surgical procedures and dental cleaning',
            'Emergency Care Available: 24/7 emergency response team for critical situations',
            'Digital X-rays & Lab Testing: Advanced diagnostic equipment for accurate results',
            'Microchipping Services: Safe and permanent pet identification solution'
        ],
        price: 'Starting from $50',
        availability: '24/7 Emergency Care Available',
        testimonials: [
            { text: "The vets saved Luna's life and explained everything clearly.", author: "Sarah M." },
            { text: "Professional, kind and thorough. Highly recommended.", author: "John L." }
        ]
    },
    service2: {
        image: 'images/grooming.jpg',
        title: 'Professional Grooming',
        description: 'Spa-like experience for your furry friends',
        longDescription: `Our groomers offer breed-specific styling, gentle handling, and premium products. We focus on comfort and safety during every session.`,
        features: [
            'Full Service Bath & Brush: Deep cleaning with premium pet-safe products',
            'Breed-Specific Styling: Custom grooming tailored to your pet\'s breed',
            'Nail Trimming & Care: Professional nail maintenance and paw care',
            'Ear Cleaning: Gentle and thorough ear cleaning to prevent infections',
            'De-matting Treatment: Careful removal of tangles and mats',
            'Specialty Treatments: Custom spa treatments for skin conditions'
        ],
        price: 'Starting from $35',
        availability: 'Tuesday - Sunday, 9am - 6pm',
        testimonials: [
            { text: "My dog looked and smelled amazing after their groom.", author: "Emily R." },
            { text: "Gentle staff and excellent styling for my breed.", author: "Michael T." }
        ]
    },
    service3: {
        image: 'images/training.jpg',
        title: 'Pet Training Programs',
        description: 'Expert behavioral training and socialization',
        longDescription: `Tailored training plans for puppies and adult dogs focusing on positive reinforcement and practical, real-world results.`,
        features: [
            'Basic Obedience Training: Essential commands and behavioral foundations',
            'Behavior Modification: Solutions for common behavioral issues',
            'Puppy Training Classes: Early socialization and basic training for puppies',
            'Private Sessions: One-on-one training tailored to your pet\'s needs',
            'Group Classes: Socialization and training in a group setting',
            'Agility Training: Fun and challenging physical activity courses'
        ],
        price: 'Starting from $45/session',
        availability: 'Flexible Scheduling Available',
        testimonials: [
            { text: "Our puppy is so much calmer and listens now.", author: "Linda K." },
            { text: "Great trainers and very practical techniques.", author: "Rachel B." }
        ]
    }
};

const blogsData = {
    blog1: {
        image: 'images/blog1.jpg',
        title: '5 Tips for a Happy Pet',
        date: 'March 15, 2024',
        author: 'Dr. Sarah Wilson',
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
        date: 'March 10, 2024',
        author: 'Mark Thompson',
        content: `
            <p>Discover the professional grooming tools that every pet owner should have. Keep your furry friend looking their best with these expert-recommended grooming essentials.</p>
            <h4>Must-Have Tools</h4>
            <ul>
                <li><strong>Slicker Brush:</strong> Great for removing tangles and loose fur.</li>
                <li><strong>Nail Clippers:</strong> Essential for regular nail maintenance.</li>
                <li><strong>Pet-Safe Shampoo:</strong> Use a gentle formula to avoid skin irritation.</li>
                <li><strong>Grooming Wipes:</strong> Perfect for quick clean-ups between baths.</li>
            </ul>
        `
    },
    blog3: {
        image: 'images/blog3.jpg',
        title: 'Training Your Puppy at Home',
        date: 'March 5, 2024',
        author: 'Emma Davis',
        content: `
            <p>Start your puppy's training journey with confidence using our comprehensive guide. Learn effective techniques and establish good habits from day one.</p>
            <p>Focus on positive reinforcement. Reward good behavior with treats, praise, or toys. Keep training sessions short and fun to maintain your puppy's attention.</p>
            <h4>Key Commands to Start With:</h4>
            <ol>
                <li><strong>Sit:</strong> The most basic command.</li>
                <li><strong>Stay:</strong> Teaches patience and self-control.</li>
                <li><strong>Come:</strong> Crucial for safety.</li>
                <li><strong>Leave It:</strong> Prevents your puppy from picking up dangerous items.</li>
            </ol>
        `
    }
};

// --- Service Modal (NEW) ---
// This function creates the modal from scratch and is self-contained
let currentServiceModal = null; // To keep track of the created modal

function openServiceCardModal(id) {
	const service = servicesData[id];
	if (!service) return;

	if (document.querySelector('.service-card-modal-overlay')) return;

	lastFocusedElement = document.activeElement;
	currentServiceModal = document.createElement('div');
	currentServiceModal.className = 'service-card-modal-overlay';
	currentServiceModal.setAttribute('role', 'dialog');
	currentServiceModal.setAttribute('aria-modal', 'true');
	currentServiceModal.setAttribute('aria-labelledby', 'service-modal-title');

	try {
		currentServiceModal.innerHTML = `
			<div class="service-card-modal" tabindex="-1">
				<button class="scm-close" aria-label="Close">×</button>
				<div class="scm-grid">
					<div class="scm-media">
						<img src="${service.image}" alt="${service.title}">
					</div>
					<div class="scm-body">
						<h3 id="service-modal-title">${service.title}</h3>
						<p class="scm-long">${service.longDescription || service.description}</p>
						<div class="scm-meta">
							<span class="scm-price"><strong>Price:</strong> ${service.price}</span>
							<span class="scm-availability"><strong>Availability:</strong> ${service.availability}</span>
						</div>
						<h4>What's included</h4>
						<div class="scm-features" role="list">
							${service.features.map(f => {
								const parts = f.split(':');
								const title = parts.shift().trim();
								const desc = parts.join(':').trim();
								return `<div class="scm-feature" role="listitem">
									<div class="scm-feature-icon">🐾</div>
									<div class="scm-feature-body"><strong>${title}</strong>${desc ? `<div class="scm-feature-desc">${desc}</div>` : ''}</div>
								</div>`;
							}).join('')}
						</div>

						<h4>Client feedback</h4>
						<div class="scm-testimonial" aria-live="polite">
							<blockquote class="scm-test-text">${(service.testimonials && service.testimonials[0] && service.testimonials[0].text) || ''}</blockquote>
							<div class="scm-test-author">${(service.testimonials && service.testimonials[0] && service.testimonials[0].author) ? '— ' + service.testimonials[0].author : ''}</div>
							<div class="scm-test-controls">
								<button class="scm-test-prev btn">Prev</button>
								<button class="scm-test-next btn">Next</button>
							</div>
						</div>

						<div class="scm-cta">
							<button class="scm-book btn">Book Appointment</button>
							<button class="scm-close-btn btn">Close</button>
						</div>
					</div>
				</div>
			</div>
		`;

		document.body.appendChild(currentServiceModal);
		const dialog = currentServiceModal.querySelector('.service-card-modal');

		// --- Add Handlers for this specific modal ---
		let tIndex = 0;
		const tText = currentServiceModal.querySelector('.scm-test-text');
		const tAuthor = currentServiceModal.querySelector('.scm-test-author');
		
		function updateTestimonial() {
			const arr = service.testimonials || [];
			if (!arr.length) return;
			tIndex = (tIndex + arr.length) % arr.length;
			if (tText) tText.textContent = arr[tIndex].text;
			if (tAuthor) tAuthor.textContent = '— ' + arr[tIndex].author;
		}

		currentServiceModal.querySelector('.scm-test-prev')?.addEventListener('click', () => { tIndex--; updateTestimonial(); });
		currentServiceModal.querySelector('.scm-test-next')?.addEventListener('click', () => { tIndex++; updateTestimonial(); });
		currentServiceModal.querySelector('.scm-close')?.addEventListener('click', closeServiceCardModal);
		currentServiceModal.querySelector('.scm-close-btn')?.addEventListener('click', closeServiceCardModal);
		currentServiceModal.querySelector('.scm-book')?.addEventListener('click', () => {
            closeServiceCardModal();
            setTimeout(() => {
                // UPDATED: Point to the new booking form
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        });
        
		currentServiceModal.addEventListener('click', (e) => { 
            if (e.target === currentServiceModal) closeServiceCardModal(); 
        });

		document.documentElement.classList.add('modal-open');
		trapFocus(dialog);
		requestAnimationFrame(() => dialog.classList.add('active'));
	} catch (err) {
		console.error('openServiceCardModal error', err);
		if (currentServiceModal) currentServiceModal.remove();
        currentServiceModal = null;
	}
}

function closeServiceCardModal() {
    if (!currentServiceModal) return;
    try {
        const dialog = currentServiceModal.querySelector('.service-card-modal');
        releaseFocus(dialog);
        currentServiceModal.remove();
        currentServiceModal = null;
        document.documentElement.classList.remove('modal-open');
    } catch (err) {
        console.error('closeServiceCardModal error', err);
    }
}


// --- Gallery Lightbox (FIXED) ---
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption-text');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

function openLightbox(index) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    currentImageIndex = index;
    updateLightboxContent();
    lastFocusedElement = document.activeElement;
    lightbox.style.display = 'block';
    setAriaOpen(lightbox, true);
    document.documentElement.classList.add('modal-open');
    trapFocus(lightbox);
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    setAriaOpen(lightbox, false);
    document.documentElement.classList.remove('modal-open');
    releaseFocus(lightbox);
}

function updateLightboxContent() {
    if (currentImageIndex < 0) currentImageIndex = galleryItems.length - 1;
    if (currentImageIndex >= galleryItems.length) currentImageIndex = 0;

    const item = galleryItems[currentImageIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('figcaption');

    if (lightboxImg) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = caption.textContent;
}

function nextImage() {
    currentImageIndex++;
    updateLightboxContent();
}

function prevImage() {
    currentImageIndex--;
    updateLightboxContent();
}

// --- Blog Modal (FIXED) ---
const blogModal = document.getElementById('blog-modal');
const blogModalTitle = document.getElementById('blog-modal-title');
const blogModalImage = document.getElementById('blog-modal-image');
const blogModalMeta = document.getElementById('blog-modal-meta');
const blogModalBody = document.getElementById('blog-modal-body');

function showBlogModal(id) {
    const post = blogsData[id];
    if (!post || !blogModal) return;

    if (blogModalTitle) blogModalTitle.textContent = post.title;
    if (blogModalImage) blogModalImage.src = post.image;
    if (blogModalMeta) blogModalMeta.innerHTML = `
        <span><i class="far fa-calendar"></i> ${post.date}</span>
        <span><i class="far fa-user"></i> By ${post.author}</span>
    `;
    if (blogModalBody) blogModalBody.innerHTML = post.content;
    
    lastFocusedElement = document.activeElement;
    blogModal.classList.add('active');
    setAriaOpen(blogModal, true);
    document.documentElement.classList.add('modal-open');
    trapFocus(blogModal);
}

function hideBlogModal() {
    if (!blogModal) return;
    blogModal.classList.remove('active');
    setAriaOpen(blogModal, false);
    document.documentElement.classList.remove('modal-open');
    releaseFocus(blogModal);
}

// --- Order Modal (FIXED) ---
const orderModal = document.getElementById('order-modal');
const orderModalTitle = document.getElementById('order-modal-title');
const orderSummaryProduct = document.getElementById('order-summary-product');
const orderSummaryPrice = document.getElementById('order-summary-price');
const orderSummaryTotal = document.getElementById('order-summary-total');

function showOrderModal(id) {
    const product = productsData[id];
    if (!product || !orderModal) return;

    if (orderModalTitle) orderModalTitle.textContent = `Order: ${product.title}`;
    if (orderSummaryProduct) orderSummaryProduct.textContent = product.title;
    if (orderSummaryPrice) orderSummaryPrice.textContent = product.price;
    if (orderSummaryTotal) orderSummaryTotal.textContent = product.price;

    lastFocusedElement = document.activeElement;
    orderModal.classList.add('active');
    setAriaOpen(orderModal, true);
    document.documentElement.classList.add('modal-open');
    trapFocus(orderModal);
}

function hideOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('active');
    setAriaOpen(orderModal, false);
    document.documentElement.classList.remove('modal-open');
    releaseFocus(orderModal);
    // Optional: Reset form
    document.getElementById('order-form')?.reset();
}


// --- Testimonials Carousel ---
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonials.length) return;
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (i === index) {
            testimonial.classList.add('active');
        }
    });
}

function nextTestimonial() {
    if (!testimonials.length) return;
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Initial display
if (testimonials.length) {
    showTestimonial(currentTestimonial);
    // Change testimonial every 6 seconds
    setInterval(nextTestimonial, 6000);
}


// --- Back to Top Button (FIXED) ---
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- DOMContentLoaded: Attach all dynamic listeners ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Delegated click handler for modals
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-id][data-section]');
        if (trigger) {
            e.preventDefault();
            const id = trigger.getAttribute('data-modal-id');
            const section = trigger.getAttribute('data-section');
            
            if (section === 'service') {
                openServiceCardModal(id);
            } else if (section === 'blog') {
                showBlogModal(id);
            } else if (section === 'store') {
                showOrderModal(id);
            }
        }
    });

    // Gallery Lightbox listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
        // Add keyboard accessibility
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    document.querySelector('.close-lightbox')?.addEventListener('click', closeLightbox);
    document.getElementById('prev-btn')?.addEventListener('click', prevImage);
    document.getElementById('next-btn')?.addEventListener('click', nextImage);

    // Blog Modal listeners
    document.querySelector('.blog-modal .close')?.addEventListener('click', hideBlogModal);
    document.getElementById('blog-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'blog-modal') hideBlogModal();
    });
    document.querySelector('.blog-contact-btn')?.addEventListener('click', () => {
        hideBlogModal();
        setTimeout(() => {
            // UPDATED: Point to the new booking form
            document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    });


    // Order Modal listeners
    document.querySelector('.order-modal .close')?.addEventListener('click', hideOrderModal);
    document.getElementById('order-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'order-modal') hideOrderModal();
    });
    document.getElementById('order-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your order!');
        hideOrderModal();
    });

    // (NEW) Appointment Form listener
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Placeholder for real submission logic
            alert('Thank you for your request! We will contact you shortly to confirm.');
            appointmentForm.reset();
        });
    }

    // Video Background
    const video = document.querySelector('.hero-video');
    if (video) {
        video.classList.add('active');
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error("Video play failed, showing fallback:", error);
                document.querySelector('.video-container').style.background = 'linear-gradient(135deg, #6c5ce7, #4cd1a5)';
            });
        }
    }
});

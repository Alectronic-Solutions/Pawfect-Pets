document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data ---
    const servicesData = {
        service1: {
            title: "Veterinary Care",
            image: "images/veterinary.jpg",
            desc: "Our state-of-the-art veterinary clinic offers comprehensive care ranging from routine check-ups to complex surgeries.",
            features: ["24/7 Emergency Care", "Digital X-Rays", "In-house Lab", "Dental Surgery"],
            price: "Consultation from $50"
        },
        service2: {
            title: "Premium Grooming",
            image: "images/grooming.jpg",
            desc: "Pamper your pet with our spa-like grooming services. We use only organic, hypoallergenic products.",
            features: ["Breed Specific Cuts", "Organic Shampoos", "Nail Grinding", "Ear Cleaning"],
            price: "Starts at $45"
        },
        service3: {
            title: "Expert Training",
            image: "images/training.jpg",
            desc: "From puppy preschool to agility training, our certified behaviorists help your pet reach their potential.",
            features: ["Puppy Socialization", "Behavior Modification", "Agility Courses", "1-on-1 Sessions"],
            price: "$60 per hour"
        }
    };

    const productsData = {
        product1: { title: "Premium Dog Food", price: "$29.99" },
        product2: { title: "Cat Toys Bundle", price: "$19.99" },
        product3: { title: "Pro Grooming Kit", price: "$39.99" }
    };

    const blogData = {
        blog1: { title: "5 Tips for a Happy Pet", image: "images/blog1.jpg", content: "<p>Keeping your pet happy...</p>" },
        blog2: { title: "Grooming Tools Guide", image: "images/blog2.jpg", content: "<p>Essential tools...</p>" },
        blog3: { title: "Puppy Training 101", image: "images/blog3.jpg", content: "<p>Starting right...</p>" }
    };

    // --- Navigation & Header ---
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // --- Service Modal Logic ---
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-id][data-section="service"]');
        if (trigger) {
            e.preventDefault();
            const id = trigger.dataset.modalId;
            openServiceModal(id);
        }
    });

    function openServiceModal(id) {
        const data = servicesData[id];
        if (!data) return;

        // Create modal dynamically
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'service-card-modal-overlay active';
        modalOverlay.innerHTML = `
            <div class="service-card-modal">
                <div class="scm-media"><img src="${data.image}" alt="${data.title}"></div>
                <div class="scm-body">
                    <button class="scm-close">&times;</button>
                    <h2>${data.title}</h2>
                    <p style="margin: 1rem 0; color: #ccc; line-height: 1.6;">${data.desc}</p>
                    <ul style="margin-bottom: 1.5rem; list-style: disc; padding-left: 1.5rem; color: var(--secondary);">
                        ${data.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 1.5rem;">${data.price}</div>
                    <button class="btn btn-primary scm-book-btn">Book Appointment</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';

        // Event listeners for closing
        const closeBtn = modalOverlay.querySelector('.scm-close');
        const bookBtn = modalOverlay.querySelector('.scm-book-btn');

        const closeModal = () => {
            modalOverlay.remove();
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) closeModal();
        });

        bookBtn.addEventListener('click', () => {
            closeModal();
            document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Simple Modals (Order & Blog) ---
    function toggleModal(modalId, show = true) {
        const modal = document.getElementById(modalId);
        if(!modal) return;
        if(show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close buttons for standard modals
    document.querySelectorAll('.close-modal, .close-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-backdrop');
            toggleModal(modal.id, false);
        });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) toggleModal(modal.id, false);
        });
    });

    // Open Order Modal
    document.querySelectorAll('[data-section="store"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.modalId;
            const data = productsData[id];
            if(data) {
                document.getElementById('order-summary-product').textContent = data.title;
                document.getElementById('order-summary-total').textContent = data.price;
                toggleModal('order-modal', true);
            }
        });
    });

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentImgIndex = 0;

    if(lightbox) {
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImgIndex = index;
                updateLightbox();
                lightbox.style.display = 'flex';
            });
        });

        document.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            currentImgIndex = (currentImgIndex + 1) % galleryImgs.length;
            updateLightbox();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            currentImgIndex = (currentImgIndex - 1 + galleryImgs.length) % galleryImgs.length;
            updateLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    function updateLightbox() {
        lightboxImg.src = galleryImgs[currentImgIndex].src;
    }

    // --- Testimonial Carousel ---
    const testimonials = document.querySelectorAll('.testimonial');
    let testIndex = 0;

    function cycleTestimonials() {
        testimonials.forEach(t => t.classList.remove('active'));
        testimonials[testIndex].classList.add('active');
        testIndex = (testIndex + 1) % testimonials.length;
    }

    if(testimonials.length > 0) {
        setInterval(cycleTestimonials, 5000);
    }

    // --- Form Submission ---
    const apptForm = document.getElementById('appointment-form');
    if(apptForm) {
        apptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Request received! We will contact you shortly.');
            apptForm.reset();
        });
    }
});

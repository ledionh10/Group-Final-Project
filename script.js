
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeWorkoutButtons();
    initializeFormHandling();
    initializeScrollAnimations();
    console.log("[v0] FitZone website initialized successfully");
});


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

  
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                   
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggle.click();
                    }
                }
            }
        });
    });
}


function initializeWorkoutButtons() {
    const workoutButtons = document.querySelectorAll('.btn-workout');
    let workoutTimer = null;
    let timeElapsed = 0;
    const timerDisplay = document.querySelector('.timer-display');
    const workoutTitle = document.getElementById('workoutTitle');

    workoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const workoutType = this.getAttribute('data-workout');
            const workoutModal = new bootstrap.Modal(document.getElementById('workoutModal'));
            
          
            const titles = {
                'beginner': 'Beginner Full Body Workout',
                'intermediate': 'Intermediate Strength Workout',
                'advanced': 'Advanced HIIT Training',
                'cardio': 'Cardio Endurance Blast'
            };
            
            if (workoutTitle) {
                workoutTitle.textContent = titles[workoutType] || 'Workout Session';
            }
            
            workoutModal.show();
            
         
            timeElapsed = 0;
            updateTimerDisplay(0);
            
           
            setTimeout(() => {
                startWorkoutTimer();
            }, 500);
        });
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateTimerDisplay(seconds) {
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(seconds);
        }
    }

    function startWorkoutTimer() {
        if (workoutTimer) return;
        
        workoutTimer = setInterval(() => {
            timeElapsed++;
            updateTimerDisplay(timeElapsed);
        }, 1000);
    }


    const workoutModal = document.getElementById('workoutModal');
    if (workoutModal) {
        workoutModal.addEventListener('hide.bs.modal', () => {
            if (workoutTimer) {
                clearInterval(workoutTimer);
                workoutTimer = null;
            }
        });
    }
}


function initializeFormHandling() {
    const signupForm = document.getElementById('signupForm');
    const contactForm = document.querySelector('.contact-form');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('Welcome to FitZone! Check your email for membership details.');
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
                signupForm.reset();
            }, 1500);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('Thank you! We\'ll get back to you within 24 hours.');
            setTimeout(() => {
                contactForm.reset();
            }, 1500);
        });
    }
}

function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '80px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '400px';
    alertDiv.innerHTML = `
        <strong>Success!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}


function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

  
    document.querySelectorAll('.plan-card, .workout-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}


document.querySelectorAll('.btn-plan, .btn-plan-primary').forEach(button => {
    button.addEventListener('click', function() {
        const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
        signupModal.show();
    });
});

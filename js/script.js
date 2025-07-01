function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-toggle');
    
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Simple option selection
function selectOption(optionType) {
    // Remove active from all options
    document.querySelectorAll('.pricing-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelectorAll('.radio-button').forEach(radio => {
        radio.classList.remove('active');
    });
    
    // Add active to selected option
    if (optionType === 'single') {
        document.querySelector('.single-option').classList.add('active');
        document.querySelector('.single-option .radio-button').classList.add('active');
    } else if (optionType === 'double') {
        document.querySelector('.double-option').classList.add('active');
        document.querySelector('.double-option .radio-button').classList.add('active');
    } else if (optionType === 'try-once') {
        document.querySelector('.try-once-option').classList.add('active');
        document.querySelector('.try-once-option .radio-button').classList.add('active');
    }
}

// Simple fragrance selection
function selectFragrance(element) {
    const parent = element.closest('.fragrance-selection');
    parent.querySelectorAll('.fragrance-option').forEach(option => {
        option.classList.remove('active');
        const radio = option.querySelector('.radio-button');
        if (radio) radio.classList.remove('active');
    });
    element.classList.add('active');
    const selectedRadio = element.querySelector('.radio-button');
    if (selectedRadio) selectedRadio.classList.add('active');
}

// Simple type selection for Try Once
function selectType(type) {
    document.querySelectorAll('.type-option').forEach(option => {
        option.classList.remove('active');
    });
    
    if (type === 'single') {
        document.querySelector('.type-option').classList.add('active');
        document.querySelector('.fragrance-2').style.display = 'none';
    } else if (type === 'double') {
        document.querySelectorAll('.type-option')[1].classList.add('active');
        document.querySelector('.fragrance-2').style.display = 'block';
    }
}

// Simple thumbnail selection
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const paginationDots = document.querySelectorAll('.pagination-dots .dot');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            paginationDots.forEach(dot => dot.classList.remove('active'));
            
            this.classList.add('active');
            paginationDots[index].classList.add('active');
        });
    });

    // Counter animation for stats (on scroll into view, every time)
    const counters = document.querySelectorAll('.stat-value');
    const statsSection = document.querySelector('.stats-section');
    let animating = false;
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animating) {
                animating = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = 40;
                    function updateCount() {
                        const increment = Math.ceil(target / speed);
                        if (count < target) {
                            count += increment;
                            if (count > target) count = target;
                            counter.innerText = `${count}%`;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = `${target}%`;
                        }
                    }
                    counter.innerText = '0%';
                    updateCount();
                });
            } else if (!entry.isIntersecting) {
                // Reset counters when section leaves viewport
                animating = false;
                counters.forEach(counter => {
                    counter.innerText = '0%';
                });
            }
        });
    }, { threshold: 0.4 }); // 40% of section visible
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Accordion functionality for Our Collection section
function toggleAccordion(header) {
  const item = header.parentElement;
  const accordion = item.parentElement;
  const allItems = accordion.querySelectorAll('.accordion-item');

  allItems.forEach(i => {
    if (i !== item) {
      i.classList.remove('active');
      i.querySelector('.accordion-icon').textContent = '+';
    }
  });

  const isActive = item.classList.contains('active');
  if (isActive) {
    item.classList.remove('active');
    header.querySelector('.accordion-icon').textContent = '+';
  } else {
    item.classList.add('active');
    header.querySelector('.accordion-icon').textContent = '−';
  }
}
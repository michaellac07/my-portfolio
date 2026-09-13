document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Make hero and contact starfield react to pointer movement
  const galaxySections = document.querySelectorAll('.hero, .contact-card');

  galaxySections.forEach(section => {
    section.addEventListener('mousemove', (event) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -20;
      section.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });

    section.addEventListener('click', (event) => {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const pop = document.createElement('span');
      pop.className = 'galaxy-pop';
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;

      const size = 14 + Math.round(Math.random() * 14);
      pop.style.width = `${size}px`;
      pop.style.height = `${size}px`;

      section.appendChild(pop);

      setTimeout(() => {
        if (pop && pop.parentNode) {
          pop.parentNode.removeChild(pop);
        }
      }, 900);
    });
  });

  // Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const targetFilter = e.target.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const categories = card.getAttribute('data-cat') || '';
        if (targetFilter === 'all' || categories.includes(targetFilter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal / Lightbox Functionality
  const modal = document.getElementById('workModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalLinks = document.getElementById('modalLinks');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const actionButtons = document.querySelectorAll('.card-btn');

  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-modal-title');
      const body = button.getAttribute('data-modal-body');

      modalTitle.textContent = title;
      modalBody.textContent = body;
      modalLinks.replaceChildren();

      for (let index = 1; index <= 5; index += 1) {
        const projectLink = button.getAttribute(`data-modal-link-${index}`);
        if (!projectLink) {
          continue;
        }

        const link = document.createElement('a');
        link.className = 'modal-link';
        link.href = projectLink;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = button.getAttribute(`data-modal-label-${index}`) || `Visit Link ${index}`;
        modalLinks.appendChild(link);
      }

      // Keep existing single-link projects working while they are being updated.
      if (!modalLinks.children.length) {
        const legacyLink = button.getAttribute('data-modal-link');
        if (legacyLink) {
          const link = document.createElement('a');
          link.className = 'modal-link';
          link.href = legacyLink;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = 'Visit Project';
          modalLinks.appendChild(link);
        }
      }
      modal.classList.add('active');
    });
  });

  // Close Modal triggers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});
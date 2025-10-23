// YILMAZLAR METAL - Basit JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobil menü toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }

  // Menü linklerine tıklandığında menüyü kapat
  const menuLinks = document.querySelectorAll('.site-nav a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (nav) {
        nav.classList.remove('open');
      }
    });
  });

  // Yıl güncelleme
  const yearSpan = document.getElementById('yil');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Galeri lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const currentImageSpan = document.getElementById('current-image');
  const totalImagesSpan = document.getElementById('total-images');
  let currentImageIndex = 0;
  let galleryImages = [];
  
  if (lightbox && lightboxImg) {
    // Galeri resimlerini topla
    const galleryLinks = document.querySelectorAll('.gallery a');
    galleryImages = Array.from(galleryLinks).map(link => link.getAttribute('href'));
    
    // Toplam resim sayısını güncelle
    if (totalImagesSpan) {
      totalImagesSpan.textContent = galleryImages.length;
    }
    
    // Galeri resimlerine tıklama
    galleryLinks.forEach(function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          currentImageIndex = index;
          showImage(href);
          lightbox.removeAttribute('hidden');
          document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı engelle
        }
      });
    });

    // Lightbox kapatma
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        closeLightbox();
      });
    }

    // Önceki/Sonraki butonları
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function() {
        previousImage();
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', function() {
        nextImage();
      });
    }

    // Lightbox dışına tıklayınca kapat
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // ESC tuşu ile kapat
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
        closeLightbox();
      }
    });

    // Sol/sağ ok tuşları ile resim değiştir
    document.addEventListener('keydown', function(e) {
      if (lightbox.hasAttribute('hidden')) return;
      
      if (e.key === 'ArrowLeft') {
        previousImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    });

    function showImage(src) {
      lightboxImg.src = src;
      if (currentImageSpan) {
        currentImageSpan.textContent = currentImageIndex + 1;
      }
    }

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      lightboxImg.src = '';
      document.body.style.overflow = 'auto'; // Sayfa kaydırmayı geri aç
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(galleryImages[currentImageIndex]);
    }

    function previousImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(galleryImages[currentImageIndex]);
    }
  }

  // Smooth scroll için basit çözüm
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('YILMAZLAR METAL sitesi yüklendi!');
});
// Splash Screen Animation dengan GSAP
    
    // Custom text splitting function for characters
    function splitTextToChars(element) {
      const text = element.textContent;
      element.innerHTML = '';
      const chars = [];
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        element.appendChild(span);
        chars.push(span);
      }
      
      return chars;
    }

    // Custom text splitting function for words
    function splitTextToWords(element) {
      const text = element.textContent;
      const words = text.split(' ');
      element.innerHTML = '';
      const wordElements = [];
      
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.marginRight = '0.25em';
        element.appendChild(span);
        wordElements.push(span);
      });
      
      return wordElements;
    }

    window.addEventListener('load', () => {
      const splashScreen = document.getElementById('splashScreen');
      const blackSlide = document.getElementById('blackSlide');
      const whiteSlide = document.getElementById('whiteSlide');
      const authorText = document.getElementById('authorText');
      const descriptionText = document.getElementById('descriptionText');
      const educationInfo = document.getElementById('educationInfo');
      const educationTitle = document.querySelector('.education-title');
      const educationSubtitle = document.querySelector('.education-subtitle');
      const loadingText = document.getElementById('loadingText');
      const mainContent = document.getElementById('mainContent');
      const cubeNote = document.getElementById('cubeNote');
      const informaticsText = document.querySelector('.informatics-text');

      // Split education text into characters and description into words
      const descriptionWords = splitTextToWords(descriptionText);
      
      // Store original education text for scramble effect
      const originalTitleText = educationTitle.textContent;
      const originalSubtitleText = educationSubtitle.textContent;

      // Create GSAP timeline
      const tl = gsap.timeline();

      // Initial setup - set elements to their starting positions
      gsap.set(blackSlide, { left: '-100vw' });
      gsap.set(whiteSlide, { left: '-100vw' });
      gsap.set(loadingText, { opacity: 1 });
      gsap.set(authorText, { color: '#888' });
      gsap.set([educationInfo, cubeNote, informaticsText], { opacity: 0 });
      gsap.set(descriptionText, { opacity: 1 }); // Show container but words start hidden
      gsap.set(mainContent, { opacity: 0, scale: 0.1 });
      
      // Prepare education text for scramble effect
      gsap.set([educationTitle, educationSubtitle], { text: "" });

      // Loading counter animation
      let counter = { value: 0 };
      
      tl
        // Wait 0.5s then start black slide
        .to(blackSlide, { 
          left: '0vw', 
          duration: 3, 
          ease: "power3.inOut",
          delay: 0.5 
        })
        // Animate counter synchronously with black slide
        .to(counter, {
          value: 100,
          duration: 3,
          ease: "power3.inOut",
          onUpdate: function() {
            loadingText.textContent = Math.floor(counter.value).toString().padStart(2, '0');
          }
        }, "<") // Start at the same time as black slide
        
        // Wait 0.5s after black slide completes
        .to({}, { duration: 0.5 })
        
        // Start white slide and hide loading text
        .to(whiteSlide, { 
          left: '0vw', 
          duration: 1.5, 
          ease: "power4.inOut" 
        })
        .to(loadingText, { opacity: 0, duration: 0.3, ease: "power3.inOut" }, "<")
        .to(authorText, { color: '#000', duration: 0.3, ease: "power3.inOut" }, "<")
        
        // Wait for white slide to complete, then show main content
        .to(mainContent, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: "power4.inOut" 
        })
        .call(() => {
          initializeCube();
        })
        // Show other elements with stagger effect
        .to(descriptionText, { 
          opacity: 1, 
          duration: 0.3, 
          ease: "power3.inOut" 
        })
        // Animate description words
        .to(descriptionWords, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)"
        }, "-=0.2")
        .to(educationInfo, { 
          opacity: 1, 
          duration: 0.3, 
          ease: "power3.inOut" 
        }, "-=0.3")
        // Animate education title and subtitle with scramble text simultaneously
        .to(educationTitle, {
          duration: 1.2,
          text: {
            value: originalTitleText,
            delimiter: ""
          },
          ease: "none"
        }, "-=0.2")
        .to(educationSubtitle, {
          duration: 1.0,
          text: {
            value: originalSubtitleText,
            delimiter: ""
          },
          ease: "none"
        }, "<") // Start at the same time as title
        .to([cubeNote, informaticsText], { 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power3.inOut" 
        }, "-=0.3")
        
        // Initialize everything after animations complete
        .call(() => {
          // Hide splash screen completely after all animations
          splashScreen.style.display = 'none';
          
          // Enable scrolling after animations complete
          document.body.classList.add('scrollable');
          
          // Add hover language switching for cube note
          const englishText = "*Click on any side to see description";
          const indonesianText = "*Klik salah satu sisi untuk lihat deskripsi";
          
          cubeNote.addEventListener('mouseenter', () => {
            cubeNote.textContent = indonesianText;
          });
          
          cubeNote.addEventListener('mouseleave', () => {
            cubeNote.textContent = englishText;
          });
          
          initializeDarkModeToggle();
          initializeActivitySection();
          initializeNavigation();
        });
    });

    // Auto scroll to hero section on refresh
    window.addEventListener('beforeunload', function () {
      window.scrollTo(0, 0);
    });

    // Cube functionality
    function initializeCube() {
      const cube = document.getElementById('cube');
      let rotateX = 15; // Mulai dari posisi rotasi awal
      let rotateY = 25; // Mulai dari posisi rotasi awal

      // Auto rotate - start immediately
      let autoRotate = true;
      const rotationInterval = setInterval(() => {
        if (autoRotate) {
          rotateY += 0.3;
          rotateX += 0.15;
          updateCubeTransform();
        }
      }, 50);

      // Update transform
      function updateCubeTransform() {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Start rotation immediately
      updateCubeTransform();

      // Fungsi untuk mencari jalur rotasi terdekat
      function getShortestRotation(current, target) {
        let diff = target - current;
        // Normalisasi ke range -180 hingga 180
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        return current + diff;
      }

      // Interaksi drag
      let isDragging = false;
      let prevX, prevY;

      document.addEventListener('mousedown', (e) => {
        isDragging = true;
        autoRotate = false;
        prevX = e.clientX;
        prevY = e.clientY;
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        autoRotate = true;
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;

        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;

        updateCubeTransform();

        prevX = e.clientX;
        prevY = e.clientY;
      });

      // Content templates for each face
      const faceContent = {
        front: {
          education: {
            title: "Informatics Student",
            subtitle: "at Institut Teknologi Nasional Bandung"
          },
          description: "I am an Informatics student with a strong interest in Machine Learning, Artificial Intelligence, Data Science, and Web Development."
        },
        back: {
          education: {
            title: "One Piece",
            subtitle: "Favorite Anime"
          },
          description: "One Piece is my favorite anime since junior high school, with its epic adventures, inspiring characters, and strong themes of friendship, dreams, and perseverance."
        },
        right: {
          education: {
            title: "Legend of Northern Blade",
            subtitle: "Favorite Manhwa"
          },
          description: "I enjoy reading comics, especially those with Murim and Mythology themes, and Legend of the Northern Blade is my favorite for its powerful storytelling."
        },
        left: {
          education: {
              title: "ICT LABORATORY",
              subtitle: "As a Researcher"
          },
          description: "I contribute as a researcher in the ICT Laboratory, focusing on projects related to artificial intelligence, computer vision, and data-driven solutions for real-world problems."
        },
        top: {
          education: {
            title: "Manchester United",
            subtitle: "Favorite Football Club"
          },
          description: "No comment, just a fan of Manchester United."
        },
        bottom: {
          education: {
            title: "Python Programming",
            subtitle: "Favorite Programming Language"
          },
          description: "Besides being easy to use, Python is great for machine learning and deep learning—fields I’m passionate about. Though it's relatively slow, its flexibility makes it useful for almost anything."
        }
      };

      // Function to update content
      function updateContent(face) {
        const descriptionText = document.getElementById('descriptionText');
        const educationTitle = document.querySelector('.education-title');
        const educationSubtitle = document.querySelector('.education-subtitle');
        
        const content = faceContent[face];
        if (content) {
          // Animate out current text
          gsap.to([descriptionText, educationTitle, educationSubtitle], {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
              // Update description content and split into words
              descriptionText.textContent = content.description;
              const newDescriptionWords = splitTextToWords(descriptionText);
              
              // Clear education text for scramble effect
              educationTitle.textContent = "";
              educationSubtitle.textContent = "";
              
              // Show containers
              gsap.set([descriptionText, educationTitle, educationSubtitle], { opacity: 1, scale: 1 });
              
              // Create animation timeline for new content
              const contentTl = gsap.timeline();
              
              // Animate education with scramble text effect simultaneously
              contentTl
                .to(educationTitle, {
                  duration: 1.0,
                  text: {
                    value: content.education.title,
                    delimiter: ""
                  },
                  ease: "none"
                })
                .to(educationSubtitle, {
                  duration: 0.8,
                  text: {
                    value: content.education.subtitle,
                    delimiter: ""
                  },
                  ease: "none"
                }, "<") // Start at the same time as title
                // Animate description words
                .to(newDescriptionWords, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.06,
                  ease: "back.out(1.7)"
                }, "-=0.3");
            }
          });
        }
      }

      // Klik sisi untuk rotasi ke depan
      const faceToRotation = {
        front:  { x:   0, y:   0 },
        back:   { x:   0, y: 180 },
        right:  { x:   0, y: -90 },
        left:   { x:   0, y:  90 },
        top:    { x: -90, y:   0 },
        bottom: { x:  90, y:   0 },
      };

      document.querySelectorAll('.face').forEach(face => {
        face.addEventListener('click', (e) => {
          autoRotate = false; // hentikan rotasi saat klik
          const target = e.currentTarget.dataset.face;
          if (faceToRotation[target]) {
            // Gunakan jalur rotasi terdekat
            rotateX = getShortestRotation(rotateX, faceToRotation[target].x);
            rotateY = getShortestRotation(rotateY, faceToRotation[target].y);
            updateCubeTransform();
            
            // Update content based on clicked face
            updateContent(target);
            
            // Mulai auto-rotate lagi setelah 1 detik
            setTimeout(() => {
              autoRotate = true;
            }, 1000);
          }
        });
      });
    }

    // Dark mode long press functionality
    function initializeDarkModeToggle() {
      const longPressIndicator = document.getElementById('longPressIndicator');
      let isLongPressing = false;
      let longPressTimer = null;
      let startTime = 0;
      let animationFrame = null;
      let isDarkMode = false;

      // Long press detection
      document.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Left click only
          isLongPressing = true;
          startTime = Date.now();
          
          // Position indicator near cursor
          longPressIndicator.style.left = (e.clientX + 20) + 'px';
          longPressIndicator.style.top = (e.clientY - 20) + 'px';
          longPressIndicator.classList.add('show');
          
          // Start progress animation
          function updateProgress() {
            if (!isLongPressing) return;
            
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / 2000) * 100, 100); // 2 seconds = 100%
            
            longPressIndicator.textContent = Math.floor(progress) + '%';
            
            if (progress >= 100) {
              // Toggle dark mode
              isDarkMode = !isDarkMode;
              document.body.classList.toggle('dark-mode', isDarkMode);
              longPressIndicator.classList.toggle('dark-mode', isDarkMode);
              
              // Change favicon based on dark mode
              const favicon = document.getElementById('favicon');
              if (isDarkMode) {
                favicon.href = 'img/logo-dark.svg';
              } else {
                favicon.href = 'img/logo.svg';
              }
              
              // Reset
              isLongPressing = false;
              longPressIndicator.classList.remove('show');
              return;
            }
            
            animationFrame = requestAnimationFrame(updateProgress);
          }
          
          animationFrame = requestAnimationFrame(updateProgress);
        }
      });

      document.addEventListener('mouseup', () => {
        isLongPressing = false;
        longPressIndicator.classList.remove('show');
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      });

      document.addEventListener('mouseleave', () => {
        isLongPressing = false;
        longPressIndicator.classList.remove('show');
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      });
    }

    // Activity Section Animation
    function initializeActivitySection() {
      const authorText = document.getElementById('authorText');
      const cubeNote = document.getElementById('cubeNote');
      const navbarMenu = document.getElementById('navbarMenu');
      
      // Handle author text scaling on scroll
      function handleScroll() {
        const scrollY = window.scrollY;
        const authorRect = authorText.getBoundingClientRect();
        const cubeNoteRect = cubeNote.getBoundingClientRect();
        
        // Check if author text has aligned with the cube note
        const authorBottom = authorRect.bottom;
        const cubeNoteTop = cubeNoteRect.top;
        
        if (authorBottom >= cubeNoteTop) {
          authorText.classList.add('navbar');
          navbarMenu.classList.add('show');
        } else {
          authorText.classList.remove('navbar');
          navbarMenu.classList.remove('show');
        }
      }
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
      
      // Create a scroll-triggered animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate marquee grid when it comes into view
            gsap.fromTo('.photo-marquee-grid', {
              opacity: 0,
              y: 30
            }, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out"
            });
            
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      });
      
      // Start observing the activity section
      const activitySection = document.getElementById('activitySection');
      observer.observe(activitySection);
    }

    // Navigation functionality
    function initializeNavigation() {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          const href = link.getAttribute('href');
          
          if (href === '#about') {
            // Scroll to top (hero section)
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          } else if (href === '#activity') {
            // Scroll to activity section
            const activitySection = document.getElementById('activitySection');
            if (activitySection) {
              activitySection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          } else if (href === '#project') {
            const projectsSection = document.getElementById('projectSection');
            if (projectsSection) {
              projectsSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          } else if (href === '#contact') {
            // Placeholder for future contact section
            const projectsSection = document.getElementById('contactSection');
            if (projectsSection) {
              projectsSection.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }

    // Initialize dark mode toggle after splash screen
    // ...existing code...
AOS.init();
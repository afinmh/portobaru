document.addEventListener('DOMContentLoaded', function() {
  // --- Tampilkan teks "INFORMATICS" di belakang ---
  const informaticsText = document.querySelector('.informatics-text');
  if(informaticsText) {
    informaticsText.classList.add('show');
  }

  // --- DATA PROJECT (Struktur & Deskripsi Diperbarui) ---
  const projects = [
    { 
      imageSrc: 'img/project/ifrit.png', 
      title: 'Ifrit',
      description: 'Integrated fire response system using IoT for rapid emergency alerts and efficient management.', 
      link: 'https://ifrit.seya.zip' 
    },
    { 
      imageSrc: 'img/project/cheator.png', 
      title: 'Cheator',
      description: 'AI-powered fraud detection system to identify cheating during online or offline examinations.', 
      link: 'https://cheator.seya.zip' 
    },
    { 
      imageSrc: 'img/project/hurufia.png', 
      title: 'Hurufia',
      description: 'Interactive web app designed for learning and mastering the rules of Tajwid in Quranic recitation.', 
      link: 'https://hurufia.netlify.app' 
    },
    { 
      imageSrc: 'img/project/ict.png', 
      title: 'ICT Laboratory',
      description: 'Official profile website for the Information & Communication Technology Laboratory at Itenas.', 
      link: 'https://labict.itenas.ac.id/' 
    },
    {
      imageSrc: 'img/project/filterjudol.png',
      title: 'FilterJudol',
      description: 'Machine learning model performing sentiment analysis related to the topic of Judol.',
      link: 'https://filterjudol.netlify.app/'
    },
    {
      imageSrc: 'img/project/energy-ai.png',
      title: 'EnergyAI',
      description: 'IoT-based dashboard for monitoring home electronic appliances with real-time anomaly detection.',
      link: 'https://energyaipro.netlify.app/'
    },
    {
      imageSrc: 'img/project/si-mbah.png',
      title: 'Si-Mbah',
      description: 'RAG-powered chatbot providing information sourced from a knowledge base of herbal plant journals.',
      link: 'https://si-mbah.vercel.app'
    },
    {
      imageSrc: 'img/project/nadella-tech.png',
      title: 'Nadella-Tech',
      description: 'Official company profile website developed for Nadella-Tech during a professional internship.',
      link: 'https://nadella-tech.vercel.app'
    },
    {
      imageSrc: 'img/project/handventure.png',
      title: 'Handventure',
      description: 'Real-time Indonesian Sign Language (BISINDO) detection application utilizing the MediaPipe.',
      link: 'https://handventure.vercel.app'
    }
  ];

  // --- Ambil Elemen DOM ---
  const monitorScreen = document.getElementById('monitorScreen');
  const projectNameEl = document.getElementById('projectName');
  const projectLinkEl = document.getElementById('projectLink');
  const projectItems = document.querySelectorAll('.project-list-item');
  
  let currentProjectIndex = -1;

  function updateProject(newIndex) {
    if (newIndex === currentProjectIndex || newIndex >= projects.length) return;
    const projectData = projects[newIndex];
    const oldImage = monitorScreen.querySelector('img');
    
    if (oldImage) {
      oldImage.classList.add('is-fading-out');
    }
    
    setTimeout(() => {
      if (oldImage) {
        oldImage.remove();
      }
      
      // PERBAIKAN: Menggunakan innerHTML untuk menampilkan judul (bold) dan deskripsi
      projectNameEl.innerHTML = `<strong>${projectData.title}:</strong> ${projectData.description}`;
      projectLinkEl.href = projectData.link;
      
      const newImage = document.createElement('img');
      newImage.src = projectData.imageSrc;
      newImage.classList.add('is-fading-out');
      monitorScreen.appendChild(newImage);
      newImage.offsetHeight;
      newImage.classList.remove('is-fading-out');
    }, 500);

    currentProjectIndex = newIndex;
  }

  // --- Inisialisasi IntersectionObserver ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.projectIndex);
        updateProject(index);
      }
    });
  }, observerOptions);

  projectItems.forEach(item => {
    observer.observe(item);
  });

  if (projects.length > 0) {
    setTimeout(() => updateProject(0), 100);
  }
});


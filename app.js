document.addEventListener('DOMContentLoaded', () => {
  // 👇 Spotlight effect
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  // 👇 Video hover play/pause
  const videoList = [
    document.getElementById('projectVideo1'),
    document.getElementById('projectVideo2'),
    document.getElementById('projectVideo3'),
    document.getElementById('projectVideo4')
  ];

  videoList.forEach(video => {
    video.addEventListener("mouseover", () => video.play());
    video.addEventListener("mouseout", () => video.pause());
  });

  // 👇 Contact form + CAPTCHA
  emailjs.init('VtF5A2FmEHjyrC4q9');
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('successMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      alert("Please complete the reCAPTCHA to continue.");
      return;
    }

    emailjs.sendForm('service_wn79asa', 'template_x9frguv', form)
      .then(() => {
        successBox.style.display = 'block';
        form.reset();
        grecaptcha.reset();
        setTimeout(() => successBox.style.display = 'none', 3000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        alert('Sorry, something went wrong. Please try again.');
      });
  });

  // 👇 Smooth scroll to contact section
  const contactBtn = document.getElementById("scrollToContact");
  const contactSection = document.getElementById("contact-section");
  if (contactBtn && contactSection) {
    contactBtn.addEventListener("click", () => {
      contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 👇 Hardware acceleration warning
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    if (renderer.toLowerCase().includes('swiftshader') || renderer.toLowerCase().includes('software')) {
      document.getElementById('webgl-warning').style.display = 'block';
    }
  } else {
    document.getElementById('webgl-warning').style.display = 'block';
  }
});

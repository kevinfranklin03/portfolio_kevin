    // Minimal JS just for the spotlight effect
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        // Update CSS variables for the spotlight effect
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    });


    const video1 = document.getElementById('projectVideo1');
    const video2 = document.getElementById('projectVideo2');
    const video3 = document.getElementById('projectVideo3');
    const video4 = document.getElementById('projectVideo4');

    const videoList =[video1, video2, video3, video4];

    videoList.forEach (function(video){
        video.addEventListener("mouseover", function(){
            video.play()
        })
        video.addEventListener("mouseout", function(){
        video.pause();
    })
    })


/**************** Contact Form with EmailJS + reCAPTCHA ****************/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Init EmailJS
  emailjs.init('VtF5A2FmEHjyrC4q9');  // Your public key

  // 2. Get form & success box
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('successMessage');

  // 3. Form submit event
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate CAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      alert("Please complete the reCAPTCHA to continue.");
      return;
    }

    // Send email via EmailJS
    emailjs.sendForm('service_wn79asa', 'template_x9frguv', form)
      .then(() => {
        successBox.style.display = 'block';
        form.reset();
        grecaptcha.reset(); // Reset CAPTCHA
        setTimeout(() => successBox.style.display = 'none', 3000);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        alert('Sorry, something went wrong. Please try again.');
      });
  });
});

function isWebGLBroken() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return true;

  // Try to get a simple WebGL param that should always work
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';

  // Block Intel GDI or “Software” fallback renderers
  if (renderer.toLowerCase().includes('swiftshader') || renderer.toLowerCase().includes('software')) {
    return true; // This is a software fallback — HW accel is likely off
  }

  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  if (isWebGLBroken()) {
    const warning = document.getElementById('webgl-warning');
    if (warning) warning.style.display = 'block';
  }
});

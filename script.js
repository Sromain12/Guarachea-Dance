document.getElementById('year').textContent = new Date().getFullYear();

const bookingForm = document.getElementById('bookingForm');
const smsBookingLink = document.getElementById('smsBookingLink');
const studioPhone = '8644440315';

function buildBookingText() {
  const name = document.getElementById('studentName')?.value.trim() || '';
  const phone = document.getElementById('studentPhone')?.value.trim() || '';
  const lessonType = document.getElementById('lessonType')?.value || '';
  const preferredDate = document.getElementById('preferredDate')?.value || '';
  const notes = document.getElementById('studentNotes')?.value.trim() || '';

  return `Hi Guarachea Dance, I want to join/book.\nName: ${name}\nPhone: ${phone}\nRequest: ${lessonType}\nPreferred date: ${preferredDate}\nNotes: ${notes}`;
}

function updateSmsLink() {
  if (!smsBookingLink) return;
  const body = encodeURIComponent(buildBookingText());
  smsBookingLink.href = `sms:${studioPhone}?&body=${body}`;
}

if (bookingForm) {
  bookingForm.addEventListener('input', updateSmsLink);
  bookingForm.addEventListener('change', updateSmsLink);
  smsBookingLink?.addEventListener('click', (event) => {
    const requiredFields = bookingForm.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach((field) => {
      if (!field.value.trim()) valid = false;
    });
    if (!valid) {
      event.preventDefault();
      bookingForm.reportValidity();
      return;
    }
    updateSmsLink();
  });
  updateSmsLink();
}

const openConsultationBtn = document.getElementById('openConsultationBtn');
const registerTrainingBtn = document.getElementById('registerTrainingBtn');
const closeConsultationModal = document.getElementById('closeConsultationModal');
const cancelConsultationBtn = document.getElementById('cancelConsultationBtn');
const consultModal = document.getElementById('consultModal');
const consultationForm = document.getElementById('consultationForm');
const consultationStatus = document.getElementById('consultationStatus');
const submitConsultationBtn = document.getElementById('submitConsultationBtn');

const openContactOptionsBtn = document.getElementById('openContactOptionsBtn');
const closeContactOptionsModal = document.getElementById('closeContactOptionsModal');
const contactOptionsModal = document.getElementById('contactOptionsModal');

const consultationEmail = 'mashcodtechnologies@gmail.com';
let requestType = 'consultation';

const openModal = (type = 'consultation') => {
    requestType = type;
    consultModal.classList.add('active');
    consultModal.setAttribute('aria-hidden', 'false');
    consultationStatus.textContent = '';
    consultationStatus.className = 'form-status';
};

const closeModal = () => {
    consultModal.classList.remove('active');
    consultModal.setAttribute('aria-hidden', 'true');
};

const openContactOptions = () => {
    contactOptionsModal.classList.add('active');
    contactOptionsModal.setAttribute('aria-hidden', 'false');
};

const closeContactOptions = () => {
    contactOptionsModal.classList.remove('active');
    contactOptionsModal.setAttribute('aria-hidden', 'true');
};

openConsultationBtn.addEventListener('click', () => openModal('consultation'));
registerTrainingBtn.addEventListener('click', () => openModal('training'));
closeConsultationModal.addEventListener('click', closeModal);
cancelConsultationBtn.addEventListener('click', closeModal);
openContactOptionsBtn.addEventListener('click', openContactOptions);
closeContactOptionsModal.addEventListener('click', closeContactOptions);
consultModal.addEventListener('click', (event) => {
    if (event.target === consultModal) {
        closeModal();
    }
});
contactOptionsModal.addEventListener('click', (event) => {
    if (event.target === contactOptionsModal) {
        closeContactOptions();
    }
});

const events = {
    '1-15':'Republic Day',
    '2-10':'Unit Test 1',
    '2-14':'Sports Day',
    '3-5':'Science Exhibition',
    '3-20':'Term1 Exams',
    '4-10':'Summer Vacation',
    '7-1':'School Reopens',
    '8-15':'Independence Day',
    '9-5':"Teachers' Day",
    '10-2':'Gandhi Jayanti',
    '10-15':'Term2 Exams',
    '11-3':'Diwali Break',
    '12-10':'Annual Day',
    '12-25':'Christmas'
};

const monthSelect = document.getElementById('monthSelect');
const calendarContainer = document.getElementById('calendarContainer');
if (monthSelect && calendarContainer) {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    months.forEach((m,i) => {
        const opt = document.createElement('option');
        opt.value = i+1;
        opt.textContent = m + ' 2026';
        monthSelect.appendChild(opt);
    });
    const renderCalendar = (month) => {
        const firstDay = new Date(2026, month-1, 1).getDay();
        const daysInMonth = new Date(2026, month, 0).getDate();
        const startOffset = (firstDay + 6) % 7; // Monday-first
        let html = '<table class="cal-table"><thead><tr>' + ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>'<th>'+d+'</th>').join('') + '</tr></thead><tbody><tr>';
        for (let i=0;i<startOffset;i++) html += '<td></td>';
        for (let d=1; d<=daysInMonth; d++) {
            const key = month + '-' + d;
            const ev = events[key] ? ' class="event-day" title="'+events[key]+'"' : '';
            html += '<td'+ev+'>'+d+'</td>';
            if ((startOffset + d) % 7 === 0) html += '</tr><tr>';
        }
        html += '</tr></tbody></table>';
        calendarContainer.innerHTML = html;
    };
    monthSelect.addEventListener('change', () => renderCalendar(parseInt(monthSelect.value)));
    renderCalendar(parseInt(monthSelect.value) || 1);
}
const announcementsList = document.getElementById('announcementsList');
const loadAnnouncementsBtn = document.getElementById('loadAnnouncementsBtn');
const announcementsButtonLabel = loadAnnouncementsBtn?.textContent ?? 'Load Announcements';

const loadAnnouncements = async () => {
    if (!announcementsList || !loadAnnouncementsBtn || loadAnnouncementsBtn.disabled) return;

    loadAnnouncementsBtn.disabled = true;
    loadAnnouncementsBtn.setAttribute('aria-busy', 'true');
    loadAnnouncementsBtn.replaceChildren(document.createTextNode('Loading announcements '));
    const dots = document.createElement('span');
    dots.className = 'loading-dots';
    dots.setAttribute('aria-hidden', 'true');
    dots.textContent = '•••';
    loadAnnouncementsBtn.append(dots);
    announcementsList.replaceChildren();
    const loadingItem = document.createElement('li');
    loadingItem.textContent = 'Fetching the latest announcements…';
    announcementsList.append(loadingItem);

    try {
        const response = await fetch('https://school-erp-demo-pp7c.onrender.com/api/v1/announcements?page=0&size=20');
        if (!response.ok) throw new Error(`Announcement request failed (${response.status}).`);
        const data = await response.json();
        const items = Array.isArray(data.content) ? data.content : [];
        announcementsList.replaceChildren();

        if (!items.length) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No announcements yet.';
            announcementsList.append(emptyItem);
            return;
        }

        items.forEach((announcement) => {
            const item = document.createElement('li');
            const date = document.createElement('strong');
            date.textContent = announcement.createdAt
                ? `${new Date(announcement.createdAt).toLocaleDateString()}: `
                : '';
            item.append(date, document.createTextNode(String(announcement.text ?? '')));
            announcementsList.append(item);
        });
    } catch (error) {
        const item = document.createElement('li');
        item.textContent = error instanceof TypeError
            ? 'Could not load announcements. Check your connection or the site’s API access.'
            : (error instanceof Error ? error.message : 'Could not load announcements.');
        announcementsList.replaceChildren(item);
    } finally {
        loadAnnouncementsBtn.disabled = false;
        loadAnnouncementsBtn.removeAttribute('aria-busy');
        loadAnnouncementsBtn.textContent = announcementsButtonLabel;
    }
};

if (loadAnnouncementsBtn) loadAnnouncementsBtn.addEventListener('click', loadAnnouncements);

if (!window.emailjs) {
    console.error('EmailJS library did not load.');
} else {
    emailjs.init({ publicKey: '-9XYATwPvbqzvrCn8' });
}

const showStatus = (message, type, fallbackUrl = '') => {
    consultationStatus.className = `form-status ${type}`;
    consultationStatus.replaceChildren(document.createTextNode(message));

    if (fallbackUrl) {
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.textContent = 'Email us directly';
        consultationStatus.append(' ', link);
    }
};

consultationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const mobile = document.getElementById('consultMobile').value.trim();
    const address = document.getElementById('consultAddress').value.trim();
    const isTrainingRequest = requestType === 'training';
    const requestLabel = isTrainingRequest ? 'Software Training and Internship Registration' : 'Consultation Request';

    const templateParams = {
        title: requestLabel,
        request_type: requestLabel,
        name,
        email,
        mobile,
        address,
        message: `demo school mail\n${requestLabel} details:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}`,
        to_email: consultationEmail
    };

    const mailtoUrl = `mailto:${consultationEmail}?subject=${encodeURIComponent(requestLabel)}&body=${encodeURIComponent(
        `Request type: ${requestLabel}\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}`
    )}`;

    if (!window.emailjs) {
        showStatus('We could not load the email service.', 'error', mailtoUrl);
        return;
    }

    submitConsultationBtn.disabled = true;
    submitConsultationBtn.textContent = 'Sending…';
    showStatus('Sending your request…', 'pending');

    try {
        await emailjs.send('service_8ciyex8', 'template_pm9a967', templateParams);
        consultationForm.reset();
        showStatus('Thanks for contacting us. We will get in touch soon.', 'success');
    } catch (error) {
        console.error('EmailJS error:', error);
        const reason = error?.text || error?.message || (error?.status ? `Request status: ${error.status}` : 'Unknown error');
        showStatus(`We could not send your request right now: ${reason}`, 'error', mailtoUrl);
    } finally {
        submitConsultationBtn.disabled = false;
        submitConsultationBtn.textContent = 'Submit Request';
    }
});

# Green Valley Demo School Website

Responsive school website for Green Valley Demo School, built with HTML, CSS, and vanilla JavaScript.

## Website sections
- Hero panels for admissions and student programs
- About Us and faculty profiles
- Programs and featured facilities
- Photo gallery
- Parent review, contact options, and admission inquiry form

## Project files
- `index.html` — page content and structure
- `css/style.css` — theme, layout, and responsive styles
- `js/script.js` — modal behavior and EmailJS form submission
- `css/photos/` — facility and gallery images (uses Unsplash URLs)

## Run locally
Open `index.html` in a browser, or serve the project folder with any static web server. The site loads Google Fonts, Font Awesome, and EmailJS from their hosted CDNs, so those features need an internet connection.

## Run to check backend connectivity features like announcements
run this command D:\workstation\demo-school-ui>python -m http.server 5173

Now open http://localhost:5173/ in browser it will open index.html

as http://localhost:5173/ is added as CORS allowed site on render environment variable
the backend communication will work.

## EmailJS configuration
The inquiry form is configured in `js/script.js` with an EmailJS public key, service ID, and template ID. Inquiries are sent to `mashcodtechnologies@gmail.com` with "demo school mail" included in the message body along with name, email, mobile, and address. Check the EmailJS template's subject and body settings to ensure they use the `title`, `request_type`, and `message` variables.

Do not store the EmailJS account password in this README or in website source files. Keep account credentials in a password manager and use EmailJS's dashboard to manage the service and template.

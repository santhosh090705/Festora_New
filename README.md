# 🎟 Festora — Discover & Book Live Events

> A full-stack event booking platform built with Firebase, AWS Amplify, and EmailJS.

![Festora](https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80)

## 🌐 Live URL
👉 **[https://main.d39qu7n6qbh7g3.amplifyapp.com](https://main.d39qu7n6qbh7g3.amplifyapp.com)**

---

## 📌 Features

- 🔐 **Google Authentication** via Firebase
- 🎫 **Event Browsing** — Music, Comedy, Sports, Festival, Tech
- 🛒 **3-Step Ticket Booking** with seat selection
- 📧 **Email Confirmation** via EmailJS — auto-sends e-pass after booking
- 🎟 **Digital E-Pass** with QR Code & Barcode
- 📋 **My Tickets** — full booking history from Firestore
- 🤖 **AI Chat Widget** — powered by Claude AI (bottom-right corner)
- 📱 **Fully Responsive** — works on mobile & desktop

---

## 🗂 Project Structure

```
Festora New/
├── index.html          # Homepage + Events listing + AI Chat widget
├── event-detail.html   # Event detail page + Booking modal
├── ticket.html         # E-Pass with QR code + EmailJS delivery
└── my-tickets.html     # User booking history
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Authentication | Firebase Google Auth |
| Database | Firebase Firestore |
| Hosting | AWS Amplify |
| Email | EmailJS |
| AI Widget | Anthropic Claude API |
| Fonts | Google Fonts (Bebas Neue, DM Sans, DM Serif Display) |

---

## 🔥 Firebase Setup

- **Project ID:** `festora-6bac8`
- **Region:** `asia-south1`
- **Auth:** Google Sign-In enabled
- **Firestore Collections:**
  - `events` — all event data
  - `bookings` — all bookings
  - `users/{uid}/bookings` — per-user bookings

---

## 🎪 Events Available

| Event | Category | Price | Venue |
|-------|----------|-------|-------|
| Arijit Singh Live | Music | ₹1,499 | DY Patil Stadium, Mumbai |
| Sunburn Arena ft. Martin Garrix | Music | ₹2,499 | MMRDA Grounds, Mumbai |
| Zakir Khan Comedy Show | Comedy | ₹799 | JLN Stadium, Delhi |
| Lollapalooza India 2026 | Festival | ₹3,999 | Mahalaxmi Racecourse, Mumbai |
| IPL: MI vs CSK | Sports | ₹999 | Wankhede Stadium, Mumbai |
| Google I/O Extended India | Tech | ₹499 | Bangalore International Centre |

---

## 🚀 Deployment

This project is deployed via **AWS Amplify** connected to this GitHub repo.  
Every `git push` to `main` triggers an automatic redeploy.

```bash
git add .
git commit -m "Your message"
git push
```

---

## 📬 EmailJS Configuration

- **Service ID:** `service_pgdjtyb`
- **Template ID:** `template_r6nyqk9`
- Auto-sends booking confirmation email with e-pass details after every booking.

---

## 👨‍💻 Developer

**Santhosh** — [@santhosh090705](https://github.com/santhosh090705)

---

## 📄 License

This project is for educational and portfolio purposes.

# Offline Studios - Pure HTML/CSS/JS Website

**Version 2.0** - Complete static website ready for GitHub Pages deployment

## 🎉 What's Included

A fully functional, directly editable website built with pure HTML, CSS, and JavaScript - no build process required!

### Features Implemented

✅ **Hero Section** with floating business badges (Dentists, Law Firms, Hair Salons, Retail, Restaurants)  
✅ **Portfolio Section** with 4 complete project showcases and actual screenshots  
✅ **Alternating Layout** - Projects alternate between left-right positioning  
✅ **Scroll Animations** - Smooth horizontal slide-in effects as you scroll  
✅ **Device Mockups** - Professional laptop and mobile frames with real images  
✅ **Testimonial Section** - Client quote without extra buttons  
✅ **Process Section** - 4-step workflow with subtle numbered steps  
✅ **Contact Form** - Full form with Name, Email, Phone, and Message fields  
✅ **Responsive Design** - Works perfectly on all devices  

## 📁 File Structure

```
offline-studios-static/
├── index.html          # Main website file (edit content here)
├── css/
│   └── styles.css      # All styling (edit colors, fonts, spacing)
├── js/
│   └── script.js       # Scroll animations and smooth scrolling
├── images/             # All project screenshots and assets
│   ├── passport-desktop.webp
│   ├── passport-mobile.png
│   ├── headshot-desktop.webp
│   ├── headshot-mobile.png
│   ├── julian-photo-desktop.webp
│   ├── julian-photo-mobile.png
│   ├── julian-music-desktop.webp
│   └── julian-music-mobile.png
└── README.md           # This file
```

## 🚀 Quick Start - Deploy to GitHub Pages

### Option 1: GitHub Web Interface (Easiest)

1. **Create a new repository** on GitHub
2. **Upload all files** from this folder
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/` (root)
   - Click Save
4. **Your site is live!** at `https://yourusername.github.io/repo-name/`

### Option 2: Command Line

```bash
# Navigate to this folder
cd offline-studios-static

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## ✏️ How to Edit

### Change Text Content

Open `index.html` in any text editor and find the section you want to edit:

**Hero section:**
```html
<h1 class="hero-title">
    Websites, SEO, and content that make 
    <span class="highlight">Toronto businesses</span> visible.
</h1>
```

**Portfolio projects:**
```html
<h3 class="portfolio-title">Passport Photo Toronto</h3>
<p class="portfolio-description">
    Professional passport photo studio website...
</p>
```

### Change Colors

Open `css/styles.css` and edit the CSS variables at the top:

```css
:root {
    --color-primary: #DC143C;        /* Main red color */
    --color-primary-hover: #B8102F;  /* Darker red on hover */
    --color-text: #1F2937;           /* Main text color */
    --color-text-muted: #6B7280;     /* Secondary text */
}
```

### Replace Images

1. Add your new images to the `images/` folder
2. Open `index.html`
3. Find the image tags and update the `src` attribute:

```html
<img src="images/your-new-image.png" alt="Project Name Desktop">
```

### Add/Remove Portfolio Items

Copy an entire portfolio item section in `index.html`:

```html
<!-- Portfolio Item -->
<div class="portfolio-item">
    <div class="portfolio-grid">
        <!-- Copy everything from here to the closing </div> -->
    </div>
</div>
```

Paste it where you want the new project and edit the content.

## 🎨 Customization Tips

### Change Fonts

The site uses Inter font from Google Fonts. To change:

1. Open `index.html`
2. Find the `<link>` tag in the `<head>` section
3. Replace with your preferred Google Font
4. Update `css/styles.css`:

```css
:root {
    --font-sans: 'Your Font Name', sans-serif;
}
```

### Adjust Spacing

Edit spacing variables in `css/styles.css`:

```css
:root {
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
}
```

### Modify Animations

Edit `js/script.js` to change animation behavior:

```javascript
// Change animation threshold (when items appear)
threshold: 0.2  // Items appear when 20% visible

// Change animation classes
item.classList.add('slide-in-left');  // or 'slide-in-right'
```

## 📧 Contact Form Setup

The contact form currently uses `mailto:` which opens the user's email client. For a better experience, consider:

### Option 1: Formspree (Free)
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Update the form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms (Free with Netlify hosting)
1. Deploy to Netlify
2. Add `netlify` attribute to form:
```html
<form name="contact" method="POST" data-netlify="true">
```

## 🌐 Custom Domain

After deploying to GitHub Pages:

1. Buy a domain (e.g., offlinestudios.ca)
2. Add a `CNAME` file to your repository with your domain
3. Configure DNS settings at your domain registrar
4. Enable custom domain in GitHub Pages settings

## 📱 Testing Locally

To test the website on your computer:

### Option 1: Python (if installed)
```bash
cd offline-studios-static
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## ✅ Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All files are directly editable - no compilation needed
- Images are optimized WebP format for fast loading
- Scroll animations use Intersection Observer API
- Form validation is built-in HTML5
- Fully responsive with mobile-first design

## 🆘 Need Help?

Common issues:

**Images not showing?**
- Check that image paths are correct: `images/filename.png`
- Ensure images are in the `images/` folder
- File names are case-sensitive on some servers

**Animations not working?**
- Make sure `js/script.js` is linked in `index.html`
- Check browser console for JavaScript errors
- Clear browser cache and reload

**Form not working?**
- `mailto:` requires email client installed
- Consider using Formspree or Netlify Forms for better UX

## 📄 License

This template is provided as-is for Offline Studios. Modify and use as needed.

---

**Ready to deploy?** Just upload to GitHub and enable Pages - it's that simple! 🚀

**Last Updated:** October 31, 2025  
**Version:** 2.0.0

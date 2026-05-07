# Merigo Tresses Website 🌟

Premium hair braiding studio website for Mercy in Fukuoka, Japan.

## 🚀 How to Put This on GitHub & Go Live

### Step 1 — Create a GitHub Account
1. Go to **github.com**
2. Click **Sign up**
3. Use the username: `merigotresses` (or similar)
4. Use your email: merigoziri@gmail.com
5. Verify your email

### Step 2 — Create a New Repository
1. Click the **+** button (top right) → **New repository**
2. Repository name: `merigotresses.github.io` ⚠️ This exact name is important!
3. Set to **Public**
4. Check **Add a README file**
5. Click **Create repository**

### Step 3 — Upload Your Files
1. In your new repository, click **Add file** → **Upload files**
2. Upload ALL the files from this folder:
   - `index.html`
   - `css/` folder (with style.css)
   - `js/` folder (with main.js)
   - `images/` folder (with all your photos)
3. Scroll down, click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to **Settings** tab in your repository
2. Click **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: **main**, Folder: **/ (root)**
5. Click **Save**
6. Wait 2-3 minutes...
7. Your site is live at: **https://merigotresses.github.io** 🎉

---

## 📧 Set Up Booking Email Notifications (Formspree)

So you receive an email when someone books:

1. Go to **formspree.io** → Sign up (free)
2. Click **New Form**
3. Set email to: merigoziri@gmail.com
4. Copy your Form ID (looks like: `xpwzjkbd`)
5. Open `index.html` and find this line:
   ```
   data-endpoint="https://formspree.io/f/YOUR_FORM_ID"
   ```
6. Replace `YOUR_FORM_ID` with your actual ID:
   ```
   data-endpoint="https://formspree.io/f/xpwzjkbd"
   ```
7. Save and re-upload `index.html` to GitHub

---

## 🔒 Your Admin Panel (Block Dates)

There is a small 🔒 lock button fixed at the bottom-right of your website.
- Click it to open the **Availability Manager**
- You can **block specific dates** so clients cannot select them
- Blocked dates save in the browser automatically
- This is just for YOU — clients don't see this panel

---

## 🖼️ Updating Photos

To swap gallery photos:
1. Name your new photo (e.g. `knotless-braids-2.jpg`)
2. Upload it to the `images/` folder on GitHub
3. Open `js/main.js` and find the `GALLERY_IMAGES` array
4. Add or update the entry:
   ```js
   { src: "images/knotless-braids-2.jpg", label: "Knotless Braids" },
   ```
5. Commit changes — site updates automatically!

---

## 💡 Updating Prices or Services

Open `js/main.js` and find the `SERVICES` array at the top.
Change any price or description and re-upload the file.

---

## 📱 Your Contact Info on the Site

- **WhatsApp**: +491706128008 (German number)
- **LINE**: +819071019857 (Japanese number)
- **Instagram**: @merigo_tresses

---

Built with ❤️ for Merigo Tresses · Fukuoka, Japan

# Evans Bett Portfolio 

React + Vite + Tailwind CSS portfolio with:
- Rotating profile portraits
- CV download button
- Animated project mockup previews
- Floating WhatsApp button
- Formspree-ready contact form
- Responsive mobile navigation
- Modern dark developer UI

## Start

```bash
npm install
npm run dev
```

## Add your CV

Place your CV PDF in `public/` and name it:

`Evans-Bett-CV.pdf`

The Download CV button will then work.

## Make WhatsApp work

Open `src/main.jsx` and change:

```js
const WHATSAPP = "254700000000";
```

Use your WhatsApp number with country code and no `+`, spaces or leading zero.

Example Kenya format:

`2547XXXXXXXX`

## Contact form

The contact form is connected to Formspree. To use a different Formspree form,
replace the form's `action` in `src/main.jsx` with the endpoint from your
Formspree dashboard.

## Personal links

Update the GitHub, LinkedIn, Instagram, and email values in `src/main.jsx` if
your contact details or profiles change.

## GitHub projects

The Projects section loads public repositories from the GitHub account configured
in `src/main.jsx` and refreshes the list every five minutes while the page is open.
If GitHub is temporarily unavailable, the current project list remains visible.

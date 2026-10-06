import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  Sparkles,
} from 'lucide-react';
import './index.css';

const WHATSAPP = '254705712310';
const EMAIL = 'evans.k.bett5@gmail.com';
const GITHUB = 'https://github.com/ekbtech';
const GITHUB_USERNAME = 'ekbtech';
const PROJECT_REFRESH_INTERVAL = 5 * 60 * 1000;
const INSTAGRAM = 'https://instagram.com/evans_bett5';
const LINKEDIN = 'https://www.linkedin.com/in/evansbett';
const CV_URL = './Evans-Bett-CV.pdf';
const PORTRAIT_SLIDES = [
  { src: './evans-bett-portrait.png', alt: 'Evans Bett in a developer workspace' },
  { src: './evans-bett-portrait-color.png', alt: 'Evans Bett in a blue-lit developer workspace' },
];
const PORTRAIT_SLIDE_INTERVAL = 20 * 1000;

const metrics = [
  { value: '2', label: 'Years of experience' },
  { value: '7', label: 'Public GitHub projects' },
  { value: '96%', label: 'Client satisfaction' },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'JavaScript', 'TypeScript', 'Tailwind', 'UI/UX'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PHP', 'REST APIs', 'MySQL', 'PostgreSQL', 'Authentication'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Figma', 'Docker', 'CI/CD', 'Testing'],
  },
];

const experience = [
  {
    title: 'Software Developer',
    company: 'AMPATH',
    period: '2026 — Present',
    description: 'Professional experience at AMPATH.',
  },
  {
    title: 'Software Developer',
    company: 'Checonex Investment',
    period: '2024 — 2025',
    description:
      'Supported networking tasks and worked with POS systems and Odoo to assist with day-to-day business operations.',
  },
];

const projectAccentStyles = [
  'from-amber-400/20 to-yellow-600/10',
  'from-yellow-500/20 to-amber-700/10',
  'from-amber-500/20 to-yellow-400/10',
  'from-yellow-600/20 to-amber-400/10',
  'from-amber-300/20 to-yellow-700/10',
  'from-yellow-400/20 to-amber-600/10',
  'from-amber-600/20 to-yellow-300/10',
];

const FALLBACK_PROJECTS = [
  {
    title: 'MedConnect',
    type: 'Medication tracking app',
    summary:
      'A patient medication tracker with caregiver assignments, dose schedules, adherence history, and reminders.',
    stack: ['Flask', 'Python', 'MySQL'],
    accent: 'from-amber-400/20 to-yellow-600/10',
    href: 'https://github.com/ekbtech/Med-connect',
  },
  {
    title: 'Weather',
    type: 'Live weather dashboard',
    summary:
      'A responsive forecast app with city search, hourly and five-day outlooks, geolocation, and temperature switching.',
    stack: ['Vite', 'JavaScript', 'Open-Meteo'],
    accent: 'from-yellow-500/20 to-amber-700/10',
    href: 'https://github.com/ekbtech/weather',
  },
  {
    title: 'Pro Car',
    type: 'Car rental system',
    summary:
      'A car rental platform with customer accounts, vehicle browsing, booking management, payments, and an admin dashboard.',
    stack: ['PHP', 'JavaScript', 'MySQL'],
    accent: 'from-amber-500/20 to-yellow-400/10',
    href: 'https://github.com/ekbtech/car-rental-system',
  },
  {
    title: 'Android Car Rental',
    type: 'Android application',
    summary: 'An Android app project for renting cars.',
    stack: ['Android'],
    accent: 'from-yellow-600/20 to-amber-400/10',
    href: 'https://github.com/ekbtech/Android-car-',
  },
  {
    title: 'Invoice Generator',
    type: 'Invoice generation tool',
    summary: 'A PHP project for generating invoices.',
    stack: ['PHP'],
    accent: 'from-amber-300/20 to-yellow-700/10',
    href: 'https://github.com/ekbtech/invoice-generator',
  },
  {
    title: 'Garage Management',
    type: 'Management system',
    summary: 'A project for managing garage operations.',
    stack: ['GitHub project'],
    accent: 'from-yellow-400/20 to-amber-600/10',
    href: 'https://github.com/ekbtech/garage-management',
  },
  {
    title: 'Second-Hand System',
    type: 'Second-hand marketplace system',
    summary: 'A PHP-based system for second-hand goods.',
    stack: ['PHP'],
    accent: 'from-amber-600/20 to-yellow-300/10',
    href: 'https://github.com/ekbtech/second-hand-syst',
  },
];

const contactLinks = [
  { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Phone, label: 'Phone', value: '+254 705 712 310', href: 'tel:+254705712310' },
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya', href: '#' },
];

function App() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const slideInterval = window.setInterval(() => {
      setActivePortrait((current) => (current + 1) % PORTRAIT_SLIDES.length);
    }, PORTRAIT_SLIDE_INTERVAL);

    return () => window.clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      if (isMounted) {
        setProjectsLoading(true);
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('GitHub API request failed');
        }

        const repos = await response.json();
        const liveProjects = repos
          .filter((repo) => !repo.private && !repo.fork && repo.name !== 'evans-portfolio-v2')
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6)
          .map((repo, index) => ({
            title: repo.name
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            type: repo.language ? `${repo.language} project` : 'Open-source project',
            summary:
              repo.description || 'Open-source project built with a focus on clean product delivery.',
            stack: repo.topics?.slice(0, 3) || (repo.language ? [repo.language] : ['GitHub']),
            accent: projectAccentStyles[index % projectAccentStyles.length],
            href: repo.html_url,
          }));

        if (isMounted) {
          setProjects(liveProjects.length ? liveProjects : FALLBACK_PROJECTS);
        }
      } catch (error) {
        console.error('Unable to refresh portfolio projects from GitHub:', error);
      } finally {
        if (isMounted) {
          setProjectsLoading(false);
        }
      }
    };

    loadProjects();
    const refreshInterval = window.setInterval(
      loadProjects,
      PROJECT_REFRESH_INTERVAL,
    );

    return () => {
      isMounted = false;
      window.clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 text-sm font-black text-slate-950">
              E
            </span>
            EVANS BETT
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <a href={CV_URL} download className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:border-amber-300 hover:bg-amber-500/20">
            <Download size={16} />
            CV
          </a>
        </div>
      </header>

      <main id="home">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.17),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(180,139,38,0.16),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 pt-16 md:grid-cols-[0.9fr_1.1fr] md:pt-24">
            <div className="order-2 flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                <Sparkles size={14} />
                Available for work
              </div>

              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                Code is my tool. Innovation is the goal.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                I&apos;m Evans Bett, a software developer turning ideas into working systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-yellow-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  View projects
                  <ArrowRight size={16} />
                </a>
                <a
                  href={CV_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="mt-1 text-sm text-slate-300">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 relative flex items-stretch justify-center">
              <div className="portrait-glow absolute inset-0 m-20 rounded-full bg-gradient-to-br from-amber-500/20 via-yellow-600/10 to-transparent blur-3xl" />
              <div className="relative flex h-full w-full flex-col items-center gap-5">
                <div className="portrait-frame relative aspect-square w-full flex-1 overflow-hidden rounded-[1.5rem] border-[3px] border-amber-400/50 shadow-2xl shadow-amber-500/15 md:aspect-auto">
                  {PORTRAIT_SLIDES.map((portrait, index) => (
                    <img
                      key={portrait.src}
                      src={portrait.src}
                      alt={portrait.alt}
                      aria-hidden={index !== activePortrait}
                      className={`portrait-slide absolute inset-0 h-full w-full object-cover ${
                        index === activePortrait ? 'portrait-slide-active' : ''
                      }`}
                      style={{ transform: `translateX(${(index - activePortrait) * 100}%)` }}
                    />
                  ))}
                </div>
                <div className="portrait-focus-badge flex items-center gap-3 rounded-full border border-amber-400/20 bg-slate-950/80 px-4 py-2.5 shadow-xl shadow-amber-500/10">
                  <div className="portrait-focus-icon rounded-full bg-amber-500/10 p-2 text-amber-300">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-amber-300">Current focus</div>
                    <div className="mt-0.5 text-sm font-semibold text-white">Product engineering</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">About me</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div className="section-panel p-8">
              <div className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 p-2 text-amber-200">
                <Briefcase size={18} />
              </div>
              <h2 className="text-3xl font-bold text-white">Building thoughtful digital experiences.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                I combine design thinking, product intuition, and engineering discipline to build experiences that are easy to use and strong for business growth.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { icon: Rocket, title: 'Product-first mindset', body: 'Translate strategy into experiences that move users from curiosity to action.' },
                { icon: Database, title: 'Reliable architecture', body: 'Create maintainable systems that support scale without sacrificing speed.' },
                { icon: Sparkles, title: 'Design detail', body: 'Polish interfaces down to subtleties that improve clarity and trust.' },
                { icon: CheckCircle2, title: 'Delivery focus', body: 'Keep projects moving with strong communication and clear execution.' },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="section-panel p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-white/5 p-2 text-amber-300">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">Experience</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <div key={`${item.company}-${item.title}`} className="section-panel relative overflow-hidden p-7 md:p-8">
                {index !== experience.length - 1 && <div className="absolute left-8 top-8 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-amber-500/60 to-transparent" />}
                <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-8">
                  <div className="relative z-10">
                    <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
                      {item.period}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-amber-300">{item.company}</p>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Projects</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="mb-5 text-sm text-slate-400" aria-live="polite">
            {projectsLoading
              ? 'Syncing projects with GitHub...'
              : 'Projects sync with GitHub every 5 minutes.'}
          </p>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="project-card overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60">
                <div className={`h-40 bg-gradient-to-br ${project.accent}`} />
                <div className="p-6">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-amber-300">{project.type}</div>
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-amber-200">
                    View on GitHub
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">Skills</p>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="section-panel p-6">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 pb-24 pt-20">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                Let&apos;s connect
              </div>
              <h2 className="text-3xl font-bold text-white">Need a developer who can turn ideas into usable products?</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                I work with founders, businesses, and teams that want product clarity, thoughtful design, and reliable development.
              </p>

              <div className="mt-8 space-y-4">
                {contactLinks.map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200 transition hover:border-amber-400/30 hover:bg-amber-500/5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
                      <span className="mt-1 block text-base font-medium text-white">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <form
              action="https://formspree.io/f/xeaobrlp"
              method="POST"
              acceptCharset="UTF-8"
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6"
            >
              <input type="hidden" name="_subject" value="New portfolio inquiry" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/60 focus:outline-none"
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/60 focus:outline-none"
                  />
                </label>
              </div>

              <label className="mt-5 block text-sm text-slate-300">
                Project type
                <input
                  type="text"
                  name="project_type"
                  placeholder="Website, dashboard, app, redesign..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/60 focus:outline-none"
                />
              </label>

              <label className="mt-5 block text-sm text-slate-300">
                Message
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project goals and timeline..."
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400/60 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-yellow-600 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Send message
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-4 px-6 py-8 text-sm text-slate-400 md:grid-cols-[1fr_auto_1fr]">
          <p className="md:justify-self-start">© 2026 Evans Bett. All rights reserved.</p>
          <div className="flex items-center justify-center gap-3">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="rounded-full p-3 text-white transition hover:bg-white/10 hover:text-slate-300">
              <Github size={20} />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="rounded-full p-3 text-[#0A66C2] transition hover:bg-[#0A66C2]/10 hover:text-[#4CA3FF]">
              <Linkedin size={20} />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="rounded-full p-3 text-[#E1306C] transition hover:bg-[#E1306C]/10 hover:text-[#F77737]">
              <Instagram size={20} />
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" className="rounded-full p-3 text-[#25D366] transition hover:bg-[#25D366]/10 hover:text-[#61E294]">
              <MessageCircle size={20} />
            </a>
          </div>
          <div aria-hidden="true" className="hidden md:block" />
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

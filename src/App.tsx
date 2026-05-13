import {
  type AnchorHTMLAttributes,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const HLS_SOURCE =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar']
const loadingWords = ['Design', 'Create', 'Inspire']
const sectionIds = ['hero', 'work', 'journal', 'explorations', 'stats', 'contact']

const projects = [
  {
    title: 'Automotive Motion',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85',
    layout: 'md:col-span-7 aspect-[1.18/1]',
  },
  {
    title: 'Urban Architecture',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    layout: 'md:col-span-5 aspect-[0.86/1]',
  },
  {
    title: 'Human Perspective',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    layout: 'md:col-span-5 aspect-[0.86/1]',
  },
  {
    title: 'Brand Identity',
    image:
      'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=85',
    layout: 'md:col-span-7 aspect-[1.18/1]',
  },
]

const journalEntries = [
  {
    title: 'Designing Interfaces That Feel Quietly Alive',
    date: 'Apr 18, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Motion as a System, Not a Decoration',
    date: 'Mar 27, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'What Founders Can Learn From Prototypes',
    date: 'Feb 12, 2026',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'A Practical Taste for Digital Craft',
    date: 'Jan 30, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=300&q=80',
  },
]

const explorations = [
  {
    title: 'Chrome Still Life',
    image:
      'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=900&q=85',
    rotate: -5,
    drift: -230,
  },
  {
    title: 'Soft Geometry',
    image:
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=900&q=85',
    rotate: 4,
    drift: 260,
  },
  {
    title: 'Light Study',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85',
    rotate: 7,
    drift: -180,
  },
  {
    title: 'Material Notes',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85',
    rotate: -4,
    drift: 220,
  },
  {
    title: 'Editorial Frames',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85&sat=-20',
    rotate: 3,
    drift: -240,
  },
  {
    title: 'Blue Hour',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85&sat=-40',
    rotate: -7,
    drift: 190,
  },
]

const stats = [
  ['20+', 'Years Experience'],
  ['95+', 'Projects Done'],
  ['200%', 'Satisfied Clients'],
]

function useHlsVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true })
      hls.loadSource(HLS_SOURCE)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SOURCE
    }

    const play = () => {
      void video.play().catch(() => undefined)
    }

    video.addEventListener('loadedmetadata', play)
    play()

    return () => {
      video.removeEventListener('loadedmetadata', play)
      hls?.destroy()
    }
  }, [videoRef])
}

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.38
      const current = ids.findLast((id) => {
        const section = document.getElementById(id)
        return section ? section.offsetTop <= marker : false
      })

      if (current) {
        setActive(current)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [ids])

  return active
}

type GradientLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'solid' | 'outline' | 'subtle'
}

function GradientLink({
  children,
  className = '',
  variant = 'outline',
  ...props
}: GradientLinkProps) {
  const solid = variant === 'solid'
  const subtle = variant === 'subtle'

  return (
    <a
      className={`group relative inline-flex rounded-full p-[2px] transition duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${className}`}
      {...props}
    >
      <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={`relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm transition duration-300 ${
          solid
            ? 'bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary'
            : subtle
              ? 'bg-surface text-text-primary'
              : 'border border-stroke bg-bg text-text-primary group-hover:border-transparent'
        }`}
      >
        {children}
      </span>
    </a>
  )
}

function VideoBackdrop({ flipped = false }: { flipped?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useHlsVideo(videoRef)

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
        flipped ? 'scale-y-[-1]' : ''
      }`}
    />
  )
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const completeRef = useRef(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % loadingWords.length)
    }, 900)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const duration = 2700
    const start = performance.now()
    let rafId = 0
    let timeoutId = 0

    const tick = (now: number) => {
      const progress = Math.min(100, Math.floor(((now - start) / duration) * 100))
      setCount(progress)

      if (progress < 100) {
        rafId = window.requestAnimationFrame(tick)
        return
      }

      if (!completeRef.current) {
        completeRef.current = true
        timeoutId = window.setTimeout(onComplete, 400)
      }
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(timeoutId)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
      >
        Portfolio
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingWords[wordIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {loadingWords[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 right-6 font-display text-6xl tabular-nums text-text-primary md:right-10 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, '0')}
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  )
}

function Navbar() {
  const [hasShadow, setHasShadow] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const updateShadow = () => setHasShadow(window.scrollY > 100)

    updateShadow()
    window.addEventListener('scroll', updateShadow, { passive: true })

    return () => window.removeEventListener('scroll', updateShadow)
  }, [])

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    event.preventDefault()
    scrollToSection(target)
    window.history.replaceState(null, '', `#${target}`)
  }

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Work', target: 'work' },
    { label: 'Resume', target: 'stats' },
  ]

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex max-w-[calc(100vw-1rem)] items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow ${
          hasShadow ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, 'hero')}
          className="group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 hover:scale-110 sm:h-9 sm:w-9"
          aria-label="Back to home"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-0" />
          <span className="accent-gradient-reverse absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            AA
          </span>
        </a>

        <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />

        <div className="flex items-center">
          {navItems.map((item) => {
            const isActive =
              item.target === active ||
              (item.target === 'work' &&
                ['work', 'journal', 'explorations'].includes(active)) ||
              (item.target === 'stats' && active === 'stats')

            return (
              <a
                key={item.label}
                href={`#${item.target}`}
                onClick={(event) => handleNavClick(event, item.target)}
                className={`rounded-full px-2.5 py-1.5 text-[11px] transition sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? 'bg-stroke/50 text-text-primary'
                    : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>

        <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />

        <a
          href="#contact"
          onClick={(event) => handleNavClick(event, 'contact')}
          className="group relative rounded-full p-[2px]"
        >
          <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-2.5 py-1.5 text-[11px] text-text-primary backdrop-blur-md transition sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '.name-reveal',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
        )
        .fromTo(
          '.blur-in',
          { opacity: 0, filter: 'blur(10px)', y: 20 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.3,
          },
          '<',
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen overflow-hidden bg-bg px-6 py-24"
    >
      <VideoBackdrop />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 m-auto flex max-w-5xl flex-col items-center text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          COLLECTION '26
        </p>
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Ahmed Ali
        </h1>
        <p className="blur-in mb-5 text-lg text-text-primary/90 md:text-2xl">
          A{' '}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {roles[roleIndex]}
          </span>{' '}
          lives in Chicago.
        </p>
        <p className="blur-in mb-12 max-w-md text-sm leading-7 text-muted md:text-base">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <GradientLink
            href="#work"
            variant="solid"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('work')
            }}
          >
            See Works
          </GradientLink>
          <GradientLink
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('contact')
            }}
          >
            Reach out...
          </GradientLink>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">SCROLL</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute left-0 top-0 h-1/2 w-full animate-scroll-down bg-text-primary" />
        </span>
      </div>
    </section>
  )
}

type SectionHeaderProps = {
  eyebrow: string
  title: string
  italic: string
  description: string
  action?: string
  target?: string
}

function SectionHeader({
  eyebrow,
  title,
  italic,
  description,
  action,
  target,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-100px' }}
      className="mb-10 flex flex-col gap-8 md:mb-12 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-balance font-body text-4xl font-light tracking-tight text-text-primary md:text-6xl">
          {title}{' '}
          <span className="font-display italic text-text-primary">{italic}</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
          {description}
        </p>
      </div>

      {action && target ? (
        <GradientLink
          href={`#${target}`}
          variant="subtle"
          className="hidden md:inline-flex"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection(target)
          }}
        >
          {action} <span aria-hidden="true">→</span>
        </GradientLink>
      ) : null}
    </motion.div>
  )
}

function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          description="A selection of projects I've worked on, from concept to launch."
          action="View all work"
          target="work"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface shadow-glow ${project.layout}`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition duration-500 group-hover:opacity-100">
                <div className="animated-gradient-border rounded-full p-[2px]">
                  <span className="flex rounded-full bg-white px-5 py-2 text-sm text-bg">
                    View&nbsp;&mdash;&nbsp;
                    <span className="font-display italic">{project.title}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title="Recent"
          italic="thoughts"
          description="Notes on design systems, product rhythm, and the small details that make interfaces memorable."
          action="View all"
          target="journal"
        />

        <div className="space-y-4">
          {journalEntries.map((entry, index) => (
            <motion.a
              key={entry.title}
              href="#journal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group flex items-center gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition hover:bg-surface sm:gap-6 sm:rounded-full"
            >
              <img
                src={entry.image}
                alt=""
                className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-base text-text-primary transition group-hover:text-white sm:text-xl">
                  {entry.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">
                  {entry.readTime}
                </p>
              </div>
              <span className="hidden shrink-0 pr-4 text-sm text-muted md:block">
                {entry.date}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])
  const [selected, setSelected] = useState<(typeof explorations)[number] | null>(
    null,
  )

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) {
      return
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: content,
        pinSpacing: false,
      })

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return
        }

        const drift = explorations[index]?.drift ?? 180

        gsap.fromTo(
          item,
          { y: index % 2 === 0 ? 120 : -80 },
          {
            y: drift,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })
    }, section)
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      window.clearTimeout(refreshId)
      ctx.revert()
    }
  }, [])

  const columns = useMemo(
    () => [
      explorations.filter((_, index) => index % 2 === 0),
      explorations.filter((_, index) => index % 2 === 1),
    ],
    [],
  )

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] overflow-hidden bg-bg"
    >
      <div
        ref={contentRef}
        className="sticky top-0 z-10 flex h-screen items-center justify-center px-6 text-center"
      >
        <div className="max-w-xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">
            Explorations
          </p>
          <h2 className="text-balance font-body text-5xl font-light tracking-tight text-text-primary md:text-7xl">
            Visual{' '}
            <span className="font-display italic text-text-primary">
              playground
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted md:text-base">
            Experiments in texture, timing, and art direction that keep the
            commercial work curious.
          </p>
          <GradientLink
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            variant="subtle"
            className="mt-8"
          >
            Dribbble <span aria-hidden="true">↗</span>
          </GradientLink>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 px-6 py-[14vh]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 justify-between gap-8 md:grid-cols-[minmax(180px,340px)_minmax(180px,340px)] md:gap-16">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col gap-[44vh] ${
                columnIndex === 0
                  ? 'items-start pt-[8vh] md:items-end'
                  : 'items-end pt-[44vh] md:items-start'
              }`}
            >
              {column.map((item) => {
                const globalIndex = explorations.findIndex(
                  (exploration) => exploration.title === item.title,
                )

                return (
                  <div
                    key={item.title}
                    ref={(node) => {
                      if (node) {
                        itemRefs.current[globalIndex] = node
                      }
                    }}
                    className="pointer-events-auto w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      <span
                        className="block aspect-square overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-glow transition duration-500 group-hover:scale-[1.03]"
                        style={
                          {
                            transform: `rotate(${item.rotate}deg)`,
                          } as CSSProperties
                        }
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
            >
              Close
            </button>
            <motion.img
              src={selected.image}
              alt={selected.title}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[82vh] w-full max-w-3xl rounded-3xl object-cover"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke px-0 md:grid-cols-3">
        {stats.map(([number, label]) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-bg px-8 py-12 text-center md:py-16"
          >
            <div className="font-display text-6xl italic text-text-primary md:text-7xl">
              {number}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const phrase = 'BUILDING THE FUTURE • '
  const marqueeItems = Array.from({ length: 10 }, (_, index) => `${phrase}${index}`)

  useEffect(() => {
    const marquee = marqueeRef.current

    if (!marquee) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    }, marquee)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pt-16 md:pt-20 pb-8 md:pb-12"
    >
      <VideoBackdrop flipped />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/50 to-bg/85" />

      <div className="relative z-10 overflow-hidden py-8">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex">
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="px-6 font-display text-5xl italic text-text-primary/20 md:text-8xl"
                >
                  {item.replace(/\d+$/, '')}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10 lg:px-16">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">
          Start a conversation
        </p>
        <h2 className="text-balance max-w-3xl font-body text-4xl font-light tracking-tight text-text-primary md:text-6xl">
          Have a product, story, or system that needs a sharper digital shape?
        </h2>
        <GradientLink
          href="mailto:hello@ahmedali.com"
          variant="subtle"
          className="mt-9"
        >
          hello@ahmedali.com <span aria-hidden="true">↗</span>
        </GradientLink>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-[1200px] flex-col gap-6 border-t border-stroke px-6 pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <div className="flex flex-wrap gap-4">
          {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
            <a
              key={social}
              href="#contact"
              className="transition hover:text-text-primary"
            >
              {social}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span>Available for projects</span>
        </div>
      </div>
    </footer>
  )
}

function PortfolioPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-bg text-text-primary"
    >
      <Navbar />
      <Hero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </motion.main>
  )
}

function PortfolioRoute() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
      ) : (
        <PortfolioPage key="portfolio" />
      )}
    </AnimatePresence>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<PortfolioRoute />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  useEffect(() => {
    document.title = 'Ahmed Ali Portfolio'

    const description = 'Dark motion portfolio landing page for Ahmed Ali.'
    const descriptionMeta = document.querySelector('meta[name="description"]')
    const appNameMeta = document.querySelector('meta[name="application-name"]')

    if (descriptionMeta instanceof HTMLMetaElement) {
      descriptionMeta.content = description
    }

    if (appNameMeta instanceof HTMLMetaElement) {
      appNameMeta.content = 'Ahmed Ali Portfolio'
    }
  }, [])

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App

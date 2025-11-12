import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import './App.css'

async function submitLead(formEvent) {
  formEvent.preventDefault()
  try {
    const form = formEvent.currentTarget
    const formData = new FormData(form)
    if (!formData.get('source')) formData.append('source', window.location.pathname)
    const res = await fetch('/api/send_lead.php', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error('Network response was not ok')
    alert('Thanks! We\'ll call you back shortly.')
    try { form.reset() } catch {}
  } catch (err) {
    console.error('Lead submit failed', err)
    alert('Sorry, something went wrong. Please call us or try again.')
  }
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`tt-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="tt-header__inner">
        <a className="tt-logo" href="#">
          <img src="assets/logo-C6UvKnhl.webp" alt="Town Television" />
          
        </a>
        <nav className="tt-nav">
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#getintouch">Contact</a>
        </nav>
        <div className="tt-header__cta">
          <a className="tt-phone" href="tel:+918095549722">+91 80955 49772</a>
          <a className="tt-btn tt-btn--primary" href="#getintouch">Book Service</a>
        </div>
      </div>
    </header>
  )
}

function BookingForm() {
  return (
    <form className="tt-booking" onSubmit={submitLead}>
      <input type="hidden" name="form_name" value="hero_booking" />
      <div className="tt-booking__title">Book a Service</div>
      <div className="tt-booking__row">
        <div className="tt-field">
          <label>Name</label>
          <input name="name" placeholder="Your name" aria-label="Name" required />
        </div>
        <div className="tt-field">
          <label>Phone</label>
          <input name="phone" placeholder="Your phone" aria-label="Phone" required/>
        </div>
      </div>
      <label className="tt-booking__label">Issue Description</label>
      <textarea name="issue" placeholder="e.g., No power, no display, lines on screen, sound issue..." rows={3} />
      <label className="tt-booking__label">Address</label>
      <input name="address" placeholder="House/Apartment, Area" />
      <button type="submit" className="tt-btn tt-btn--primary tt-booking__submit">Submit Request</button>
      <div className="tt-booking__note">We'll call you back within 10 minutes during working hours.</div>
    </form>
  )
}

function Hero() {
  return (
    <section className="tt-hero">
      <div className="tt-hero__overlay" />
      <Header />
      <div className="tt-hero__content">
        <div className="tt-hero__left">
          <div className="tt-badges">
            <span className="tt-badge">Vishnuvardhan Road, Uttarahalli</span>
            <span className="tt-badge tt-badge--accent">Same-Day TV Repair</span>
          </div>
          <h1 className="tt-hero__title">
            TV Repair Service
            <br />
            <span className="tt-hero__title--accent">in Bangalore.</span>
          </h1>
          <p className="tt-hero__subtitle">
            We offer fast and reliable TV repair service in Bangalore for every brand and model. From screen issues to sound problems, or any other issue, our expert technicians will have your TV working like new again in no time.
          </p>
          <div className="tt-hero__actions">
            <a href="#getintouch" className="tt-btn tt-btn--primary">Book a Technician</a>
            <a href="#services" className="tt-btn tt-btn--ghost" style={{color: '#000000'}}>Explore Services</a>
          </div>
          <ul className="tt-hero__features">
            <li>
              <span className="tt-feature-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.7 19.3l-6.5-6.5c.5-1.1.8-2.3.8-3.5 0-4.1-3.4-7.3-7.4-7.3-1 0-2 .2-2.9.6l3.1 3.1-2.1 2.1-3.1-3.1c-.4.9-.6 1.9-.6 2.9 0 4 3.2 7.4 7.3 7.4 1.2 0 2.4-.3 3.5-.8l6.5 6.5c.4.4 1 .4 1.4 0l.9-.9c.4-.4.4-1 0-1.4z"/>
                </svg>
              </span>
              Trained Technicians
            </li>
            <li>
              <span className="tt-feature-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.4l4.3 2.5-.8 1.3L11 13V7h2v5.4z"/>
                </svg>
              </span>
              Quick Turnaround
            </li>
            <li>
              <span className="tt-feature-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l7 3v6c0 5-3.6 9.6-7 11-3.4-1.4-7-6-7-11V5l7-3zm0 5l-3 .9V11c0 3.1 1.9 6.3 3 7.5 1.1-1.2 3-4.4 3-7.5V7.9L12 7z"/>
                </svg>
              </span>
              Repair Warranty
            </li>
          </ul>
        </div>
        <div className="tt-hero__right">
          <BookingForm />
        </div>
      </div>
    </section>
  )
}

function Counter({ endValue, duration = 1500, suffix = '', format = 'plain' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let rafId
    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * endValue)
      setValue(current)
      if (progress < 1) rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [started, duration, endValue])

  const display = format === 'comma'
    ? value.toLocaleString()
    : String(value)

  return (
    <span ref={ref}>{display}{suffix}</span>
  )
}

function StatsSection() {
  return (
    <section className="tt-stats">
      <div className="tt-stats__container">
        <h2 className="tt-stats__title">Trusted by Thousands in Bangalore</h2>
        <div className="tt-stats__grid">
          <div className="tt-stats__card">
            <div className="tt-stats__number"><Counter endValue={15} suffix="+" /></div>
            <div className="tt-stats__label">Years experience</div>
          </div>
          <div className="tt-stats__card">
            <div className="tt-stats__number"><Counter endValue={5000} suffix="+" format="comma" /></div>
            <div className="tt-stats__label">Customers served</div>
          </div>
          <div className="tt-stats__card">
            <div className="tt-stats__number"><Counter endValue={25} suffix="+" /></div>
            <div className="tt-stats__label">Well-Experienced Technicians</div>
          </div>
          <div className="tt-stats__card">
            <div className="tt-stats__number"><Counter endValue={5} suffix="+" /></div>
            <div className="tt-stats__label">Bengaluru branches</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="tt-services" id="services">
      <div className="tt-services__container">
        <div className="tt-services__header">
          <h2 className="tt-services__title">Professional TV Repair Services Under One Roof</h2>
          <div className="tt-services__subtitle">All makes & models</div>
        </div>
        <div className="tt-services__grid">
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-1-DT4TW-Bl.webp" alt="LED/LCD TV Repair" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">LED/LCD TV Repair</div>
              <div className="tt-service__desc">Backlight, panel, and mainboard fixes for all brands.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-2-C-qqw0sZ.webp" alt="Board Level Repair" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">Board Level Repair</div>
              <div className="tt-service__desc">Power supply, T-Con, and motherboard diagnostics.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-3-DfmqzgyP.webp" alt="Sound/Display Issues" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">Sound/Display Issues</div>
              <div className="tt-service__desc">No audio, ghosting, color banding, lines and flicker.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-4-rmygnhwf.webp" alt="No Power / Auto Off" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">No Power / Auto Off</div>
              <div className="tt-service__desc">Power faults, surge issues, and component replacements.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-5-B37NGsvv.webp" alt="Smart TV Setup" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">Smart TV Setup</div>
              <div className="tt-service__desc">Wi‑Fi setup, app issues, firmware and calibration.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
          <div className="tt-service">
            <div className="tt-service__media">
              <img src="/assets/service-6-DoIIWwRO.webp" alt="Mounting & Install" />
            </div>
            <div className="tt-service__body">
              <div className="tt-service__title">Mounting & Install</div>
              <div className="tt-service__desc">Wall mount, relocation, cable management, and demo.</div>
              <ul className="tt-service__list">
                <li>On-site diagnosis</li>
                <li>Genuine parts</li>
                <li>Service warranty</li>
              </ul>
              <button className="tt-btn tt-btn--primary tt-service__cta">Book this service</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  const features = [
    {
      title: "Doorstep service",
      content: "We provide on-site diagnosis and quick fixes for most common TV issues so you don't have to move your TV."
    },
    {
      title: "Trained technicians", 
      content: "Experienced professionals trained across major brands and models. We bring the right tools and testing gear."
    },
    {
      title: "Clear estimates",
      content: "Transparent pricing before repair begins. No hidden charges. Genuine parts used with warranty."
    },
    {
      title: "Warranty on repairs",
      content: "Enjoy peace of mind with service guarantee. If an issue recurs within the warranty period, we take care of it."
    }
  ]

  return (
    <section className="tt-why-choose">
      <div className="tt-why-choose__container">
        <div className="tt-why-choose__content">
          <h2 className="tt-why-choose__title">Why Choose Town Television for your TV Repair Service</h2>
          <p className="tt-why-choose__description">
            We combine years of expertise, skilled technicians, and genuine parts to deliver fast, reliable, and long-lasting TV repairs you can trust.
          </p>
          <div className="tt-why-choose__features">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`tt-feature-item ${activeDropdown === index ? 'active' : ''}`}
                onClick={() => toggleDropdown(index)}
              >
                <div className="tt-feature-item__header">
                  <span className="tt-feature-item__text">{feature.title}</span>
                  <span className="tt-feature-item__chevron">⌄</span>
                </div>
                {activeDropdown === index && (
                  <div className="tt-feature-item__content">
                    {feature.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="tt-why-choose__image">
          <img src="/assets/contact-BfXalLxt.webp" alt="Professional Technician" />
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="tt-contact" id="getintouch">
      <div className="tt-contact__container">
          <div className="tt-contact__left">
            <h2 className="tt-contact__title">Get in touch</h2>
            <form className="tt-contact__form" onSubmit={submitLead}>
              <input type="hidden" name="form_name" value="contact_section" />
              <div className="tt-contact__row">
                <div className="tt-field">
                  <label>Name</label>
                  <input name="name" placeholder="Your name" required />
                </div>
                <div className="tt-field">
                  <label>Phone</label>
                  <input name="phone" placeholder="Your phone" required />
                </div>
              </div>
              <div className="tt-field">
                <label>Address</label>
                <input name="address" placeholder="House/Apartment, Area" />
              </div>
              <div className="tt-field">
                <label>Issue</label>
                <textarea name="issue" rows={3} placeholder="Describe your issue" />
              </div>
              <button type="submit" className="tt-btn tt-btn--primary tt-contact__cta">Request Callback</button>
            </form>
          </div>
        <div className="tt-contact__right">
          <img src="/assets/photo-1512428559087-560fa5ceab42.avif" alt="Get in touch" />
        </div>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="tt-footer">
      <div className="tt-footer__container">
        <div className="tt-footer__left">
          <div className="tt-footer__company">Town Television</div>
          <div className="tt-footer__address">
            <div>#447, Channasandra, Uttarahalli Main Road</div>
            <div>Near Govt School, Rajarajeshwari Nagar</div>
            <div>Bengaluru, Karnataka 560098</div>
          </div>
          <div className="tt-footer__copyright">
            © 2025 Town Television. All rights reserved.
          </div>
        </div>
        <div className="tt-footer__right">
          <div className="tt-footer__phone">
            Phone: <span className="tt-footer__phone-number">+91 80955 49772</span>
          </div>
          <div className="tt-footer__hours">
            Hours: 9:00 AM - 8:00 PM (All days)
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [showQuickModal, setShowQuickModal] = useState(false)
  const [hasShownModal, setHasShownModal] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Update scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    const openListener = () => setShowQuickModal(true)
    window.addEventListener('tt:openModal', openListener)
    const onScroll = () => {
      if (hasShownModal) return
      const scrolled = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0 && scrolled / docHeight > 0.45) {
        setShowQuickModal(true)
        setHasShownModal(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll)
    const timer = setTimeout(() => {
      if (!hasShownModal) {
        setShowQuickModal(true)
        setHasShownModal(true)
        window.removeEventListener('scroll', onScroll)
      }
    }, 20000)
    return () => {
      lenis.destroy()
      window.removeEventListener('tt:openModal', openListener)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [hasShownModal])

  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesSection />
      <WhyChooseSection />
      <ContactSection />
      <FooterSection />
      {showQuickModal && (
        <QuickContactModal onClose={() => setShowQuickModal(false)} />
      )}
    </>
  )
}

function QuickContactModal({ onClose }) {
  return (
    <div className="tt-modal" role="dialog" aria-modal="true">
      <div className="tt-modal__backdrop" onClick={onClose} />
      <div className="tt-modal__panel">
        <button className="tt-modal__close" aria-label="Close" onClick={onClose}>×</button>
        <h3 className="tt-modal__title">Need fast TV repair?</h3>
        <p className="tt-modal__subtitle">Share your details and we'll call back within 10 minutes.</p>
        <form className="tt-modal__form" onSubmit={submitLead}>
          <input type="hidden" name="form_name" value="quick_modal" />
          <div className="tt-modal__row">
            <input name="name" placeholder="Your name" required />
            <input name="phone" placeholder="Phone" required />
          </div>
          <input name="address" placeholder="House/Apartment, Area" />
          <textarea name="issue" rows={4} placeholder="Issue summary" style={{ marginTop: '10px' }} />
          <button className="tt-btn tt-btn--primary tt-modal__submit" type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

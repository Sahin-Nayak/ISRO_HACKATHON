import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rankingOpen, setRankingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Container Styles
  const navContainerStyles = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  // Navbar Styles
  const navStyles = {
    background: scrolled ? 'rgba(10, 12, 15, 0.98)' : 'rgba(10, 12, 15, 0.92)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    color: '#fff',
    padding: isMobile ? '16px 1.5rem' : '20px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255, 153, 51, 0.3)' : '1px solid rgba(255,255,255,0.08)',
    height: isMobile ? 'auto' : '48px',
    position: 'relative',
  };

  const logoBox = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    zIndex: 1002,
  };

  const logoText = {
    fontSize: isMobile ? '1.4rem' : '1.7rem',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #FF9933, #FFFFFF, #138808)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    letterSpacing: '-0.5px',
    textShadow: '0 0 10px rgba(255, 153, 51, 0.3)',
    transition: 'all 0.3s ease'
  };

  const logoIcon = {
    width: isMobile ? '36px' : '42px',
    height: isMobile ? '36px' : '42px',
    borderRadius: '10px',
    background: 'rgba(255, 153, 51, 0.1)',
    border: '1px solid rgba(255, 153, 51, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '18px' : '20px',
    color: '#FF9933',
    boxShadow: '0 0 10px rgba(255, 153, 51, 0.2)',
    transition: 'all 0.3s ease',
    zIndex: 1002,
  };

  const navLinks = {
    display: isMobile ? 'none' : 'flex',
    gap: isMobile ? '1.5rem' : '2.5rem',
    listStyle: 'none',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    zIndex: 1002,
  };

  const link = {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    position: 'relative',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    fontSize: isMobile ? '1rem' : '1.05rem',
    letterSpacing: '0.3px',
    zIndex: 1002,
  };

  const rankingCardsContainer = {
    position: 'absolute',
    top: 'calc(100% + 15px)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: '20px',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: 1003,
    width: isMobile ? 'calc(100vw - 3rem)' : 'auto',
    padding: isMobile ? '0 1.5rem' : '0',
  };

  const rankingCard = {
    width: isMobile ? '100%' : '280px',
    height: isMobile ? 'auto' : '180px',
    background: 'rgba(20, 24, 28, 0.98)',
    backdropFilter: 'blur(20px)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden',
    minWidth: isMobile ? '0' : '280px',
  };

  const cardBackground = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15,
    zIndex: -1,
  };

  const cardContent = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: '12px',
  };

  const cardTitle = {
    fontSize: isMobile ? '1.2rem' : '1.4rem',
    fontWeight: '600',
    color: '#FF9933',
    textShadow: '0 0 8px rgba(255, 153, 51, 0.3)',
  };

  const cardDivider = {
    width: '40px',
    height: '2px',
    background: 'linear-gradient(90deg, #FF9933, #FFFFFF)',
    margin: '8px 0',
  };

  const cardDescription = {
    fontSize: isMobile ? '0.9rem' : '0.95rem',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: '1.5',
  };

  const visibleCards = {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateX(-50%) translateY(0)'
  };

  const mobileMenu = {
    display: menuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'fixed',
    right: '1.5rem',
    top: isMobile ? '5rem' : '5.5rem',
    background: 'rgba(20, 24, 28, 0.98)',
    backdropFilter: 'blur(25px)',
    padding: '1.5rem',
    borderRadius: '16px',
    width: 'calc(100% - 3rem)',
    maxWidth: '350px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    gap: '1.2rem',
    zIndex: 1003,
    border: '1px solid rgba(255, 153, 51, 0.2)',
    animation: menuOpen ? 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : ''
  };

  const hamburger = {
    fontSize: '1.8rem',
    display: isMobile ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    transform: menuOpen ? 'rotate(90deg)' : 'rotate(0)',
    padding: '0.6rem',
    borderRadius: '8px',
    background: menuOpen ? 'rgba(255, 153, 51, 0.1)' : 'transparent',
    zIndex: 1002,
    width: '44px',
    height: '44px',
  };

  const dropdownTrigger = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 1002,
  };

  const aqiBadge = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255,255,255,0.05)',
    padding: '8px 14px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 153, 51, 0.3)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    zIndex: 1002,
  };

  const flagStripes = {
    width: '18px',
    height: '14px',
    background: 'linear-gradient(to bottom, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
    borderRadius: '2px',
    transition: 'all 0.3s ease'
  };

  const threadContainer = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    overflow: 'hidden',
    zIndex: 1001,
  };

  const languageLabel = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px'
  };

  const preferredLanguageText = {
    fontSize: '0.85rem',
    opacity: 0.7,
    lineHeight: '1'
  };

  const live = {
    display: 'inline-block',
    margin: '0 10px',
    padding: '8px 15px',
    backgroundColor: 'red',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-2px)'
    }
  };

  const link1 = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '14px'
  };

  const mobileLink = {
    color: 'rgba(255,255,255,0.9)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    fontSize: '1.05rem',
    padding: '0.5rem 0',
    display: 'block',
    width: '100%'
  };

  const handleLogoHover = (isHovering) => {
    const logo = document.querySelector('.logo-box');
    if (logo) {
      logo.style.transform = isHovering ? 'scale(1.05)' : 'scale(1)';
    }
  };

  return (
    <div style={navContainerStyles}>
      {/* Thread Animation */}
      <div style={threadContainer} className="thread-container">
        <div className="thread-animation"></div>
      </div>

      {/* Navbar Content */}
      <nav style={navStyles}>
        {/* Logo */}
        <div 
          style={logoBox} 
          className="logo-box"
          onMouseEnter={() => handleLogoHover(true)}
          onMouseLeave={() => handleLogoHover(false)}
        >
          <div style={logoIcon}>🇮🇳</div>
          <Link to="/" style={link}><span style={logoText}>AQ-INDIA</span></Link>
        </div>

        {/* Desktop Navigation */}
        <ul style={navLinks} className="desktop-nav">
          <li style={live}>
            <Link to="/AirLiveData" style={link1}>
              See Live Map
            </Link>
          </li>
          <li>
            <Link to="/" style={link}>
              Dashboard
            </Link>
          </li>
          
          {/* Ranking Cards */}
          <li 
            style={{ position: 'relative' }}
            onMouseEnter={() => !isMobile && setRankingOpen(true)}
            onMouseLeave={() => !isMobile && setRankingOpen(false)}
          >
            <div 
              style={dropdownTrigger} 
              className="dropdown-trigger"
              onClick={() => isMobile && setRankingOpen(!rankingOpen)}
            >
              <span style={link}>Ranking</span>
              <span style={{ 
                transition: 'all 0.3s ease', 
                transform: rankingOpen ? 'rotate(180deg)' : 'rotate(0)',
                fontSize: '1.2rem'
              }}>▾</span>
            </div>
            
            <div style={{ ...rankingCardsContainer, ...(rankingOpen && visibleCards) }}>
              {/* First Card */}
              <Link to="/AQITables" style={{ textDecoration: 'none' }}>
                <div style={rankingCard}>
                  <div style={{ ...cardBackground, backgroundImage: 'url(https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)' }} />
                  <div style={cardContent}>
                    <h3 style={cardTitle}>2024 City Ranking</h3>
                    <div style={cardDivider} />
                    <p style={cardDescription}>
                      Explore the latest air quality rankings for cities worldwide based on 2024 data.
                    </p>
                  </div>
                </div>
              </Link>
              
              {/* Second Card */}
              <Link to="/AQITables2" style={{ textDecoration: 'none' }}>
                <div style={rankingCard}>
                  <div style={{ ...cardBackground, backgroundImage: 'url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)' }} />
                  <div style={cardContent}>
                    <h3 style={cardTitle}>Historic AQI Ranking Based On PM 2.5</h3>
                    <div style={cardDivider} />
                    <p style={cardDescription}>
                      Compare long-term air quality trends with our comprehensive historic data analysis.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </li>
          
          {/* Language Display */}
          <li>
            <div style={languageLabel}>
              <span style={{ ...link, ...preferredLanguageText }}>Preferred Language</span>
              <span style={link}>English</span>
            </div>
          </li>
          
          {/* AQI Standard with Indian Flag */}
          <li>
            <div style={aqiBadge} className="aqi-badge">
              <span>AQI Standard</span>
              <div style={flagStripes}></div>
            </div>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div
          style={hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div style={mobileMenu} className="mobile-menu">
            <Link to="/" style={mobileLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
            
            <Link to="/AirLiveData" style={{ ...mobileLink, color: 'white', backgroundColor: 'red', padding: '10px 15px', borderRadius: '4px', textAlign: 'center' }} onClick={() => setMenuOpen(false)}>
              See Live Map
            </Link>

            <div style={{ position: 'relative' }}>
              <div 
                style={{ ...mobileLink, ...dropdownTrigger, marginBottom: '0.5rem' }}
                onClick={() => setRankingOpen(!rankingOpen)}
                className="mobile-dropdown-trigger"
              >
                Ranking <span style={{ 
                  display: 'inline-block', 
                  transform: rankingOpen ? 'rotate(180deg)' : 'rotate(0)', 
                  transition: 'transform 0.3s',
                  fontSize: '1.2rem'
                }}>▾</span>
              </div>
              <div style={{ 
                display: rankingOpen ? 'flex' : 'none',
                flexDirection: 'column',
                gap: '15px',
                marginTop: '0.8rem',
                width: '100%'
              }}>
                <Link to="/AQITables" className="img-rankings" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <div style={{ ...rankingCard, width: '100%', height: 'auto', marginBottom: '1rem' }}>
                    <div style={{ ...cardBackground, backgroundImage: 'url(https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)' }} />
                    <div style={cardContent}>
                      <h3 style={cardTitle}>2024 City Ranking</h3>
                      <div style={cardDivider} />
                      <p style={cardDescription}>
                        Explore the latest air quality rankings for cities worldwide based on 2024 data.
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/AQITables2" className="img-rankings" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                  <div style={{ ...rankingCard, width: '100%', height: 'auto' }}>
                    <div style={{ ...cardBackground, backgroundImage: 'url(https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)' }} />
                    <div style={cardContent}>
                      <h3 style={cardTitle}>Historic AQI Ranking</h3>
                      <div style={cardDivider} />
                      <p style={cardDescription}>
                        Compare long-term air quality trends with our comprehensive historic data analysis.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <div style={languageLabel}>
              <span style={{ ...mobileLink, ...preferredLanguageText }}>Preferred Language</span>
              <span style={mobileLink}>English</span>
            </div>
            
            <div style={aqiBadge} className="mobile-aqi-badge">
              <span>AQI Standard</span>
              <div style={flagStripes}></div>
            </div>
          </div>
        )}
      </nav>

      {/* Global Styles */}
      <style jsx global>{`
      
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes neonGlow {
          0% { box-shadow: 0 0 5px rgba(255, 153, 51, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 153, 51, 0.8); }
          100% { box-shadow: 0 0 5px rgba(255, 153, 51, 0.5); }
        }
        
        @keyframes threadFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .thread-animation {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #FF9933 20%,
            #FFFFFF 40%,
            #138808 60%,
            #FFFFFF 80%,
            transparent
          );
          animation: threadFlow 6s linear infinite;
          background-size: 200% 100%;
        }
        
        .thread-animation::before,
        .thread-animation::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          animation: inherit;
        }
        
        .thread-animation::before {
          animation-delay: 1s;
        }
        
        .thread-animation::after {
          animation-delay: 2s;
        }
        
        .desktop-nav li a::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF9933, #FFFFFF);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .desktop-nav li a:hover::after,
        .desktop-nav li a:focus::after {
          width: 100%;
        }
        
        .desktop-nav li a:hover,
        .desktop-nav li a:focus {
          color: #FF9933;
          transform: translateY(-2px);
        }
        
        .ranking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        nav {
          position: relative;
        }
        
        nav::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF9933, transparent);
          animation: neonGlow 3s infinite;
        }
        
        .logo-box:hover {
          animation: pulse 2s infinite;
        }
        
        .aqi-badge:hover {
          animation: float 3s ease-in-out infinite;
          background: rgba(255, 153, 51, 0.1);
        }
        
        .hamburger:hover {
          animation: pulse 1s infinite;
        }
        
        .mobile-menu a:hover {
          color: #FF9933;
          transform: translateX(5px);
        }
        
        .mobile-aqi-badge:hover {
          background: rgba(255, 153, 51, 0.1);
        }
        
        @media (max-width: 1200px) {
          .desktop-nav {
            gap: 1.8rem;
          }
        }
        
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          
          .hamburger {
            display: flex;
          }

          .img-rankings{
            width:310px;}
        }
        
        @media (max-width: 768px) {
          .mobile-menu {
            right: 1rem;
            width: calc(100% - 2rem);
          }
        }
        
        @media (max-width: 480px) {
          .logo-text {
            font-size: 1.3rem;
          }
          
          .logo-icon {
            width: 32px;
            height: 32px;
            font-size: 16px;
          }
          
          .mobile-menu {
            top: 4.5rem;
          }
        }
        
        /* Smooth transitions for all interactive elements */
        a, button, .dropdown, .hamburger, .logo-box, .aqi-badge, .dropdown-trigger, .ranking-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
          
      `}</style>
    </div>
  );
};

export default Navbar;

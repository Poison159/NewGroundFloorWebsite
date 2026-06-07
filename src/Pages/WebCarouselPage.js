import { useState, useCallback, useEffect, useRef } from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../components/ImageModal';

const projects = [
  {
    name: 'User Profile',
    url: 'https://siyaportforlio.web.app/#projects',
    description: 'A modern user profile page with social features, activity feed, and customizable settings.',
    images: [
      '/images/web_profile_1.png',
      '/images/web_profile_2.png',
      '/images/web_profile_3.png',
      '/images/web_profile_4.png',
      '/images/web_profile_5.png',
    ],
  },
  {
    name: 'SpotVibe Web/Admin',
    url: 'https://spotvibe-admin.groundfloor.africa/events',
    description: 'A powerful admin panel for managing business operations, users, and analytics in real-time.',
    images: [
      '/images/web_admin_1.png',
      '/images/web_admin_2.png',
      '/images/web_admin_3.png',
      '/images/web_admin_4.png',
      '/images/web_admin_5.png',
    ],
  },
  {
    name: 'Credo Mutwa',
    url: 'https://credomutwa.web.app/',
    description: 'A cultural village website showcasing the heritage, art, and legacy of Credo Mutwa in Soweto.',
    images: [
      '/images/credoMutwa/screenshot_1.png',
      '/images/credoMutwa/screenshot_2.png',
      '/images/credoMutwa/screenshot_3.png',
      '/images/credoMutwa/screenshot_4.png',
      '/images/credoMutwa/screenshot_5.png',
    ],
  },
  {
    name: 'Joburg Theatre',
    url: 'https://joburgtheatre-3f2f4.web.app/',
    description: 'A vibrant theatre venue website featuring upcoming shows, events, and ticket booking.',
    images: [
      '/images/soweto_theatre/screenshot_1.png',
      '/images/soweto_theatre/screenshot_2.png',
      '/images/soweto_theatre/screenshot_3.png',
      '/images/soweto_theatre/screenshot_4.png',
      '/images/soweto_theatre/screenshot_5.png',
    ],
  },
  {
    name: 'SpotVibe',
    url: 'https://spotvibe.co.za/',
    description: 'A modern event discovery and nightlife platform connecting people to vibes, venues, and experiences.',
    images: [
      '/images/SpotVibe-Merketing/screenshot_1.png',
      '/images/SpotVibe-Merketing/screenshot_2.png',
      '/images/SpotVibe-Merketing/screenshot_3.png',
      '/images/SpotVibe-Merketing/screenshot_4.png',
    ],
  },
  {
    name: 'Soweto Equestrian',
    url: 'https://sowetoequestrian-8680d.web.app/services',
    description: 'An equestrian centre website offering horse riding services, lessons, and events in Soweto.',
    images: [
      '/images/aquestrian/screenshot_1.png',
      '/images/aquestrian/screenshot_2.png',
      '/images/aquestrian/screenshot_3.png',
      '/images/aquestrian/screenshot_4.png',
    ],
  },
];

const SWIPE_THRESHOLD = 120;

function SwipeDeck({ images }) {
  const [cardOrder, setCardOrder] = useState(images.map((_, i) => i));
  const [cards, setCards] = useState(images.map((src, i) => ({
    id: i, src,
    x: 0, y: 0, rotation: 0, isOut: false, outX: 0,
  })));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const dragStart = useRef(null);
  const currentOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const animating = useRef(false);
  const wasDragged = useRef(false);

  const activeId = cardOrder[0];
  const activeCard = cards[activeId];
  const nextIds = cardOrder.slice(1, 4);

  const swipeCard = useCallback((direction) => {
    if (animating.current) return;
    animating.current = true;
    const outX = direction === 'right' ? 800 : -800;
    setCards(prev => prev.map(c =>
      c.id === activeId ? { ...c, x: 0, y: 0, rotation: direction === 'right' ? 20 : -20, isOut: true, outX } : c
    ));
    setTimeout(() => {
      setCards(prev => prev.map(c =>
        c.id === activeId ? { ...c, x: 0, y: 0, rotation: 0, isOut: false, outX: 0 } : c
      ));
      setCardOrder(prev => [...prev.slice(1), prev[0]]);
      animating.current = false;
    }, 400);
  }, [activeId]);

  const handlePointerDown = useCallback((e) => {
    if (animating.current) return;
    const pos = e.type === 'touchstart'
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    dragStart.current = pos;
    currentOffset.current = { x: 0, y: 0 };
    isDragging.current = true;
    wasDragged.current = false;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current || !dragStart.current || animating.current) return;
    const pos = e.type === 'touchmove'
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    const dx = pos.x - dragStart.current.x;
    const dy = pos.y - dragStart.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDragged.current = true;
    currentOffset.current = { x: dx, y: dy };
    setCards(prev => prev.map(c =>
      c.id === activeId ? { ...c, x: dx, y: dy, rotation: dx * 0.08 } : c
    ));
  }, [activeId]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    dragStart.current = null;
    const { x } = currentOffset.current;
    if (Math.abs(x) > SWIPE_THRESHOLD) {
      swipeCard(x > 0 ? 'right' : 'left');
    } else {
      setCards(prev => prev.map(c =>
        c.id === activeId ? { ...c, x: 0, y: 0, rotation: 0 } : c
      ));
    }
  }, [activeId, swipeCard]);

  const handleClick = useCallback(() => {
    if (animating.current || wasDragged.current) return;
    const idx = cardOrder[0];
    setModalIndex(idx);
    setModalOpen(true);
  }, [cardOrder]);

  const handleClose = useCallback(() => setModalOpen(false), []);
  const handleNavigate = useCallback((dir) => {
    setModalIndex(prev => {
      if (dir === 'prev') return prev === 0 ? images.length - 1 : prev - 1;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handleNavigate('prev');
      else if (e.key === 'ArrowRight') handleNavigate('next');
      else if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, handleNavigate, handleClose]);

  return (
    <>
      <Box sx={{ position: 'relative', width: 640, height: 480 }}>
        {nextIds.map((id, i) => {
          const card = cards[id];
          return (
            <Box key={card.id} sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              transform: `translateX(${(i + 1) * 8}px) rotate(${(i + 1) * 2}deg)`,
              transition: 'transform 0.3s ease', pointerEvents: 'none',
            }}>
              <Box sx={{
                width: '100%', height: '100%', background: '#000',
                borderRadius: '16px', border: '2px solid #333',
                overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}>
                <Box component="img" src={card.src} sx={{
                  width: '100%', height: '100%', objectFit: 'contain', display: 'block',
                }} />
              </Box>
            </Box>
          );
        })}

        {activeCard && (
          <Box
            sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              transform: `translateX(${activeCard.isOut ? activeCard.outX : activeCard.x}px) translateY(${activeCard.y}px) rotate(${activeCard.rotation}deg)`,
              transition: activeCard.isOut ? 'transform 0.4s ease, opacity 0.35s ease' : isDragging.current ? 'none' : 'transform 0.3s ease',
              cursor: 'grab', zIndex: 10, opacity: activeCard.isOut ? 0 : 1,
              userSelect: 'none',
            }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            onClick={handleClick}
          >
            <Box sx={{
              width: '100%', height: '100%', background: '#000',
              borderRadius: '16px', border: '2px solid #444',
              overflow: 'hidden',
              boxShadow: activeCard.x !== 0 ? '0 20px 60px rgba(0,0,0,0.5)' : '0 8px 30px rgba(0,0,0,0.4)',
              transition: 'box-shadow 0.2s ease',
            }}>
              <Box component="img" src={activeCard.src} sx={{
                width: '100%', height: '100%', objectFit: 'contain', display: 'block',
                userSelect: 'none', WebkitUserSelect: 'none',
              }} draggable={false} />
            </Box>
          </Box>
        )}
      </Box>
      <ImageModal
        open={modalOpen}
        images={images}
        currentIndex={modalIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default function WebCarouselPage() {
  const navigate = useNavigate();
  const [projectIndex, setProjectIndex] = useState(0);
  const [iframeUrl, setIframeUrl] = useState(null);

  const project = projects[projectIndex];

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#aaa', mb: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
          <IconButton
            onClick={() => setProjectIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1))}
            sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box textAlign="center">
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 0.5, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {project.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500, mx: 'auto' }}>
              {project.description}
            </Typography>
            <Box
              onClick={() => {
                if (project.name === 'SpotVibe Web/Admin') {
                  window.open(project.url, '_blank', 'noopener,noreferrer');
                } else {
                  setIframeUrl(project.url);
                }
              }}
              sx={{
                display: 'inline-block',
                mt: 1.5,
                px: 2.5,
                py: 1,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                },
              }}
            >
              Visit {project.name}
            </Box>
          </Box>

          <IconButton
            onClick={() => setProjectIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1))}
            sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 1, color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: 1 }}>
          swipe or click image
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 560, perspective: 1200 }}>
          <SwipeDeck key={projectIndex} images={project.images} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          {projects.map((_, i) => (
            <Box key={i} sx={{
              width: 10, height: 10, borderRadius: '50%',
              bgcolor: i === projectIndex ? 'white' : 'rgba(255,255,255,0.3)',
              transition: 'background-color 0.2s ease',
            }} />
          ))}
        </Box>
      </Container>

      {iframeUrl && (
        <Box
          sx={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setIframeUrl(null)}
        >
          <Box
            sx={{ position: 'relative', width: '95vw', height: '90vh', p: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              onClick={() => setIframeUrl(null)}
              sx={{
                position: 'absolute', top: 4, right: -16, zIndex: 10000,
                color: 'white', background: 'rgba(0,0,0,0.6)',
                border: '2px solid white',
                '&:hover': { background: 'rgba(255,255,255,0.3)' },
              }}
            >
              <CloseIcon sx={{ fontSize: 36 }} />
            </IconButton>
            <Box
              component="iframe"
              src={iframeUrl}
              sx={{
                width: '100%', height: '100%', border: 'none', borderRadius: 2,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
              title="Website Preview"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

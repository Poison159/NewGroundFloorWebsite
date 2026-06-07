import { useState, useCallback, useRef, useEffect } from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../components/ImageModal';

const images = [
  '/images/ana_1.png',
  '/images/ana_2.png',
  '/images/ana_3.png',
];

const SWIPE_THRESHOLD = 80;

export default function SwipeCardsPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissing, setDismissing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const cardRef = useRef(null);
  const drag = useRef({ startX: null, startY: null, deltaX: 0, deltaY: 0, moved: false });

  const dismiss = useCallback(() => {
    if (dismissing) return;
    setDismissing(true);
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % images.length);
      setDismissing(false);
      drag.current = { startX: null, startY: null, deltaX: 0, deltaY: 0, moved: false };
    }, 400);
  }, [dismissing]);

  const handlePointerDown = useCallback((e) => {
    if (dismissing) return;
    const pos = e.type === 'touchstart'
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    drag.current = { startX: pos.x, startY: pos.y, deltaX: 0, deltaY: 0, moved: false };
  }, [dismissing]);

  const handlePointerMove = useCallback((e) => {
    if (drag.current.startX == null || dismissing) return;
    const pos = e.type === 'touchmove'
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    const dx = pos.x - drag.current.startX;
    const dy = pos.y - drag.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) drag.current.moved = true;
    drag.current.deltaX = dx;
    drag.current.deltaY = dy;
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${dx}px) translateY(${dy}px) rotate(${dx * 0.08}deg)`;
    }
  }, [dismissing]);

  const handlePointerUp = useCallback(() => {
    if (drag.current.startX == null) return;
    const { deltaX, moved } = drag.current;
    if (moved && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      dismiss();
    }
    if (cardRef.current) {
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '';
    }
    drag.current = { startX: null, startY: null, deltaX: 0, deltaY: 0, moved: false };
  }, [dismiss]);

  const handleCardClick = useCallback(() => {
    if (drag.current.moved || dismissing) return;
    setModalIndex(currentIndex);
    setModalOpen(true);
  }, [currentIndex, dismissing]);

  const handleClose = useCallback(() => setModalOpen(false), []);
  const handleNavigate = useCallback((dir) => {
    setModalIndex(prev => {
      if (dir === 'prev') return prev === 0 ? images.length - 1 : prev - 1;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, []);

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

  const visibleCards = [];
  const numVisible = Math.min(4, images.length);
  for (let i = 0; i < numVisible; i++) {
    visibleCards.push({
      key: (currentIndex + i) % images.length,
      imgIndex: (currentIndex + i) % images.length,
      stackIndex: i,
    });
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4, position: 'relative' }}>
      <Container maxWidth="md">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: '#aaa', mb: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: 'white', fontWeight: 700, mb: 1, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            Analytics Insights
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: 600, mx: 'auto' }}
          >
            We take data from the app and use it for the owners to make decisions that turns users into customers
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 560, perspective: 1200 }}>
          <Box sx={{ position: 'relative', width: 640, height: 480, '& .swipe-card-dismiss': {
            transform: `translateX(120%) rotate(16deg) !important`,
            opacity: '0 !important',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease !important',
          }}}>
            {visibleCards.map(({ key, imgIndex, stackIndex }) => {
              const isTop = stackIndex === 0;
              const offset = stackIndex * 8;
              const rot = stackIndex * 2;
              return (
                <Box
                  key={key}
                  ref={isTop ? cardRef : null}
                  className={isTop && dismissing ? 'swipe-card-dismiss' : ''}
                  sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    transform: `translateX(${offset}px) rotate(${rot}deg)`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                    cursor: isTop ? 'grab' : 'default',
                    zIndex: 10 - stackIndex,
                    opacity: isTop && dismissing ? 0 : 1,
                    pointerEvents: isTop ? 'auto' : 'none',
                    userSelect: 'none',
                    touchAction: 'none',
                    willChange: 'transform',
                    '&:active': isTop ? { cursor: 'grabbing' } : undefined,
                  }}
                  onMouseDown={isTop ? handlePointerDown : undefined}
                  onMouseMove={isTop ? handlePointerMove : undefined}
                  onMouseUp={isTop ? handlePointerUp : undefined}
                  onMouseLeave={isTop ? handlePointerUp : undefined}
                  onTouchStart={isTop ? handlePointerDown : undefined}
                  onTouchMove={isTop ? handlePointerMove : undefined}
                  onTouchEnd={isTop ? handlePointerUp : undefined}
                  onClick={isTop ? handleCardClick : undefined}
                >
                  <Box sx={{
                    width: '100%', height: '100%', background: '#000',
                    borderRadius: '16px', border: '2px solid #333',
                    overflow: 'hidden',
                    boxShadow: isTop ? '0 20px 60px rgba(0,0,0,0.5)' : '0 8px 30px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.2s ease',
                  }}>
                    <Box component="img" src={images[imgIndex]} sx={{
                      width: '100%', height: '100%', objectFit: 'contain', display: 'block',
                      userSelect: 'none', WebkitUserSelect: 'none',
                    }} draggable={false} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>

      <ImageModal
        open={modalOpen}
        images={images}
        currentIndex={modalIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </Box>
  );
}

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

const SWIPE_THRESHOLD = 120;

export default function SwipeCardsPage() {
  const navigate = useNavigate();
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
                  transition: activeCard.isOut
                    ? 'transform 0.4s ease, opacity 0.35s ease'
                    : isDragging.current ? 'none' : 'transform 0.3s ease',
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

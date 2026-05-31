import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ImageModal({ open, images, currentIndex, onClose, onNavigate }) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <Box
          sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          sx={{
            position: 'absolute',
            top: -16,
            right: -16,
            zIndex: 10000,
            color: 'white',
            background: 'rgba(0,0,0,0.6)',
            border: '2px solid white',
            '&:hover': { background: 'rgba(255,255,255,0.3)' },
          }}
        >
          <CloseIcon sx={{ fontSize: 36 }} />
        </IconButton>

        <Box
          component="img"
          src={images[currentIndex]}
          sx={{
            maxWidth: '90vw',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 2,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            display: 'block',
          }}
        />

        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'fadeInOut 5.5s ease-in-out infinite',
              '@keyframes fadeInOut': {
                '0%': { opacity: 0 },
                '9%': { opacity: 1 },
                '36%': { opacity: 1 },
                '45%': { opacity: 0 },
                '100%': { opacity: 0 },
              },
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: 1,
                textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
                animation: 'shimmer 2s ease-in-out infinite',
                '@keyframes shimmer': {
                  '0%': { textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)' },
                  '50%': { textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.6)' },
                  '100%': { textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)' },
                },
              }}
            >
              Click left or right to browse
            </Typography>
          </Box>
        )}

        {images.length > 1 && (
          <>
            <Box
              onClick={() => onNavigate('prev')}
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '50%',
                height: '100%',
                cursor: 'w-resize',
              }}
            />
            <Box
              onClick={() => onNavigate('next')}
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: '50%',
                height: '100%',
                cursor: 'e-resize',
              }}
            />
          </>
        )}
      </Box>

      {images.length > 1 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 0.8 }}>
            {images.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
                  transition: 'background-color 0.2s ease',
                }}
              />
            ))}
          </Box>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.8rem',
              fontWeight: 500,
              ml: 1,
              px: 1.5,
              py: 0.3,
              borderRadius: 1,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {currentIndex + 1}/{images.length}
          </Typography>
        </Box>
      )}

    </Box>
  );
}

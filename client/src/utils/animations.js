export const cardVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.5, ease: 'easeInOut' },
  }, // Ẩn: mờ + lệch phải
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  }, // Hiện: rõ + trượt vào
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.5, ease: 'easeInOut' },
  }, // Ẩn đi: lệch trái + mờ dần
};

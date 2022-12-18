export const fadeUp = (delay) => {
  return {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };
};

export const fadeDown = (delay) => {
  return {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.4,
      },
    },
  };
};

export const fadeLeft = (delay) => {
  return {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.4,
      },
    },
  };
};

export const fadeRight = (delay) => {
  return {
    hidden: { opacity: 0, x: 30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.4,
      },
    },
  };
};

export const fadeHomePageBG = (delay) => {
  return {
    hidden: { scale: 0, x: 500, y: -400, opacity: 0 },
    show: {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 100,
      transition: {
        delay: delay,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };
};

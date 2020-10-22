export const FLIP_DURATION = 400;

export const FLIPS = 2;

export const keyframesFrontFlip = [
  {
    offset: 0,
    transform: "perspective(400px) rotate3d(0, 1, 0, 0deg)",
    visibility: "visible",
  },
  {
    offset: 0.25,
    transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
    visibility: "hidden",
  },
  {
    offset: 0.75,
    transform: "perspective(400px) rotate3d(0, 1, 0, 270deg)",
    visibility: "visible",
  },
  {
    offset: 1,
    transform: "perspective(400px) rotate3d(0, 1, 0, 360deg)",
    visibility: "visible",
  },
];

export const keyframesFrontHalfFlip = [
  {
    offset: 0,
    transform: "perspective(400px) rotate3d(0, 1, 0, 0deg)",
    visibility: "visible",
  },
  {
    offset: 0.5,
    transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
    visibility: "hidden",
  },
  {
    offset: 1,
    transform: "perspective(400px) rotate3d(0, 1, 0, 180deg)",
    visibility: "hidden",
  },
];

export const keyframesBackFlip = [
  {
    offset: 0,
    transform: "perspective(400px) rotate3d(0, 1, 0, -180deg)",
    visibility: "hidden",
  },
  {
    offset: 0.25,
    transform: "perspective(400px) rotate3d(0, 1, 0, -90deg)",
    visibility: "visible",
  },
  {
    offset: 0.75,
    transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)",
    visibility: "hidden",
  },
  {
    offset: 1,
    transform: "perspective(400px) rotate3d(0, 1, 0, 180deg)",
    visibility: "hidden",
  },
];

export const keyframesBackHalfFlip = [
  {
    offset: 0,
    transform: "perspective(400px) rotate3d(0, 1, 0, -180deg)",
    visibility: "hidden",
  },
  {
    offset: 0.5,
    transform: "perspective(400px) rotate3d(0, 1, 0, -90deg)",
    visibility: "visible",
  },
  {
    offset: 1,
    transform: "perspective(400px) rotate3d(0, 1, 0, 0deg)",
    visibility: "visible",
  },
];

export const timingFlip = {
  duration: FLIP_DURATION,
  iterations: FLIPS,
};

export const timingHalfFlip = {
  duration: FLIP_DURATION / 2,
  iterations: 1,
};

export const timingFastFlip = {
  duration: FLIP_DURATION / 2,
  iterations: FLIPS,
};

export const timingHalfFastFlip = {
  duration: FLIP_DURATION / 4,
  iterations: 1,
};

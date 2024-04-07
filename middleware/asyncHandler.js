// untuk mengatasi error asynccronus

// memiliki parameter fn
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

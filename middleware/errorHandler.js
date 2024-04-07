const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  // untuk menampilkan pesan errornya
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // jika status code = 200 maka akan di ganti dengan status 500
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;

  // menampilkan pesan dari errornuya
  let message = err.message;

  if (err.name == "CastError" && err.kind === "ObjectId") {
    message = "Resource not Found";
    statusCode = 404;
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    // jika masih di development maka akan muncul err.stack kalau di production maka akan muncul null
    stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
  });
};

export { notFound, errorHandler };

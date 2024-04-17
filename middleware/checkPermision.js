export const checkPermision = (requestUser, resourceUserId) => {
  // jika request usernya role == admin
  if (requestUser.role === "admin") {
    return;
  }

  // ketika useridnya nya itu userid sendiri bukan userid orang lain
  if (requestUser._id.toString() === resourceUserId.toString()) {
    return;
  }

  throw new Error("Anda tidak bisa melakukan update/delete pertanyaan user lain");
};

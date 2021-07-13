import administrators from "../models/Administrator";

export default async (req, res, next) => {
  try {
    const user = await administrators.findByPk(req.params.id);

    console.log(user);
    if (user.email !== req.userEmail) {
      res.status(403).json({
        errors: [
          "You do not have authorization to modify another administrator's data.",
        ],
      });
    }
    return next();
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

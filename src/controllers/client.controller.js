import errors from "../utils/error.js"
import User from '../models/user.model.js'

const GET = async (req, res, next) => {
  const { id } = req?.params

  if (!id) {
    return next(new errors.NotFoundError(404, "Id required!"));
  }

  const user = await User.findById(id)

  if (!user) {
    return next(
      new errors.NotFoundError(404, "User not Found with given Id!")
    )
  };

  return res
    .status(200)
    .json({
      status: 200,
      message: 'successfully read user!',
      data: user
    });

}

export default {
  GET
}
import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";

const register = async (req, res) => {
  //Check duplicated emails/users
  const { email } = req.body;
  const duplicatedUser = await User.findOne({ email });

  if (duplicatedUser) {
    const error = new Error("User already exist");
    res.status(400).json({ msg: error.message });
    return;
  }

  try {
    const user = new User(req.body);
    //Generates the token for confirmation
    user.token = crypto.randomUUID();
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  //Check if user exist
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User doesn't exist");
    return res.status(404).json({ msg: error.message });
  }

  //Check if user is confirm
  if (!user.confirmed) {
    const error = new Error("User is not confirmed");
    return res.status(400).json({ msg: error.message });
  }

  //Check user password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Username or password not correct");
    return res.status(401).json({ msg: error.message });
  }
};

const confirmUser = async (req, res) => {
  //Check if there is a user with the token and create an instance of that user
  const user = await User.findOne({ token: req.params.token });

  //If token is not valid
  if (!user) {
    const error = new Error("No valid token");
    return res.status(401).json({ msg: error.message });
  }

  //In case validation pass
  try {
    user.confirmed = true;
    user.token = "";
    await user.save();
    res.json({ msg: "User confirmed" });
  } catch (error) {
    console.log(error);
  }
};

export { register, authenticate, confirmUser };

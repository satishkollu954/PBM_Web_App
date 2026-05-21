exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("BODY:", req.body);

    console.log("ENV USER:", process.env.ADMIN_USERNAME);

    console.log("ENV PASS:", process.env.ADMIN_PASSWORD);

    // Trim values
    const envUsername = process.env.ADMIN_USERNAME?.trim();

    const envPassword = process.env.ADMIN_PASSWORD?.trim();

    // Username Check
    if (username.trim() !== envUsername) {
      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    // Password Check
    if (password.trim() !== envPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        username,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

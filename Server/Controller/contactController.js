const Contact = require("../Model/Contact");

const transporter = require("../Config/mailConfig");

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, phoneNumber, email, message } = req.body;

    // Validation
    if (!name || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Name and Phone Number are required",
      });
    }

    // Create Contact
    const contact = await Contact.create({
      name,
      phoneNumber,
      email,
      message,
    });

    // Send Email To Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.ADMIN_EMAIL,

      subject: "New Contact Form Submission - PBM Church",

      html: `
  <div
    style="
      margin:0;
      padding:0;
      background-color:#081120;
      font-family:Arial,sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding:40px 20px;"
    >
      <tr>
        <td align="center">
          <table
            width="650"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#0d1b2a;
              border-radius:16px;
              overflow:hidden;
              border:1px solid rgba(201,168,76,0.2);
              box-shadow:0 10px 40px rgba(0,0,0,0.4);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background:linear-gradient(90deg,#c9a84c,#f0c040);
                  padding:30px;
                  text-align:center;
                "
              >
                <h1
                  style="
                    margin:0;
                    color:#081120;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:1px;
                  "
                >
                  ✝ PBM Church
                </h1>

                <p
                  style="
                    margin-top:10px;
                    color:#081120;
                    font-size:15px;
                    font-weight:600;
                  "
                >
                  New Contact Form Submission
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:35px;">
                <p
                  style="
                    color:#ffffff;
                    font-size:16px;
                    margin-bottom:30px;
                    line-height:1.7;
                  "
                >
                  A new visitor has submitted the
                  contact form on the PBM Church
                  website.
                </p>

                <!-- Card -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background:#081120;
                    border:1px solid rgba(201,168,76,0.15);
                    border-radius:12px;
                    overflow:hidden;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding:18px 22px;
                        border-bottom:1px solid rgba(255,255,255,0.05);
                      "
                    >
                      <span
                        style="
                          color:#c9a84c;
                          font-weight:bold;
                          font-size:14px;
                          display:block;
                          margin-bottom:6px;
                        "
                      >
                        NAME
                      </span>

                      <span
                        style="
                          color:#ffffff;
                          font-size:16px;
                        "
                      >
                        ${name}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:18px 22px;
                        border-bottom:1px solid rgba(255,255,255,0.05);
                      "
                    >
                      <span
                        style="
                          color:#c9a84c;
                          font-weight:bold;
                          font-size:14px;
                          display:block;
                          margin-bottom:6px;
                        "
                      >
                        PHONE NUMBER
                      </span>

                      <span
                        style="
                          color:#ffffff;
                          font-size:16px;
                        "
                      >
                        ${phoneNumber}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:18px 22px;
                        border-bottom:1px solid rgba(255,255,255,0.05);
                      "
                    >
                      <span
                        style="
                          color:#c9a84c;
                          font-weight:bold;
                          font-size:14px;
                          display:block;
                          margin-bottom:6px;
                        "
                      >
                        EMAIL
                      </span>

                      <span
                        style="
                          color:#ffffff;
                          font-size:16px;
                        "
                      >
                        ${email || "N/A"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:18px 22px;">
                      <span
                        style="
                          color:#c9a84c;
                          font-weight:bold;
                          font-size:14px;
                          display:block;
                          margin-bottom:6px;
                        "
                      >
                        MESSAGE
                      </span>

                      <div
                        style="
                          color:#ffffff;
                          font-size:16px;
                          line-height:1.8;
                          white-space:pre-line;
                        "
                      >
                        ${message || "No message provided"}
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Footer Message -->
                <div
                  style="
                    margin-top:35px;
                    text-align:center;
                  "
                >
                  <p
                    style="
                      color:#9ca3af;
                      font-size:14px;
                      line-height:1.7;
                    "
                  >
                    This message was automatically
                    generated from the PBM Church
                    website contact form.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background:#060b16;
                  padding:20px;
                  text-align:center;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#6b7280;
                    font-size:13px;
                  "
                >
                  © ${new Date().getFullYear()}
                  PBM Church. All Rights Reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const EmailTemplate = (mailheader, mailbody) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stockiffy Inventory</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      color: #333;
    }
    /* Responsive Container */
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    /* Header */
    .header {
      text-align: center;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;
      height: 250px;
    }
    .header img {
      width: 100%;
      max-width: 100%;
      height: 100%;
    }
    /* Main Content */
    .body {
      padding: 1.5rem 0;
    }
    .h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }
    .p {
      font-size: 1rem;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    /* Button */
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      color: #ffffff;
      background-color: #07c707;
      border-radius: 6px;
      text-decoration: none;
      text-align: center;
      margin-top: 1rem;
    }
    /* Footer */
    .footer {
      padding-top: 1.5rem;
      font-size: 0.875rem;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
      text-align: center;
    }
    .footer a {
      color: #07c707;
      text-decoration: none;
    }

    /* Responsive Styles */
    @media screen and (max-width: 600px) {
      .container {
        padding: 1rem;
        border-radius: 0;
      }
      .h1 {
        font-size: 1.25rem;
      }
      .p {
        font-size: 0.875rem;
      }
      .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      .header img {
        max-width: 96%; /* Adjusts image size on small screens */
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img src="http://localhost:3000/email_images/email_temp_header.png" alt="email_temp_header">
    </div>

    <!-- Body Content -->
    <div class="body">
      <h1 class="h1">${mailheader}</h1>
      <p class="p">   ${mailbody}</p></div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; 2025 Stockiffy Inc. All rights reserved.</p>
      <p>
        <a href="https://Stockiffy.com/newsletter/unsubscribe">Unsubscribe</a> | 
        <a href="https://Stockiffy.com/privacy-policy">Privacy Policy</a> |
        <a
                      href="https://Stockiffy.com" target="_blank"
                      >Visit Website</a>
      </p>
      <hr />
        <p>Our Company Address.</p>
        <p>
          Phone: +0 000 0000 0000 
          &nbsp; | &nbsp;
         Email: info@Stockiffy.com
        </p>
    </div>
  </div>
</body>
</html>
  `;
};

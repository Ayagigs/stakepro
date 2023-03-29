
export function htmlTemplate(baseUrl, name, email, token) {
    return `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email template</title>
    <style>
    .container {
        margin-top: 50px;
        justify-content: center;
        text-align: center;
        padding: 10px;
    }
    
    .btn {
        padding: 15px 15px;
        background-color: rgb(143, 219, 240);
        border-radius: 8px;
        text-decoration: none;
        color: white;
        font-size: 20px;
    }
    
    span {
        font-weight: bolder;
        font-size: large;
    }
</style>
  </head>
  <body>
  <div class="container">
    Dear <span>${name},</span>
        <br/>
        <p class="lead">
            kindly follow this link in order to continue with your registration process as an admin!
        </p>
        <br/>
        <a class="btn" href="${baseUrl}/api/v1/admin/admin-registration-continuation?email=${email}&token=${token}"> Activate your account</a>
    </div>
  </body>
</html>
    `
}

export function htmlTemplate(baseUrl, email, token) {
    return `
    <!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email template</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <style>
    .container1 {
        margin-top: 50px;
        justify-content: center;
        text-align: center;
        padding: 10px;
    }

    .btn {
        padding: 15px 15px;
        background-color: rgb(9, 129, 248);
        color: white;
        border-radius: 8px;
        text-decoration: none;
        font-size: 20px;
    }
</style>
  </head>
  <body>
  <div class="container">
    Dear <h1>${email},</h1>
        <br/>
        <p class="lead">
            kindly follow this link in order to continue with your registration process as an admin! <br/>
            <a class="btn" href="${baseUrl}/api/v1/admin/admin-registration-continuation?email=${email}&token=${token}"> Activate your account</a>
        </p>
    </div>
  </body>
</html>
    `
}
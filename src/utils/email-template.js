
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

    .btn1 {
        padding: 15px 15px;
        background-color: rgb(129, 9, 248);
        color: white;
        border-radius: 15px;
        text-decoration: none;
    }
</style>
  </head>
  <body>
  <div class="container text-center">
    Dear <h1>${email},</h1>
        <br/>
        <p class="lead">
            kindly follow this link in order to continue with your registration process as an admin!
            <a class="btn btn-primary btn1 btn-lg" href="${baseUrl}/api/v1/admin/admin-registration-continuation?email=${email}&token=${token}"> Activate your account</a>
        </p>
    </div>
  </body>
</html>
    `
}
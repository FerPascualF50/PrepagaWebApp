
export const confirmEmailTemplate =

`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Salud +</title>
  <style>
    .button {
      background-color: #ff5862;
      border: none;
      color: #ffffff;
      padding: 15px 32px;
      text-align: center;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 5px;
    }
    .plus {
      color: #ff5862;
    }
    .container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    h2 {
      color: #314080; 
      padding-bottom: 10px;
      text-align: center;
    }
    p {
      color: #314080;
      text-align: center; 
    }
  </style>
</head>
<body class="container">
  <div>
    <h2>¡Gracias por registrarte en Salud <span class="plus">+ </span>!</h2>
    <p>Para confirmar tu cuenta, haz clic en el siguiente botón:</p>
    <a href="{{validationLink}}" class="button">Confirmar Cuenta</a>
  </div>
</body>
</html>`
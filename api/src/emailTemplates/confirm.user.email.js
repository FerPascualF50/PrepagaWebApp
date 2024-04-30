export const confirmEmailTemplate =

`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vita +</title>
<head>
<style>
.button {
  display: inline-block;
  background-color: #ff5862;
  border: none;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  margin: 20px 0; 
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none; 
}
.button:hover {
  background-color: #ff444d; 
}
.button span {
  color: #fff; 
}
.plus {
  color: #ff5862;
}
.container {
  display: flex;
  justify-content: center;
}

h2 {
  color: #10a37f;
  padding-bottom: 10px;
  text-align: center;
}
h3 {
  color: #10a37f;
  text-align: center;
 
}
a{
  color: #fff;
}
</style>
</head>
<body class="container">
  <div>
    <h2>¡ Gracias por registrarte en Vita <span class="plus">+ </span>!</h2>
    <h3>Para confirmar tu cuenta, haz clic en el siguiente botón:</h3>
    <br>
    <a href="{{validationLink}}" class="button"><span>Confirmar Cuenta</span></a>
  </div>
</body>
</html>`
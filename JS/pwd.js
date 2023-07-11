function verificarContrasena(contrasena) {
    if (contrasena.length < 8) {
        return { mensaje: "Contraseña débil. al menos 8 caracteres.", color: "red" };
    } else if (!/\d/.test(contrasena)) {
        return { mensaje: "Contraseña débil. al menos un número.", color: "red" };
    } else if (!/[a-zA-Z]/.test(contrasena)) {
        return { mensaje: "Contraseña débil. al menos una letra.", color: "red" };
    } else if (!/[A-Z]/.test(contrasena)) {
        return { mensaje: "Contraseña débil. al menos una letra mayúscula.", color: "red" };
    } else if (!/[a-z]/.test(contrasena)) {
        return { mensaje: "Contraseña débil. al menos una letra minúscula.", color: "red" };
    } else {
        return { mensaje: "Contraseña fuerte.", color: "green" };
    }
}

document.getElementById("password").addEventListener("input", function () {
    var contrasenaIngresada = this.value;
    var resultado = verificarContrasena(contrasenaIngresada);
    document.getElementById("resultado").innerText = resultado.mensaje;
    document.getElementById("resultado").style.color = resultado.color;
});
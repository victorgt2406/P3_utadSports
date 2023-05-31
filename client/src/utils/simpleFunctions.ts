const capitalizeFirstLetter = (text:string) => text.charAt(0).toUpperCase() + text.slice(1);

const aspectRatio16_9 = (height:number, width:number) => height / width === 9 / 16;

function validateEmail(email:string) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function getNameAndSurname(email:string) {
    // Comprueba si el correo es válido y sigue el patrón específico
    var re = /^[a-zA-Z]+(\.[a-zA-Z]+)?@(live.)?u-tad.com$/;
    if (re.test(String(email).toLowerCase())) {
        // Si el correo es válido, extrae el nombre y apellido
        var splitEmail = email.split('@')[0];
        var nameSurname = splitEmail.split('.');
        return {
            name: nameSurname[0],
            surname: nameSurname.length > 1 ? nameSurname[1] : null
        };
    } else {
        // Si el correo no es válido, devuelve null
        return null;
    }
}

export {capitalizeFirstLetter, validateEmail, getNameAndSurname};
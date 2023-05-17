import bcryptjs from "bcryptjs";

const encrypt = async (clearPassword:string) => {
    const hash = await bcryptjs.hash(clearPassword, 10); // En criptografía, el número o string "Salt" le otorga aleatoriedad a la función hash al combinarla con la password en claro.
    return hash;
}

const compare = async (clearPassword:string, hashedPassword:string) => { // Compara entre la password en texto plano (en claro) y su hash calculado anteriormente para decidir si coincide.
    const result = await bcryptjs.compare(clearPassword, hashedPassword);
    return result;
}

// module.exports = { encrypt, compare };
export { encrypt, compare };
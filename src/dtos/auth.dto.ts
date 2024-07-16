import * as yup from 'yup';



export const LoginDto = yup.object().shape({
    email: yup.string().email("Debe ser formato email").required("email requerido"),
    password: yup.string().min(6, "Contraseña Minimo 6 Caracteres").required("Contraseña requerida"),
});

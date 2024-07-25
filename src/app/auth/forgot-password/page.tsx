import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import ForgotPasswordForm from '@/components/auth/forgot-password/forgot-password-form';

export default function ForgotPasswordPage() {
    return (
        <div className="flex justify-center items-center my-6 mx-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Recuperar Contraseña</CardTitle>
                    <CardDescription className="text-center">
                        Restablezca su contraseña en tres sencillos pasos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ForgotPasswordForm />
                    </Suspense>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recuerdas tu contraseña? <a href="/auth/login" className="text-primary hover:underline">
                            Iniciar sesión
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
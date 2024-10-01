'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from 'lucide-react';
import { sendVerificationCode, verifyCode, resetPassword } from '@/actions/forgot-password.actions';
import useToastActionResponse from '@/hooks/useToastActionResponse';
import { errorAction } from '@/errors/ResponseError';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3;

type ForgotPasswordFormProps = {
    isAppMobile?: boolean;
};

export default function ForgotPasswordForm({ isAppMobile = false }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const { toastActionResponse } = useToastActionResponse();
    const router = useRouter();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await sendVerificationCode(email);
            toastActionResponse(result);
            if (!result.error) setStep(2);
        } catch (error) {
            toastActionResponse({ error: true, message: 'Ocurrió un error. Por favor, intente de nuevo.' });
        }
        setIsLoading(false);
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await verifyCode(email, verificationCode);
            toastActionResponse(result);
            if (!result.error) setStep(3);
        } catch (error) {
            toastActionResponse(errorAction('Ocurrió un error. Por favor, intente de nuevo.'));
        }
        setIsLoading(false);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toastActionResponse(errorAction('Las contraseñas no coinciden.'));
            return;
        }
        setIsLoading(true);
        try {
            const result = await resetPassword(email, verificationCode, newPassword);
            toastActionResponse(result);
            if (!result.error) {
                if (isAppMobile) {
                    window.location.href = 'recypaid://auth';
                }
                router.push('/auth/login');
            }
        } catch (error) {
            toastActionResponse(errorAction('Ocurrió un error. Por favor, intente de nuevo.'));
        }
        setIsLoading(false);
    };

    return (
        <>
            {step === 1 && (
                <form onSubmit={handleSendCode} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                placeholder="Ingrese su correo electrónico"
                                required
                            />
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Enviando código...' : 'Enviar código de verificación'}
                    </Button>
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="verificationCode">Código de verificación</Label>
                        <Input
                            id="verificationCode"
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Ingrese el código de verificación"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Verificando...' : 'Verificar código'}
                    </Button>
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Ingrese nueva contraseña"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirme nueva contraseña"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Restableciendo contraseña...' : 'Restablecer contraseña'}
                    </Button>
                </form>
            )}
        </>
    );
}
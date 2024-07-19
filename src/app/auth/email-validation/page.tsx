import SendCodeForm from "@/components/auth/email-validation/send-code-form";
import SendEmailCode from "@/components/auth/email-validation/send-email-code-from";

type EmailValidationPageProps = {
    searchParams: {
        email: string;
    };
};

export default function EmailValidationPage({
    searchParams,
}: EmailValidationPageProps) {
    return (
        <div className="flex h-screen items-center">
            <section className="mx-auto max-w-md space-y-6 p-3 bg-card">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Verificar Email</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Ingrese su dirección de correo electrónico para recibir un código de verificación.
                    </p>
                </div>
                <div className="space-y-4">
                    <SendEmailCode email={searchParams?.email || ""} />
                    <SendCodeForm email={searchParams.email} />
                </div>
            </section>
        </div>
    );
}

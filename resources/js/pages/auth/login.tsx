import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Login() {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/login');
    };

    return (
        <>
            <Head title="Вход" />
            <div className="mx-auto flex min-h-screen max-w-md items-center p-6">
                <form onSubmit={submit} className="w-full space-y-4 rounded-lg border border-gray-200 p-6">
                    <h1 className="text-xl font-semibold">Вход</h1>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {form.errors.email ? <p className="mt-1 text-sm text-red-600">{form.errors.email}</p> : null}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm">
                            Пароль
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={form.data.password}
                            onChange={(event) => form.setData('password', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {form.errors.password ? <p className="mt-1 text-sm text-red-600">{form.errors.password}</p> : null}
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.data.remember}
                            onChange={(event) => form.setData('remember', event.target.checked)}
                        />
                        Запомнить меня
                    </label>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
                    >
                        Войти
                    </button>

                    <p className="text-sm text-gray-600">
                        Нет аккаунта?{' '}
                        <Link href="/register" className="underline">
                            Зарегистрироваться
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

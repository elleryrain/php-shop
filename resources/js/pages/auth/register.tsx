import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.post('/register');
    };

    return (
        <>
            <Head title="Регистрация" />
            <div className="mx-auto flex min-h-screen max-w-md items-center p-6">
                <form onSubmit={submit} className="w-full space-y-4 rounded-lg border border-gray-200 p-6">
                    <h1 className="text-xl font-semibold">Регистрация</h1>

                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm">
                            Имя
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={form.data.name}
                            onChange={(event) => form.setData('name', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {form.errors.name ? <p className="mt-1 text-sm text-red-600">{form.errors.name}</p> : null}
                    </div>

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

                    <div>
                        <label htmlFor="password_confirmation" className="mb-1 block text-sm">
                            Подтвердите пароль
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={form.data.password_confirmation}
                            onChange={(event) => form.setData('password_confirmation', event.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing}
                        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60"
                    >
                        Создать аккаунт
                    </button>

                    <p className="text-sm text-gray-600">
                        Уже есть аккаунт?{' '}
                        <Link href="/login" className="underline">
                            Войти
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}

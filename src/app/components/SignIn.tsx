import { useForm } from "react-hook-form"

type FormData = {
    email: string
    password: string
}
type SignInProps = {
    onLogin: () => void
    onSetEmail: (email: string) => void
    onSetPassword: (password: string) => void
}
export const SignIn = ({ onLogin, onSetEmail, onSetPassword }: SignInProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit = (data: FormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        console.log('submit:', data)
        onLogin()
    }

    return (
        <form className="p-6" data-testid="signin" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <label htmlFor="email">Your email</label>
                <input
                    data-testid="signin-email-input"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address'
                        }
                    })}
                    type="email"
                    id="email"
                    placeholder="name@domain.com"
                    onInput={(e) => onSetEmail((e.target as HTMLInputElement).value)}
                />
                <span className="text-red-500">{errors.email && "Email is required"}</span>
            </div>
            <div className="mb-6">
                {/* TODO: implement stricter password requirements */}
                <label htmlFor="password">Your password</label>
                <input
                    data-testid="signin-password-input"
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    onInput={(e) => onSetPassword((e.target as HTMLInputElement).value)}
                />
                <span className="text-red-500">{errors.password && "Password is required"}</span>
            </div>
            <button
                data-testid="signin-submit-btn"
                type="submit"
                className="action-btn"
            >
                Sign in
            </button>
        </form>
    )
}
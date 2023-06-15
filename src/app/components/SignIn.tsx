export const SignIn = () =>
    <form className="p-6" >
        Sign in
        <div className="mb-6">
            <label htmlFor="email">Your email</label>
            <input
                type="email"
                id="email"
                placeholder="name@domain.com"
                required
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password">Your password</label>
            <input
                type="password"
                id="password"
                required
            />
        </div>
        <button type="submit" className="action-btn">
            Sign in
        </button>
    </form >
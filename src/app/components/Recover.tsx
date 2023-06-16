import { useForm } from "react-hook-form"

type FormData = {
    mnemonic: string
}
type RecoverProps = {
    setDecryptedMnemonic: (decryptedMnemonic: string) => void
}
export const Recover = ({ setDecryptedMnemonic }: RecoverProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const onSubmit = (data: FormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        setDecryptedMnemonic(data.mnemonic)
    }
    return (
        <form className="p-6" data-testid="signin" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <label htmlFor="mnemonic">Your Mnemonic</label>
                <textarea
                    data-testid="recover-mnemonic-input"
                    {...register("mnemonic", { required: true })}
                    id="mnemonic"
                    placeholder="..."
                ></textarea>
                <span
                    className="text-red-500">
                    {errors.mnemonic && "Mnenomic is required"}
                </span>
            </div>
            <button
                data-testid="recover-submit-btn"
                type="submit"
                className="action-btn"
            >
                Recover Account
            </button>
        </form>
    )
}
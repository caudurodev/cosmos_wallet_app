import { useState } from 'react';

const WalletAddressForm = ({ onGetBalance }) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onGetBalance(value);
    };

    return (
        <center>
            <form onSubmit={handleSubmit}>
                <input
                    label="cosmos address"
                    value={value}
                    onChange={handleChange}
                />
                <button type="submit">
                    Get Balance
                </button>
            </form>
        </center>
    );
};

export default WalletAddressForm;
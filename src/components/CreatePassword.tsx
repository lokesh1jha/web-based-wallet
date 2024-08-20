import React, { ChangeEvent, FormEvent, useState } from "react";

// Define the type for component props
interface CreatePasswordProps {
    setPassword: (password: string) => void;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ setPassword }) => {
    const [password, setLocalPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Type the event parameter as FormEvent<HTMLFormElement>
    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Password didn't match");
        } else {
            setError("");
            setPassword(password);
        }
    };

    return (
        <div>
            <h1>Create Password</h1>
            <form onSubmit={formSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLocalPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                <button className="create-wallet-button" type="submit">Confirm Password</button>
            </form>
        </div>
    );
};

export default CreatePassword;

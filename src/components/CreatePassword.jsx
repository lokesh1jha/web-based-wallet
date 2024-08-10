import React from "react";

const CreatePassword = ({ setPassword }) => {
    const [password, setLocalPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("formSubmit", e);
        console.log("Password", password);
        console.log("Confirm Password", confirmPassword);
        if (password !== confirmPassword) {
            setError("Password didn't match");
        } else {
            setError("");
            setPassword(password); // Using the setPassword prop passed from CreateWallet
            console.log("Password matched");
        }
    };

    return (
        <div>
            <h1>Create Password</h1>
            <form action="" onSubmit={formSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" onChange={e => setLocalPassword(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input type="password" id="confirm-password" onChange={e => setConfirmPassword(e.target.value)} className="form-input" />
                </div>

                {error && <div className="error-message">{error}</div>}
                <button className="create-wallet-button" type="submit">Confirm Password</button>
            </form>
        </div>
    );
};

export default CreatePassword;

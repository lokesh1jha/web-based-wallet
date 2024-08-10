import React from "react";

const MnemonicPhrase = ({ mnemonicPhrase, setOnNext }) => {

  return (
    <div>
      <h2>
        Your Secret Recovery Phrase
      </h2>
      <div style={{ textAlign: "center", color: "red" }}>
        Please write down this recovery phrase and keep it in a safe place. It will be needed to retrieve your wallet.
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          padding: "20px",
        }}
      >
        {mnemonicPhrase?.split(" ").map((word, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <span>{index + 1}. </span>
            <span style={{ marginLeft: "5px" }}>{word}</span>
          </div>
        ))}
      </div>

      <div>
        <button
          className="create-wallet-button"
          onClick={() => setOnNext(true)}
        >
          Next
        </button>
      </div>
    </div>

  );
};

export default MnemonicPhrase;

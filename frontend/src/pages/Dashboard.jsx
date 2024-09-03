import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
                console.log(token);
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBalance(response.data.balance); // Adjust according to response structure
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {error && <p>Error: {error}</p>}
                {balance !== null ? (
                    <Balance value={balance} />
                ) : (
                    <p>Loading balance...</p>
                )}
                <Users />
            </div>
        </div>
    );
};

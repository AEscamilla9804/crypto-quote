import { useState } from 'react'
import { currencies } from '../../utils'
import { useStore } from '../../store/store';
import { toast } from 'react-toastify';

export default function FundsForm({ mode, setMode }) {
    const [data, setData] = useState({
        currency: "",
        amount: ""
    });

    const addFunds = useStore(state => state.addFunds);
    const withdrawFunds = useStore(state => state.withdrawFunds);

    const disableBtn = data.amount <= 0;

    const handleSubmit = e => {
        e.preventDefault();

        const { currency, amount } = data;

        /** Empty Field Validation */
        const isEmpty = Object.values(data).some(value => value === "" || value === null);
        if (isEmpty) return toast.error("All fields required");

        /** User Confirmation */
        const confirm = window.confirm("Are you sure you want to procede?");
        if (!confirm) return

        let response;

        /** Deposit / Withdraw Funds */
        if (mode === "deposit") {
            response = addFunds(amount, currency);
        } else {
            response = withdrawFunds(amount, currency)
        }
        
        
        if (response.success) {
            toast.success(response.message);

            setData({
                currency: "",
                amount: ""
            });

            setMode(null);
        } else {
            toast.error(response.error);
        }
    }
    
    const handleChange = e => {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: name === "amount"
                ? value === "" ? "" : Number(value)
                : value
        }));
    }

    return (
        <form
            className='bg-white p-5 rounded-lg shadow flex flex-col gap-3 animate-[fadeInDown_0.4s_ease-out]'
            onSubmit={handleSubmit}
        >
            <div className='flex flex-col gap-2'>
                <label htmlFor="currency" className='text-lg font-bold'>Currency:</label>

                <select 
                    name="currency" 
                    id="currency"
                    className='border border-slate-300 p-2 w-full text-slate-800'
                    value={data.currency}
                    onChange={handleChange}
                >
                    <option value=""></option>

                    { currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                            { currency.name }
                        </option>
                    ))}
                </select>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="amount" className='text-lg font-bold'>Amount:</label>

                <input 
                    type="number" 
                    name="amount" 
                    id="amount"
                    min={0}
                    onWheel={e => e.target.blur()}
                    value={data.amount}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 outline-slate-500 w-full text-slate-800"
                />
            </div>

            <input 
                type="submit" 
                value={ mode === "deposit" ? "Deposit Funds" : "Withdraw Funds" } 
                disabled={disableBtn}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold mt-3 cursor-pointer disabled:opacity-70 disabled:cursor-default"
            />
        </form>
    )
}
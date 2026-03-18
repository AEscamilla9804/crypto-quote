import { useEffect, useRef, useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"
import { useStore } from "../../store/store";

export default function ActionForm({ coin, mode, setMode }) {
    const [amount, setAmount] = useState("");

    const buyAsset = useStore(state => state.buyAsset);
    const sellAsset = useStore(state => state.sellAsset);

    const disableBtn = amount <= 0;
    const inputRef = useRef(null);

    const { id, name, symbol } = coin;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleChange = e => {
        const value = e.target.value;

        value === "" ? setAmount("") : setAmount(Number(value));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        /** Amount Validation */
        const invalidAmount = amount <= 0 || !Number.isInteger(amount);
        if (invalidAmount) {
            toast.error("Invalid amount")
        }

        /** User Cofirmation */
        const confirm = window.confirm("Are you sure you want to procede?");
        if (!confirm) {
            setAmount(0)
            return
        }

        /** Perform Action */
        const data = { id, name, symbol }
        let result = {}
        
        if (mode === "buy") {
            result = await buyAsset(data, amount);
        } else { 
            result = await sellAsset(id, amount);
        }

        if (result.success) {
            toast.success(result.message);
            setAmount(0);
            setMode(null);
        } else {
            toast.error(result.error);
        }
    }

    return (
        <form
            className='flex flex-col gap-3 mt-3'
            onSubmit={handleSubmit}
        >
            <label htmlFor="amount" className='font-bold'>Amount:</label>

            <div className='flex items-center gap-3'>
                <button
                    type="button"
                    disabled={disableBtn}
                    className="disabled:opacity-30 cursor-pointer"
                    onClick={() => setAmount(prev => Math.max(0, (prev || 0) - 1))}
                >
                    <MinusCircleIcon className="h-10 w-10 md:h-8 md:w-8 text-indigo-800" />
                </button>

                <input 
                    type="number" 
                    name="amount" 
                    id="amount"
                    ref={inputRef}
                    min={0}
                    step={1}
                    onWheel={e => e.target.blur()}
                    value={amount}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 outline-none w-16 text-slate-800"
                />

                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setAmount(prev => prev === "" ? 1 : prev + 1)}
                >
                    <PlusCircleIcon className="h-10 w-10 md:h-8 md:w-8 text-indigo-800" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <input 
                    type="submit" 
                    value={ mode === "buy" ? "Buy Assets" : "Sell Assets" } 
                    disabled={disableBtn}
                    className="w-full p-3 bg-slate-800 hover:bg-slate-700 text-white uppercase font-bold mt-3 cursor-pointer disabled:opacity-70 disabled:cursor-default"
                />

                <button 
                    type="button"
                    className="w-full p-3 bg-red-500 hover:bg-red-600 text-white uppercase font-bold mt-3 cursor-pointer"
                    onClick={() => setMode(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
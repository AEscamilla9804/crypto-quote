import { useMemo } from 'react';
import { useStore } from '../../store/store'
import { formatCurrency, fromUSD } from '../../utils';

export default function FundsBanner() {
    const usdBalance = useStore(state => state.usdBalance);
    const displayCurrency = useStore(state => state.displayCurrency);

    const localizedFunds = useMemo(() => fromUSD(usdBalance, displayCurrency), [usdBalance, displayCurrency]);

    return (
        <p className='font-bold text-xl'>
            Funds: {''}
            <span className='font-normal text-slate-800'>{ formatCurrency(localizedFunds, displayCurrency) }</span>
        </p>
    )
}
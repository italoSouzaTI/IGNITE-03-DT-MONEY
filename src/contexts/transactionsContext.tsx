import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}
interface TransactionsContextType {
    transactions: Transaction[];
}
interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);
export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    async function laodTransactions() {
        const response = await fetch("http://localhost:3000/transactions");
        const data = await response.json();
        console.log("data", data);
        setTransactions(data);
    }
    useEffect(() => {
        laodTransactions();
    }, []);
    return <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>;
}

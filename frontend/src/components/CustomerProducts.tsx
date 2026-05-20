import { useEffect, useState } from "react";
import {
    addCustomerProduct,
    deleteCustomerProduct,
    fetchCustomerProducts,
    type CustomerProduct,
} from "../api/customerProductsApi";

type Props = {
    customerId: number;
};

export default function CustomerProducts({
                                             customerId,
                                         }: Props) {

    const [products, setProducts] =
        useState<CustomerProduct[] | null>(null);

    const [loading, setLoading] = useState(true);

    const [articleNumber, setArticleNumber] =
        useState("");

    const [title, setTitle] =
        useState("");

    const [amount, setAmount] =
        useState(1);

    const [showForm, setShowForm] = useState(false);

    async function loadProducts() {

        setLoading(true);

        try {

            const data =
                await fetchCustomerProducts(customerId);

            setProducts(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        void loadProducts();
    }, []);

    async function handleAddProduct() {

        if (!articleNumber.trim()) {
            return;
        }

        await addCustomerProduct(customerId, {
            articleNumber,
            title,
            amount,
        });

        setArticleNumber("");
        setTitle("");
        setAmount(1);

        await loadProducts();
    }

    async function handleDelete(id: number) {

        await deleteCustomerProduct(id);

        await loadProducts();
    }

    return (
        <div className="rounded-xl bg-slate-100 p-4">

            <h3 className="mb-4 font-semibold">
                Artiklar
            </h3>

            {loading ? (
                <p>Laddar...</p>
            ) : (
                <div className="space-y-2">

                    {products?.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between rounded-lg bg-white p-3"
                        >
                            <div>
                                <p className="font-medium">
                                    {product.articleNumber}
                                </p>

                                <p className="text-sm text-slate-500">
                                    {product.title}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">

                                <p>
                                    {product.amount} st
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        void handleDelete(product.id)
                                    }
                                    className="text-red-500"
                                >
                                    Ta bort
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}

            {products && products.length === 0 && !showForm && (
                <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">

                    <p className="text-sm text-slate-500">
                        Inga artiklar tillagda ännu
                    </p>

                    <button
                        type="button"
                        onClick={() => {

                            setShowForm(true);

                            setArticleNumber("");
                            setTitle("");
                            setAmount(1);
                        }}
                        className="mt-4 rounded-full bg-[#022B4F] px-4 py-2 text-sm font-semibold text-white"
                    >
                        Lägg till artikel
                    </button>

                </div>

            )}

            {products && products.length > 0 && !showForm && (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="mt-4 rounded-full bg-[#022B4F] px-4 py-2 text-sm font-semibold text-white"
                >
                    Lägg till artikel
                </button>
            )}
            {showForm && (
                <div className="mt-6 rounded-xl bg-white p-4">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                        <input
                            placeholder="Artnr"
                            value={articleNumber}
                            onChange={(e) =>
                                setArticleNumber(e.target.value)
                            }
                            className="rounded-lg border p-2"
                        />

                        <input
                            placeholder="Benämning"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="rounded-lg border p-2"
                        />

                        <input
                            type="number"
                            placeholder="Antal"
                            value={amount}
                            onChange={(e) =>
                                setAmount(Number(e.target.value))
                            }
                            className="rounded-lg border p-2"
                        />

                    </div>

                    <div className="mt-4 flex gap-2">

                        <button
                            type="button"
                            onClick={async () => {

                                await handleAddProduct();

                                setShowForm(false);
                            }}
                            className="rounded-full bg-[#022B4F] px-4 py-2 text-white"
                        >
                            Spara artikel
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-full border border-slate-300 px-4 py-2"
                        >
                            Avbryt
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}
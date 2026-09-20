import {useContext, useEffect, useState} from "react";
import NewProductForm from "../components/NewProductForm";

import {
    fetchProducts,
    searchProducts,
    type Product,
} from "../api/productsApi";
import {AuthContext} from "../components/AuthProvider.tsx";

export default function Products() {

    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const authContext = useContext(AuthContext);

    async function fetchData() {

        setLoading(true);

        try {

            if (debouncedQuery.trim()) {

                const data =
                    await searchProducts(
                        debouncedQuery
                    );

                setProducts(data);

            } else {

                const data =
                    await fetchProducts();

                setProducts(data);
            }

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {
        if (authContext?.role === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const [query, setQuery] =
        useState("");

    const [debouncedQuery, setDebouncedQuery] =
        useState("");

    useEffect(() => {

        const timeout = setTimeout(() => {

            setDebouncedQuery(query);

        }, 300);

        return () => clearTimeout(timeout);

    }, [query]);


    useEffect(() => {

        void fetchData();

    }, [debouncedQuery]);

    return (
        <div className="min-h-screen bg-stone-100 px-4 py-8">

            <div className="max-w-6xl mx-auto">

                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-bold">
                            Artiklar
                        </h2>

                        <p className="text-sm text-slate-500">
                            Centralt artikelregister
                        </p>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={() => {

                                setEditingProduct(null);

                                setDrawerOpen(true);
                            }}
                            className="rounded-full bg-[#0A1633] px-5 py-2 text-sm font-semibold text-white hover:bg-[#13224A]"
                        >
                            Ny artikel
                        </button>
                    )}

                </div>

                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <input
                        type="text"
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        placeholder="Sök artikelnummer eller benämning..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-[#99D0B6] focus:ring-2 focus:ring-[#99D0B6]/30"
                    />

                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

                    <div className="grid grid-cols-[1fr_2fr_120px] gap-4 bg-slate-100 px-6 py-3 text-[11px] font-semibold uppercase text-slate-500 border-b border-slate-200">

                        <div>Artikelnummer</div>

                        <div>Benämning</div>

                        <div className="text-right">
                            Åtgärd
                        </div>

                    </div>

                    {loading ? (

                        <div className="px-6 py-10 text-center text-slate-500">
                            Laddar artiklar...
                        </div>

                    ) : (

                        <>
                            <ul className="divide-y divide-slate-200">

                                {products.map((product) => (

                                    <li
                                        key={product.id}
                                        className="grid grid-cols-[1fr_2fr_120px] gap-4 items-center px-6 py-4"
                                    >

                                        <div className="font-medium text-slate-800">
                                            {product.articleNumber}
                                        </div>

                                        <div className="text-slate-700">
                                            {product.title}
                                        </div>

                                        {isAdmin && (
                                            <div className="text-right">

                                                <button
                                                    onClick={() => {

                                                        setEditingProduct(product);

                                                        setDrawerOpen(true);
                                                    }}
                                                    className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                                                >
                                                    Redigera
                                                </button>

                                            </div>
                                        )}

                                    </li>
                                ))}

                            </ul>

                            {products.length === 0 && (
                                <div className="px-6 py-10 text-center text-slate-500">
                                    Inga artiklar hittades.
                                </div>
                            )}
                        </>

                    )}
                </div>

            </div>
            {isAdmin && drawerOpen && (
                <div className="fixed inset-0 z-40 flex">

                    <div
                        onClick={() => setDrawerOpen(false)}
                        className="flex-1 bg-black/30"
                    />

                    <NewProductForm
                        setDrawerOpen={setDrawerOpen}
                        product={editingProduct}
                        onSaved={() => void fetchData()}
                    />

                </div>
            )}
        </div>

    );
}
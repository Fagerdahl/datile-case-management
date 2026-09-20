import { useEffect, useState } from "react";

import {
    createProduct,
    deleteProduct,
    updateProduct,
    type Product,
} from "../api/productsApi";

type Props = {
    setDrawerOpen: (open: boolean) => void;
    product?: Product | null;
    onSaved: () => void;
};

export default function NewProductForm({
                                           setDrawerOpen,
                                           product,
                                           onSaved,
                                       }: Props) {

    const [articleNumber, setArticleNumber] =
        useState("");

    const [title, setTitle] =
        useState("");

    useEffect(() => {

        setArticleNumber(
            product?.articleNumber ?? ""
        );

        setTitle(
            product?.title ?? ""
        );

    }, [product]);

    async function handleSave() {

        if (!articleNumber.trim() ||
            !title.trim()) {
            return;
        }

        try {

            if (product) {

                await updateProduct(
                    product.id,
                    {
                        articleNumber,
                        title,
                    }
                );

            } else {

                await createProduct({
                    articleNumber,
                    title,
                });
            }

            setDrawerOpen(false);

            onSaved();

        } catch (err) {

            console.error(err);
        }
    }

    return (
        <div className="w-[400px] bg-white p-6 shadow-xl">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-lg font-semibold">

                    {product
                        ? "Redigera artikel"
                        : "Ny artikel"}

                </h2>

                <button
                    onClick={() =>
                        setDrawerOpen(false)
                    }
                    className="text-lg text-slate-500 hover:text-slate-800"
                >
                    ✕
                </button>

            </div>

            <div className="space-y-4">

                <div>

                    <label className="text-sm text-slate-600">
                        Artikelnummer
                    </label>

                    <input
                        value={articleNumber}
                        onChange={(e) =>
                            setArticleNumber(
                                e.target.value
                            )
                        }
                        className="mt-1 w-full rounded-full border border-[#d2d2d2] px-3 py-2 text-sm"
                    />

                </div>

                <div>

                    <label className="text-sm text-slate-600">
                        Benämning
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        className="mt-1 w-full rounded-full border border-[#d2d2d2] px-3 py-2 text-sm"
                    />

                </div>

                <button
                    onClick={() =>
                        void handleSave()
                    }
                    className="mt-6 w-full rounded-full bg-[#99D0B6] py-2 font-semibold text-white hover:bg-[#85bfa7]"
                >
                    Spara
                </button>
                {product && (

                    <button
                        onClick={async () => {

                            const confirmed =
                                window.confirm(
                                    "Ta bort artikel?"
                                );

                            if (!confirmed) {
                                return;
                            }

                            try {

                                await deleteProduct(product.id);

                                setDrawerOpen(false);

                                onSaved();

                            } catch (err) {

                                console.error(err);
                            }
                        }}
                        className="w-full rounded-full border border-red-200 py-2 font-semibold text-red-600 hover:bg-red-50"
                    >
                        Ta bort artikel
                    </button>

                )}

            </div>

        </div>
    );
}
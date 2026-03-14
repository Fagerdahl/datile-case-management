import { useState } from "react";
import type { Permissions, Role, User } from "../types/users";
import {apiClient} from "../services/apiClient.ts";

type Password = {
    password: string;
}

const rolePermissions: Record<Role, Permissions> = {
    ADMIN: {
        createErrand: true,
        createReport: true,
        customers: true,
        contacts: true,
        users: true,
        settings: true,
    },
    USER: {
        createErrand: true,
        createReport: true,
        customers: false,
        contacts: true,
        users: false,
        settings: false,
    },
};

const mockUsers: User[] = [
    { id: 1, name: "Jimmy", email: "jimmy@gmail.com", role: "ADMIN" },
    { id: 2, name: "Niklas", email: "niklas@gmail.com", role: "USER" },
    { id: 3, name: "Leo", email: "leo@gmail.com", role: "USER" },
    { id: 4, name: "Ronja", email: "ronja@gmail.com", role: "USER" },
    { id: 5, name: "Viktor", email: "viktor@gmail.com", role: "USER" },
];

export default function Users() {
    const [users] = useState<User[]>(mockUsers);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>("USER");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const Check = ({ value }: { value: boolean }) => (
        <span
            className={`text-2xl font-bold ${
    value ? "text-green-600" : "text-slate-300"
}`}
        >
            {value ? "✓" : "—"}
        </span>
    );

    const RoleBadge = ({ role }: { role: Role }) =>
        role === "ADMIN" ? (
            <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                Admin
            </span>
        ) : (
            <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                User
            </span>
        );

    return (
        <div className="min-h-screen bg-stone-100 relative">

            {/* PAGE CONTENT */}
            <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pt-10">

                {/* HEADER */}
                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold sm:text-2xl">
                            Användare
                        </h1>
                        <p className="text-sm text-slate-500">
                            Hantera användare och deras behörigheter.
                        </p>
                    </div>

                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="rounded-full bg-[#0A1633] px-6 py-2 text-sm font-semibold text-white hover:bg-[#13224A]"
                    >
                        Ny användare
                    </button>
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block rounded-[28px] border border-slate-200 bg-white shadow-sm overflow-hidden">

                    <div className="grid grid-cols-[2fr_repeat(6,1fr)_120px] gap-4 border-b border-slate-200 bg-slate-100 px-6 py-3 text-[11px] font-semibold uppercase text-slate-500">
                        <div>Användare</div>
                        <div>Skapa ärende</div>
                        <div>Skapa rapport</div>
                        <div>Kunder</div>
                        <div>Kontakter</div>
                        <div>Användare</div>
                        <div>Inställningar</div>
                        <div className="text-right">Åtgärd</div>
                    </div>

                    <ul className="divide-y divide-slate-200">
                        {users.map((user) => {
                            const permissions = rolePermissions[user.role];

                            return (
                                <li
                                    key={user.id}
                                    className="grid grid-cols-[2fr_repeat(6,1fr)_120px] gap-4 items-center px-6 py-4"
                                >
                                    <div>
                                        <div className="flex items-center font-medium text-slate-800">
                                            {user.name}
                                            <RoleBadge role={user.role} />
                                        </div>
                                        <div className="text-sm text-slate-500">
                                            {user.email}
                                        </div>
                                    </div>

                                    <Check value={permissions.createErrand} />
                                    <Check value={permissions.createReport} />
                                    <Check value={permissions.customers} />
                                    <Check value={permissions.contacts} />
                                    <Check value={permissions.users} />
                                    <Check value={permissions.settings} />

                                    <div className="text-right">
                                        <button className="rounded-full border px-4 py-1.5 text-sm hover:bg-slate-100">
                                            Redigera
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                </div>


                {/* MOBILE CARDS */}
                <div className="md:hidden space-y-4">
                    {users.map((user) => {
                        const permissions = rolePermissions[user.role];

                        return (
                            <div
                                key={user.id}
                                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-center font-semibold">
                                    {user.name}
                                    <RoleBadge role={user.role} />
                                </div>

                                <div className="mb-3 text-sm text-slate-500">
                                    {user.email}
                                </div>

                                <div className="space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span>Skapa ärende</span>
                                        <Check value={permissions.createErrand} />
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Skapa rapport</span>
                                        <Check value={permissions.createReport} />
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Kunder</span>
                                        <Check value={permissions.customers} />
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Kontakter</span>
                                        <Check value={permissions.contacts} />
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Användare</span>
                                        <Check value={permissions.users} />
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Inställningar</span>
                                        <Check value={permissions.settings} />
                                    </div>

                                </div>

                                <button className="mt-4 w-full rounded-full border py-2 text-sm">
                                    Redigera
                                </button>
                            </div>
                        );
                    })}
                </div>


                {/* ANSVARIGA */}
                <div className="mt-10">

                    <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Ansvariga
                            </h2>
                            <p className="text-sm text-slate-500">
                                Hantera ansvariga för ärenden.
                            </p>
                        </div>

                        <button className="rounded-full bg-[#0A1633] px-5 py-2 text-sm font-semibold text-white hover:bg-[#13224A]">
                            Ny ansvarig
                        </button>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        <ul className="divide-y divide-slate-200">

                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center justify-between px-4 py-4 sm:px-6"
                                >
                                    <span className="font-medium text-slate-800">
                                        {user.name}
                                    </span>

                                    <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-100">
                                        Redigera
                                    </button>
                                </li>
                            ))}

                        </ul>
                    </div>

                </div>

            </div>


            {/* RIGHT DRAWER */}
            {drawerOpen && (
                <div className="fixed inset-0 z-40 flex">

                    {/* BACKDROP */}
                    <div
                        onClick={() => setDrawerOpen(false)}
                        className="flex-1 bg-black/30"
                    />

                    {/* DRAWER */}
                    <div className="w-full sm:w-[380px] bg-white border-l border-slate-200 shadow-xl p-6 overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">
                                Ny användare
                            </h2>

                            <button onClick={() => setDrawerOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                            <div>
                                <label className="text-sm text-slate-600">
                                    Namn
                                </label>
                                <input type={`text`} className="mt-1 w-full rounded-full border border-[#d2d2d2] px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">
                                    E-postadress
                                </label>
                                <input type={`email`} className="mt-1 w-full rounded-full border border-[#d2d2d2] px-3 py-2 text-sm" />
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">
                                    Lösenord
                                </label>


                                <button onClick={() => setShowPassword(!showPassword)} className="ml-10 text-xs text-slate-500 hover:text-slate-700" >
                                    Visa lösenord
                                </button>
                                <div className="mt-1 flex gap-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="flex-1 rounded-full border border-[#d2d2d2] px-3 py-2 text-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        className="rounded-full border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                                        onClick={() => {
                                           async function generatePassword() {
                                               const randomPassword = await apiClient.get<Password>(`/api/users/password`);
                                               setPassword(randomPassword.password)
                                           }
                                           generatePassword();
                                        }}
                                    >
                                        Generera lösenord
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">
                                    Roll
                                </label>

                                <div className="flex gap-2 mt-2">

                                    <button
                                        onClick={() => setSelectedRole("USER")}
                                        className={`px-3 py-1 rounded-full text-sm ${
    selectedRole === "USER"
        ? "bg-slate-900 text-white"
        : "bg-slate-200"
}`}
                                    >
                                        User
                                    </button>

                                    <button
                                        onClick={() => setSelectedRole("ADMIN")}
                                        className={`px-3 py-1 rounded-full text-sm ${
    selectedRole === "ADMIN"
        ? "bg-purple-600 text-white"
        : "bg-purple-100 text-purple-700"
}`}
                                    >
                                        Admin
                                    </button>

                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-full bg-[#99D0B6] py-2 text-white font-semibold">
                                Spara
                            </button>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}

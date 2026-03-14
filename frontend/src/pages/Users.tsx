import { useState } from "react";

type Role = "ADMIN" | "USER";

type Permissions = {
    createErrand: boolean;
    createReport: boolean;
    customers: boolean;
    contacts: boolean;
    users: boolean;
    settings: boolean;
};

type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
};

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
    {
        id: 1,
        name: "Jimmy",
        email: "jimmy@gmail.com",
        role: "ADMIN",
    },
    {
        id: 2,
        name: "Niklas",
        email: "niklas@gmail.com",
        role: "USER",
    },
    {
        id: 3,
        name: "Leo",
        email: "leo@gmail.com",
        role: "USER",
    },
    {
        id: 4,
        name: "Ronja",
        email: "ronja@gmail.com",
        role: "USER",
    },
    {
        id: 5,
        name: "Viktor",
        email: "viktor@gmail.com",
        role: "USER",
    },
];

export default function Users() {
    const [users] = useState<User[]>(mockUsers);

    const Check = ({ value }: { value: boolean }) => (
        <span
            className={`text-2xl font-bold leading-none ${
                value ? "text-green-600" : "text-slate-300"
            }`}
        >
            {value ? "✓" : "—"}
        </span>
    );

    const RoleBadge = ({ role }: { role: Role }) => {
        if (role === "ADMIN") {
            return (
                <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                    Admin
                </span>
            );
        }

        return (
            <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                User
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pb-10 sm:pt-10">

                {/* HEADER */}
                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-xl font-bold sm:text-2xl">
                                Användare
                            </h1>
                            <p className="text-sm text-slate-500">
                                Hantera användare och deras behörigheter.
                            </p>
                        </div>

                        <button className="rounded-full bg-[#0A1633] px-6 py-3 text-sm font-semibold text-white hover:bg-[#13224A]">
                            Ny användare
                        </button>
                    </div>
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
                                    className="grid grid-cols-[2fr_repeat(6,1fr)_120px] items-center gap-4 px-6 py-4"
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
                                <div className="flex items-center mb-1 font-semibold">
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

                {/* RESPONSIBLE USERS */}
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

                        <button className="inline-flex items-center justify-center rounded-full bg-[#0A1633] px-5 py-2 text-sm font-semibold text-white hover:bg-[#13224A]">
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

                                    <button className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 sm:px-4 sm:py-1.5">
                                        Redigera
                                    </button>
                                </li>
                            ))}

                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
import React, { useState } from "react";

export const getStaticProps = async () => {
    return {
        props: {
            BASE_URL: process.env.BASE_URL
        }
    }
}

const Create = ({ BASE_URL }: any) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [result, setResult] = useState<any>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let data = { email, name }

        let res = await fetch(`${BASE_URL}/user`, {
            body: JSON.stringify(data),
            method: "post",
            headers: { "Content-Type": "application/json", },
        })
        const content = await res.json();
        setResult(content);
    };


    return (
        <div className="container mx-auto max-w-sm">
            <h1 className="text-3xl my-4">Add User</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch">

                <input
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
                <br />
                <input
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                />
                <br />
                <button type="submit" className="btn btn-primary"> Add </button>
                <br />
                <br />
                <div className="card shadow-xl bg-base-100">
                    <div className="card-body">
                        <p className="card-title">Result</p>
                        <pre>{JSON.stringify(result, null, 4)}</pre>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create;
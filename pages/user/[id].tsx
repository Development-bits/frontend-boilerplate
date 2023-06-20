import React, { useState } from "react";
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.BASE_URL}/user`);
    const data = await res.json();

    const paths = data.map((userObj: any) => {
        return {
            params: { id: userObj.id.toString() }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id;
    const res = await fetch(`${process.env.BASE_URL}/user/${id}`);
    const data = await res.json();

    return {
        props: {
            user_data: data,
            BASE_URL: process.env.BASE_URL
        }
    }

}

const UserDetails = ({ user_data, BASE_URL }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(user_data?.email || null);
    const [name, setName] = useState(user_data?.name || null);

    const router = useRouter();
    const deleteUser = async (user_id: string): Promise<void> => {

        let res = await fetch(`${BASE_URL}/user/${user_id}`, {
            body: "",
            method: "delete",
            headers: { "Content-Type": "application/json", },
        })
        const content = await res.json();
        console.log(content);
        router.push('/user/view-all')
    };

    const updateUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        let data = { email, name }

        let res = await fetch(`${BASE_URL}/user/${user_data.id}`, {
            body: JSON.stringify(data),
            method: "put",
            headers: { "Content-Type": "application/json", },
        })
        const content = await res.json();
        router.push('/user/view-all')
    };

    return (
        <div >
            <div className="form-control">
                <p><b>Name: </b>{user_data?.name}</p>
                <p><b>Email: </b>{user_data?.email}</p>
                <p><b>Created At: </b>{user_data?.createdAt}</p>
                <p><b>Updated At: </b>{user_data?.updatedAt}</p>
            </div>
            <br />
            <button className="btn btn-danger" onClick={() => { deleteUser(user_data.id) }}> Delete</button>
            <button className="btn btn-info" onClick={() => { setIsOpen(true) }}> Edit</button>

            {isOpen && (
                <div className="container mx-auto max-w-sm">
                    <h1 className="text-3xl my-4">Edit User</h1>
                    <form onSubmit={updateUser} className="flex flex-col gap-4 items-stretch">

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
                        <button type="submit" className="btn btn-primary"> Update </button>
                        <button type="submit" className="btn btn-primary" onClick={() => { setIsOpen(false) }}> Cancel </button>
                    </form>
                </div>
            )}


        </div>
    );
}

export default UserDetails;
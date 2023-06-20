import Link from 'next/link';

export const getServerSideProps = async () => {

    const res = await fetch(`${process.env.BASE_URL}/user`);
    const data = await res.json();

    return {
        props: {
            user_data: data
        }
    }
}

const ViewAll = ({ user_data }: any) => {
    return (
        <div>
            <h1> ViewAll </h1>
            <table className='table'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>View</td>
                    </tr>
                </thead>
                <tbody>
                    {user_data.map((userObj: any) => (
                        <tr key={userObj.id}>
                            <td>{userObj.name}</td>
                            <td>{userObj.email}</td>
                            <td><Link href={`/user/${userObj.id}`} key={userObj.id} className='btn btn-primary'>View</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewAll;
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/">Home</Link>
            </div>
            <Link href="/user/create">Create</Link>
            <br />
            <Link href="/user/view-all">View All</Link>
        </nav >
    )
}

export default Navbar;
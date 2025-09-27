
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-blue-600">HostelLink</a>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/"><a className="hover:text-blue-500">Home</a></Link>
          <Link href="/hostels"><a className="hover:text-blue-500">Hostels</a></Link>
          <Link href="/food"><a className="hover:text-blue-500">Food</a></Link>
          <Link href="/laundry"><a className="hover:text-blue-500">Laundry</a></Link>
          <Link href="/data"><a className="hover:text-blue-500">Data</a></Link>
          <Link href="/list-hostel"><a className="hover:text-blue-500">List Hostel</a></Link>
          <Link href="/about"><a className="hover:text-blue-500">About</a></Link>
          <Link href="/contact"><a className="hover:text-blue-500">Contact</a></Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button will go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

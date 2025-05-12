import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Library Management System</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Welcome to the Library Management System</h2>
          <p className="text-xl mb-8">A comprehensive solution for managing books, users, and transactions</p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/admin/login"
              className="bg-slate-800 hover:bg-slate-700 text-white p-8 rounded-lg shadow-md transition-colors"
            >
              <h3 className="text-2xl font-bold mb-2">Admin Portal</h3>
              <p>Manage books, users, and system settings</p>
            </Link>

            <Link
              href="/user/login"
              className="bg-slate-800 hover:bg-slate-700 text-white p-8 rounded-lg shadow-md transition-colors"
            >
              <h3 className="text-2xl font-bold mb-2">User Portal</h3>
              <p>Search books, manage your cart, and view transactions</p>
            </Link>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Book Management</h4>
                <p>Add, update, and remove books from the library catalog</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">User Management</h4>
                <p>Register new users and manage existing accounts</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Transaction Tracking</h4>
                <p>Track book checkouts and returns with detailed history</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Library Management System</p>
        </div>
      </footer>
    </div>
  )
}

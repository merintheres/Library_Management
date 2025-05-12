"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, LogOut, Search, ShoppingCart, BookMarked, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Types based on your Java model
interface Book {
  bookId: string
  title: string
  author: string
  genre: string
  publicationYear: number
  isAvailable: boolean
}

interface Transaction {
  transactionId: string
  userId: string
  bookId: string
  issueDate: Date
  returnDate?: Date
  status: string
}

export default function UserDashboard() {
  const [books, setBooks] = useState<Book[]>([
    {
      bookId: "B101",
      title: "Harry Potter",
      author: "JK Rowling",
      genre: "Fantasy",
      publicationYear: 1997,
      isAvailable: true,
    },
    {
      bookId: "B102",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publicationYear: 1937,
      isAvailable: true,
    },
    {
      bookId: "B103",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      publicationYear: 1960,
      isAvailable: true,
    },
    {
      bookId: "B104",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      publicationYear: 1949,
      isAvailable: true,
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("all")
  const [cart, setCart] = useState<Book[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser")
    if (!userStr) {
      router.push("/user/login")
      return
    }

    const user = JSON.parse(userStr)
    if (user.isAdmin) {
      router.push("/user/login")
      return
    }

    setCurrentUser(user)

    // In a real implementation, fetch books and user's transactions from your Java backend
    // For demo purposes, we're using the hardcoded books
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const handleSearch = () => {
    // This would connect to your Java backend's search functionality
    // For demo purposes, we'll filter the books array
    if (!searchTerm) return books

    return books.filter((book) => {
      if (searchFilter === "all") {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
      } else if (searchFilter === "title") {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase())
      } else if (searchFilter === "author") {
        return book.author.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
  }

  const addToCart = (book: Book) => {
    if (!book.isAvailable) {
      toast({
        title: "Book unavailable",
        description: "This book is currently borrowed by someone else.",
        variant: "destructive",
      })
      return
    }

    setCart([...cart, book])
    toast({
      title: "Added to cart",
      description: `"${book.title}" has been added to your cart.`,
    })
  }

  const removeFromCart = (bookId: string) => {
    setCart(cart.filter((book) => book.bookId !== bookId))
    toast({
      title: "Removed from cart",
      description: "Book has been removed from your cart.",
    })
  }

  const checkout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add books to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would connect to your Java backend
    // For demo purposes, we'll create transactions and update book availability
    const newTransactions: Transaction[] = cart.map((book) => ({
      transactionId: `T${Math.floor(Math.random() * 10000)}`,
      userId: currentUser.id,
      bookId: book.bookId,
      issueDate: new Date(),
      status: "Issued",
    }))

    setTransactions([...transactions, ...newTransactions])

    // Update book availability
    setBooks(
      books.map((book) =>
        cart.some((cartBook) => cartBook.bookId === book.bookId) ? { ...book, isAvailable: false } : book,
      ),
    )

    setCart([])

    toast({
      title: "Checkout successful",
      description: `You have borrowed ${newTransactions.length} book(s).`,
    })
  }

  const filteredBooks = handleSearch()

  if (!currentUser) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Library Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
            <span>Welcome, {currentUser.name}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">User Dashboard</h2>
          <p className="text-muted-foreground">Search for books, manage your cart, and view your transactions</p>
        </div>

        <Tabs defaultValue="browse">
          <TabsList className="mb-6">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              Browse Books
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              My Cart {cart.length > 0 && `(${cart.length})`}
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              My Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <Card>
              <CardHeader>
                <CardTitle>Library Catalog</CardTitle>
                <CardDescription>Browse and search for books in our collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Search books..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={searchFilter} onValueChange={setSearchFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Search by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <Card key={book.bookId}>
                      <CardContent className="p-6">
                        <div className="flex flex-col h-full">
                          <div className="mb-2">
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${book.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {book.isAvailable ? "Available" : "Borrowed"}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{book.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
                          <div className="text-sm mb-4">
                            <span className="bg-slate-100 px-2 py-1 rounded">{book.genre}</span>
                            <span className="ml-2 text-muted-foreground">{book.publicationYear}</span>
                          </div>
                          <div className="mt-auto">
                            <Button className="w-full" disabled={!book.isAvailable} onClick={() => addToCart(book)}>
                              {book.isAvailable ? "Add to Cart" : "Unavailable"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle>My Cart</CardTitle>
                <CardDescription>Books you've selected to borrow</CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">Browse the library and add books to your cart</p>
                    <Button
                      variant="outline"
                      onClick={() => document.querySelector('[value="browse"]')?.dispatchEvent(new Event("click"))}
                    >
                      Browse Books
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Genre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cart.map((book) => (
                            <tr key={book.bookId}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {book.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Button variant="ghost" size="sm" onClick={() => removeFromCart(book.bookId)}>
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button onClick={checkout}>Checkout ({cart.length} books)</Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>My Transactions</CardTitle>
                <CardDescription>History of your book borrowings</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                    <p className="text-muted-foreground mb-4">Borrow books to see your transaction history</p>
                    <Button
                      variant="outline"
                      onClick={() => document.querySelector('[value="browse"]')?.dispatchEvent(new Event("click"))}
                    >
                      Browse Books
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Book ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Issue Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Return Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <tr key={transaction.transactionId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {transaction.transactionId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.bookId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(transaction.issueDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${transaction.status === "Returned" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Library Management System</p>
        </div>
      </footer>
    </div>
  )
}

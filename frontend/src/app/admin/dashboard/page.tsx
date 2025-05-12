"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, LogOut, PlusCircle, Search, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function AdminDashboard() {
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
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("all")
  const [newBook, setNewBook] = useState<Book>({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    publicationYear: new Date().getFullYear(),
    isAvailable: true,
  })
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in and is admin
    const userStr = localStorage.getItem("currentUser")
    if (!userStr) {
      router.push("/admin/login")
      return
    }

    const user = JSON.parse(userStr)
    if (!user.isAdmin) {
      router.push("/admin/login")
      return
    }

    setCurrentUser(user)

    // In a real implementation, fetch books from your Java backend
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
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      } else if (searchFilter === "title") {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase())
      } else if (searchFilter === "author") {
        return book.author.toLowerCase().includes(searchTerm.toLowerCase())
      } else if (searchFilter === "genre") {
        return book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
  }

  const handleAddBook = () => {
    // In a real implementation, this would connect to your Java backend
    // For demo purposes, we'll add to the books array
    const bookId = `B${100 + books.length + 1}`
    const bookWithId = { ...newBook, bookId }
    setBooks([...books, bookWithId])
    setIsAddDialogOpen(false)
    setNewBook({
      bookId: "",
      title: "",
      author: "",
      genre: "",
      publicationYear: new Date().getFullYear(),
      isAvailable: true,
    })

    toast({
      title: "Book added",
      description: `"${bookWithId.title}" has been added to the library.`,
    })
  }

  const handleEditBook = () => {
    if (!editingBook) return

    // In a real implementation, this would connect to your Java backend
    // For demo purposes, we'll update the books array
    setBooks(books.map((book) => (book.bookId === editingBook.bookId ? editingBook : book)))
    setIsEditDialogOpen(false)
    setEditingBook(null)

    toast({
      title: "Book updated",
      description: `"${editingBook.title}" has been updated.`,
    })
  }

  const handleDeleteBook = () => {
    if (!bookToDelete) return

    // In a real implementation, this would connect to your Java backend
    // For demo purposes, we'll remove from the books array
    const bookTitle = books.find((b) => b.bookId === bookToDelete)?.title
    setBooks(books.filter((book) => book.bookId !== bookToDelete))
    setIsDeleteDialogOpen(false)
    setBookToDelete(null)

    toast({
      title: "Book deleted",
      description: `"${bookTitle}" has been removed from the library.`,
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
            <span>Welcome, {currentUser.name}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add New Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Enter the details of the new book to add to the library.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="genre" className="text-right">
                    Genre
                  </Label>
                  <Input
                    id="genre"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">
                    Year
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    value={newBook.publicationYear}
                    onChange={(e) => setNewBook({ ...newBook, publicationYear: Number.parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddBook}>
                  Add Book
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Book Management</CardTitle>
            <CardDescription>Search, add, update, and delete books in the library</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Books</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
              </TabsList>

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
                      <SelectItem value="genre">Genre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              <TabsContent value="all">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
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
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks.map((book) => (
                        <tr key={book.bookId}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {book.bookId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.publicationYear}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${book.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {book.isAvailable ? "Available" : "Borrowed"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingBook(book)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setBookToDelete(book.bookId)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="available">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
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
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks
                        .filter((book) => book.isAvailable)
                        .map((book) => (
                          <tr key={book.bookId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {book.bookId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {book.publicationYear}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingBook(book)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setBookToDelete(book.bookId)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="borrowed">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
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
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks
                        .filter((book) => !book.isAvailable)
                        .map((book) => (
                          <tr key={book.bookId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {book.bookId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.genre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {book.publicationYear}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingBook(book)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setBookToDelete(book.bookId)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update the details of the selected book.</DialogDescription>
          </DialogHeader>
          {editingBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-author" className="text-right">
                  Author
                </Label>
                <Input
                  id="edit-author"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-genre" className="text-right">
                  Genre
                </Label>
                <Input
                  id="edit-genre"
                  value={editingBook.genre}
                  onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-year" className="text-right">
                  Year
                </Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={editingBook.publicationYear}
                  onChange={(e) => setEditingBook({ ...editingBook, publicationYear: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingBook.isAvailable ? "available" : "borrowed"}
                  onValueChange={(value) => setEditingBook({ ...editingBook, isAvailable: value === "available" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="borrowed">Borrowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditBook}>
              Update Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Book Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Library Management System</p>
        </div>
      </footer>
    </div>
  )
}

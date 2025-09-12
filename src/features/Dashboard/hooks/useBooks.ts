"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  createdAt: string;
}

interface BooksResponse {
  message: string;
  data: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  infor: any;
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [addBookLoading, setAddBookLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<BooksResponse>("/api/books", {
        params: {
          page: pagination?.page,
          limit: pagination?.limit,
        },
      });
      setBooks(response?.data?.data);
      setPagination(response?.data?.pagination);
    } catch (error) {
      message.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (values: {
    title: string;
    author: string;
    genre: string;
  }) => {
    try {
      setAddBookLoading(true);
      await axios.post("/api/books", values);
      message.success("Book added successfully");
      fetchBooks();
    } catch (error) {
      message.error("Failed to add book");
    } finally {
      setAddBookLoading(false);
    }
  };

  const deleteBook = async (id: string) => {
    Modal.confirm({
      title: "Delete Book",
      content: "Are you sure you want to delete this book?",
      onOk: async () => {
        try {
          await axios.delete(`/api/books/${id}`);
          message.success("Book deleted successfully");
          fetchBooks();
        } catch (error) {
          message.error("Failed to delete book");
        }
      },
    });
  };

  const setPage = (page: number) =>
    setPagination((prev) => ({ ...prev, page }));

  return {
    books,
    pagination,
    loading,
    fetchBooks,
    addBook,
    deleteBook,
    setPage,
    addBookLoading,
  };
}

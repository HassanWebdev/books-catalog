"use client";

import { Button, Card, Table, Modal } from "antd";
import { LogOut, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAuthRedirect } from "@/features/Dashboard/hooks/useAuthRedirect";
import { useBooks } from "@/features/Dashboard/hooks/useBooks";
import { useSignOut } from "@/features/Dashboard/hooks/useSignOut";
import AddBookForm from "@/components/AddBookForm";
import "@/styles/custom-antd.css";

export default function DashboardPage() {
  const { session, status } = useAuthRedirect();
  const { books, pagination, loading, addBook, deleteBook, setPage } =
    useBooks();
  const { handleSignOut } = useSignOut();
  const [showAddForm, setShowAddForm] = useState(false);

  const columns = [
    {
      title: "Book",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button
          type="link"
          danger
          icon={<Trash2 size={16} />}
          onClick={() => deleteBook(record?.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div
      className="min-h-screen p-3 sm:p-4 lg:p-6"
      style={{
        background: "linear-gradient(135deg, #8B4513 0%, #D2B48C 30%, #F5E6D3 70%, #FFF8DC 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 lg:mb-10 p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl lg:rounded-2xl shadow-2xl border border-amber-200 gap-4 lg:gap-0">
          <div className="w-full lg:w-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              📚 Book Catalog
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 font-medium">
              Welcome back, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
            <Button
              type="primary"
              icon={<Plus size={18} />}
              onClick={() => setShowAddForm(true)}
              size="large"
              className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-amber-600 to-amber-700 border-none hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              style={{ 
                height: '45px',
                borderRadius: '20px',
                fontFamily: "'Crimson Text', 'Georgia', serif"
              }}
            >
              <span className="hidden sm:inline">Add New Book</span>
              <span className="sm:hidden">Add Book</span>
            </Button>
            <Button
              icon={<LogOut size={18} />}
              onClick={handleSignOut}
              size="large"
              className="px-4 sm:px-6 py-4 sm:py-6 text-base sm:text-lg font-medium bg-white hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-400 text-amber-800 hover:text-amber-900 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              style={{ 
                height: '45px',
                borderRadius: '20px',
                fontFamily: "'Crimson Text', 'Georgia', serif"
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>

        <Card 
          className="shadow-2xl border-0 overflow-hidden"
          style={{
            borderRadius: '15px',
            background: 'linear-gradient(145deg, #FFF8DC 0%, #FFFAF0 50%, #FFF5EE 100%)',
            border: '1px solid #DDD6A7'
          }}
        >
          <div className="p-3 sm:p-4 lg:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              📖 Your Library Collection
              <span className="text-xs sm:text-sm font-normal text-amber-700 bg-amber-100 px-2 sm:px-3 py-1 rounded-full">
                {pagination?.total || 0} books
              </span>
            </h2>
            <div className="overflow-x-auto">
              <Table
                loading={loading}
                dataSource={books}
                columns={columns}
                rowKey="id"
                className="custom-table"
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  fontFamily: "'Crimson Text', 'Georgia', serif"
                }}
                scroll={{ x: 800 }}
                pagination={
                  (pagination?.total || 0) >= 10
                    ? {
                        current: pagination?.page,
                        total: pagination?.total,
                        pageSize: pagination?.limit,
                        onChange: setPage,
                        showSizeChanger: false,
                     
                        showTotal: (total: number, range: [number, number]) =>
                          `📚 Showing ${range[0]}-${range[1]} of ${total} books`,
                        style: {
                          fontSize: 'clamp(14px, 2vw, 16px)',
                          fontFamily: "'Crimson Text', 'Georgia', serif"
                        },
                        responsive: true,
                        showLessItems: true
                      }
                    : false
                }
              />
            </div>
          </div>
        </Card>

        <Modal
          title={
            <span style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#92400e',
              fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
              📚 Add New Book to Your Collection
            </span>
          }
          open={showAddForm}
          onCancel={() => setShowAddForm(false)}
          footer={null}
          style={{
            fontFamily: "'Crimson Text', 'Georgia', serif"
          }}
          className="custom-modal"
        >
          <AddBookForm
            open={showAddForm}
            onCancel={() => setShowAddForm(false)}
            onSubmit={addBook}
          />
        </Modal>
      </div>
    </div>
  );
}

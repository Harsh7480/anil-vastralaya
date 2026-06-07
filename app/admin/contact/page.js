'use client'

import React, { useState, useEffect } from 'react'
import {
  Mail,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  MessageCircle,
  Filter,
  Search,
  AlertCircle,
  Download,
  RefreshCw,
} from 'lucide-react'

export default function ContactSubmissionsPage() {
  const [isClient, setIsClient] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSubject, setFilterSubject] = useState('all')

  const subjects = [
    'General Inquiry',
    'Order Related',
    'Returns & Exchanges',
    'Styling Advice',
    'Feedback',
  ]

  // Load submissions from localStorage on client side only
  useEffect(() => {
    setIsClient(true)
    const savedSubmissions = localStorage.getItem('contactSubmissions')
    if (savedSubmissions) {
      const parsed = JSON.parse(savedSubmissions)
      setSubmissions(parsed)
    } else {
      // Default sample submissions
      const defaultSubmissions = [
        {
          id: 1,
          firstName: 'Aarav',
          lastName: 'Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98765 43210',
          subject: 'General Inquiry',
          message:
            'I am interested in your latest wedding collection. Could you please share more details about the bridal lehengas?',
          status: 'read',
          createdAt: new Date(
            Date.now() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: 2,
          firstName: 'Priya',
          lastName: 'Verma',
          email: 'priya.verma@example.com',
          phone: '+91 87654 32109',
          subject: 'Order Related',
          message:
            "I placed order #AV1234 and haven't received tracking details yet. Please update me on the status.",
          status: 'unread',
          createdAt: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: 3,
          firstName: 'Rohit',
          lastName: 'Singh',
          email: 'rohit.singh@example.com',
          phone: '+91 76543 21098',
          subject: 'Returns & Exchanges',
          message:
            'I received a damaged product. How do I initiate a return? The saree has a small tear on the border.',
          status: 'replied',
          createdAt: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: 4,
          firstName: 'Neha',
          lastName: 'Gupta',
          email: 'neha.gupta@example.com',
          phone: '+91 65432 10987',
          subject: 'Styling Advice',
          message:
            'What accessories would go well with your navy blue banarasi saree? Need suggestions for a wedding function.',
          status: 'unread',
          createdAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: 5,
          firstName: 'Amit',
          lastName: 'Patel',
          email: 'amit.patel@example.com',
          phone: '+91 54321 09876',
          subject: 'Feedback',
          message:
            'Great collection and fast delivery! Really loved the quality of the kurta. Will definitely shop again.',
          status: 'read',
          createdAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ]
      setSubmissions(defaultSubmissions)
      localStorage.setItem(
        'contactSubmissions',
        JSON.stringify(defaultSubmissions),
      )
    }
  }, [])

  // Save submissions to localStorage
  useEffect(() => {
    if (submissions.length > 0 && isClient) {
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
    }
  }, [submissions, isClient])

  const updateSubmissionStatus = (id, status) => {
    const updatedSubmissions = submissions.map((sub) =>
      sub.id === id
        ? { ...sub, status, updatedAt: new Date().toISOString() }
        : sub,
    )
    setSubmissions(updatedSubmissions)
    alert(`Message marked as ${status}!`)
  }

  const deleteSubmission = (id) => {
    const submission = submissions.find((sub) => sub.id === id)
    if (
      confirm(
        `Are you sure you want to delete message from ${submission.firstName} ${submission.lastName}?`,
      )
    ) {
      const updatedSubmissions = submissions.filter((sub) => sub.id !== id)
      setSubmissions(updatedSubmissions)
      alert('Message deleted successfully!')
    }
  }

  const deleteAllSubmissions = () => {
    if (
      confirm(
        'Are you sure you want to delete ALL messages? This action cannot be undone!',
      )
    ) {
      setSubmissions([])
      localStorage.removeItem('contactSubmissions')
      alert('All messages deleted!')
    }
  }

  const viewSubmission = (submission) => {
    setSelectedSubmission(submission)
    setIsViewModalOpen(true)
    if (submission.status === 'unread') {
      updateSubmissionStatus(submission.id, 'read')
    }
  }

  const exportSubmissions = () => {
    const exportData = submissions.map((sub) => ({
      'Full Name': `${sub.firstName} ${sub.lastName}`,
      Email: sub.email,
      Phone: sub.phone,
      Subject: sub.subject,
      Message: sub.message,
      Status: sub.status,
      Date: new Date(sub.createdAt).toLocaleString(),
    }))

    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contact-submissions-${
      new Date().toISOString().split('T')[0]
    }.csv`
    a.click()
    URL.revokeObjectURL(url)
    alert('Export successful!')
  }

  const getStatusBadge = (status) => {
    const badges = {
      unread: 'bg-red-100 text-red-600',
      read: 'bg-blue-100 text-blue-600',
      replied: 'bg-green-100 text-green-600',
    }
    const labels = {
      unread: 'Unread',
      read: 'Read',
      replied: 'Replied',
    }
    return {
      className: badges[status] || 'bg-gray-100 text-gray-600',
      label: labels[status] || status,
    }
  }

  const filteredSubmissions = submissions.filter((sub) => {
    const fullName = `${sub.firstName} ${sub.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus
    const matchesSubject =
      filterSubject === 'all' || sub.subject === filterSubject
    return matchesSearch && matchesStatus && matchesSubject
  })

  const stats = {
    total: submissions.length,
    unread: submissions.filter((s) => s.status === 'unread').length,
    read: submissions.filter((s) => s.status === 'read').length,
    replied: submissions.filter((s) => s.status === 'replied').length,
  }

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Contact Form Submissions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage user inquiries from the contact form
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportSubmissions}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={deleteAllSubmissions}
            className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
            disabled={submissions.length === 0}
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete All</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Messages</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Unread</p>
              <p className="text-3xl font-bold text-red-600">{stats.unread}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Read</p>
              <p className="text-3xl font-bold text-blue-600">{stats.read}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Replied</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.replied}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => {
                const statusBadge = getStatusBadge(submission.status)
                return (
                  <tr
                    key={submission.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => viewSubmission(submission)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {submission.firstName} {submission.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {submission.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          {submission.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {submission.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {submission.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm max-w-md line-clamp-2">
                        {submission.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(submission.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex space-x-2">
                        {submission.status !== 'replied' && (
                          <button
                            onClick={() =>
                              updateSubmissionStatus(submission.id, 'replied')
                            }
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Mark as Replied"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteSubmission(submission.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Messages Found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== 'all' || filterSubject !== 'all'
                ? 'No messages match your filters.'
                : 'No contact form submissions yet.'}
            </p>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {isViewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                Message Details
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">
                      Customer Information
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Name:</span>{' '}
                      {selectedSubmission.firstName}{' '}
                      {selectedSubmission.lastName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{' '}
                      {selectedSubmission.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span>{' '}
                      {selectedSubmission.phone}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">
                      Message Information
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Subject:</span>{' '}
                      {selectedSubmission.subject}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          getStatusBadge(selectedSubmission.status).className
                        }`}
                      >
                        {getStatusBadge(selectedSubmission.status).label}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(selectedSubmission.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Message</h3>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedSubmission.message}
                </p>
              </div>

              {/* Quick Reply Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                  {selectedSubmission.status !== 'replied' && (
                    <button
                      onClick={() => {
                        updateSubmissionStatus(selectedSubmission.id, 'replied')
                        setIsViewModalOpen(false)
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark as Replied</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteSubmission(selectedSubmission.id)
                      setIsViewModalOpen(false)
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

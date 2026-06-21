'use client'

import React, { useState, useEffect } from 'react'
import { fetchAPI } from '@/utils/api'
import { useToast } from '@/context/ToastContext'
import {
  Users,
  Search,
  Trash2,
  Shield,
  User,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import ConfirmModal from '@/components/admin/ConfirmModal'

export default function UsersPage() {
  const toast = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [stats, setStats] = useState({ total: 0, admins: 0, users: 0 })
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' })

  const loadUsers = async () => {
    try {
      const [usersData, statsData] = await Promise.all([
        fetchAPI('/users'),
        fetchAPI('/users/stats'),
      ])
      setUsers(Array.isArray(usersData) ? usersData : usersData.data || [])
      setStats(statsData)
    } catch (err) {
      console.error('Failed to load users:', err)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetchAPI(`/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole }),
      })
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      toast.success('Role updated successfully!')
      loadUsers()
    } catch (err) {
      toast.error('Failed to update role: ' + err.message)
    }
  }

  const deleteUser = async () => {
    try {
      await fetchAPI(`/users/${deleteModal.id}`, { method: 'DELETE' })
      setUsers(users.filter(u => u.id !== deleteModal.id))
      toast.success('User deleted successfully!')
      loadUsers()
    } catch (err) {
      toast.error('Failed to delete user: ' + err.message)
    } finally {
      setDeleteModal({ open: false, id: null, name: '' })
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <p className="text-gray-600 mt-2">Manage registered users and their roles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Admins</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.admins}</p>
            </div>
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Regular Users</p>
              <p className="text-2xl font-bold text-green-600">{stats.users}</p>
            </div>
            <User className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#98635D] to-[#C4A882] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`appearance-none pr-8 pl-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer focus:ring-2 focus:ring-black outline-none ${
                          user.role === 'admin'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                            : 'bg-green-100 text-green-700 border-green-300'
                        }`}
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.role !== 'admin' ? (
                      <button
                        onClick={() => setDeleteModal({ open: true, id: user.id, name: user.name })}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Protected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Users Found</h3>
            <p className="text-gray-500">
              {searchTerm || filterRole !== 'all'
                ? 'No users match your filters.'
                : 'No users have registered yet.'}
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, name: '' })}
        onConfirm={deleteUser}
        title="Delete User"
        message={`Are you sure you want to delete user "${deleteModal.name}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
      />
    </div>
  )
}

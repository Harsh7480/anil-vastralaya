'use client'

import { AlertTriangle, Trash2, Info, CheckCircle } from 'lucide-react'

const typeConfig = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    buttonBg: 'bg-red-500 hover:bg-red-600',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    buttonBg: 'bg-blue-500 hover:bg-blue-600',
  },
  success: {
    icon: CheckCircle,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
  },
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, type = 'danger', confirmText = 'Confirm', cancelText = 'Cancel', loading = false }) {
  if (!isOpen) return null

  const config = typeConfig[type] || typeConfig.danger
  const Icon = config.icon

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in">
        {/* Icon */}
        <div className="flex justify-center pt-8 pb-4">
          <div className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <div className="w-[1px] bg-gray-100" />
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-4 text-sm font-semibold text-white ${config.buttonBg} transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

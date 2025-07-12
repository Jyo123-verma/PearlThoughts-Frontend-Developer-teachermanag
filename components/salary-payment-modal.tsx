"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IndianRupee, CheckCircle, XCircle, Loader2, CreditCard, Building2, User, CalendarDays } from 'lucide-react'
import { addPaymentTransaction, getTeacherSalaryBreakdown, Teacher } from "@/lib/data"

interface SalaryPaymentModalProps {
  open: boolean
  onClose: () => void
  teacher: Teacher
}

export function SalaryPaymentModal({ open, onClose, teacher }: SalaryPaymentModalProps) {
  const [upiId, setUpiId] = useState("")
  const [amount, setAmount] = useState("")
  const [remarks, setRemarks] = useState("")
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failed" | null>(null)
  const [upiIdError, setUpiIdError] = useState<string | null>(null)
  const [salaryBreakdown, setSalaryBreakdown] = useState<any>(null)

  const currentMonth = new Date().toLocaleString("en-US", { month: "long" })
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (open) {
      const breakdown = getTeacherSalaryBreakdown(teacher.id, currentMonth, currentYear)
      setSalaryBreakdown(breakdown)
      if (breakdown) {
        setAmount(breakdown.netPayable.toFixed(2))
        setRemarks(
          `Monthly salary payment for ${teacher.name} (${currentMonth} ${currentYear}). Net Payable: ₹${breakdown.netPayable.toFixed(2)}`
        )
      }
      setUpiId("")
      setPaymentStatus(null)
      setUpiIdError(null)
    }
  }, [open, teacher, currentMonth, currentYear])

  const validateUpiId = (id: string) => {
    const upiRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+$/
    if (!upiRegex.test(id)) {
      setUpiIdError("Invalid UPI ID format (e.g., example@bankname)")
      return false
    }
    setUpiIdError(null)
    return true
  }

  const handleUpiIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpiId(e.target.value)
    if (upiIdError) {
      validateUpiId(e.target.value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUpiId(upiId)) {
      return
    }

    setLoading(true)
    setPaymentStatus(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = Math.random() > 0.2 // 80% chance of success

    if (success) {
      addPaymentTransaction({
        teacherId: teacher.id,
        amount: Number.parseFloat(amount),
        upiId,
        remarks: remarks || undefined,
        status: "success",
      })
      setPaymentStatus("success")
    } else {
      addPaymentTransaction({
        teacherId: teacher.id,
        amount: Number.parseFloat(amount),
        upiId,
        remarks: remarks || undefined,
        status: "failed",
      })
      setPaymentStatus("failed")
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Salary Payment Invoice
          </DialogTitle>
        </DialogHeader>

        {paymentStatus === "success" && (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-16 h-16 text-green-600 mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-700">
              ₹{amount} sent to {upiId} for {teacher.name}'s salary.
            </p>
            <Button onClick={onClose} className="mt-6 bg-green-600 hover:bg-green-700">
              Done
            </Button>
          </div>
        )}

        {paymentStatus === "failed" && (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-red-50 rounded-lg border border-red-200">
            <XCircle className="w-16 h-16 text-red-600 mb-4 animate-shake" />
            <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed!</h3>
            <p className="text-red-700">Please try again or check UPI ID.</p>
            <Button onClick={() => setPaymentStatus(null)} className="mt-6 bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </div>
        )}

        {!paymentStatus && salaryBreakdown && (
          <div className="space-y-6">
            <div className="border-b pb-4 mb-4 border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                Vidyalaya School Management
              </h2>
              <p className="text-sm text-slate-600">123 School Lane, Education City, India</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4 border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Employee Details
                </h3>
                <p className="text-slate-700">
                  <span className="font-medium">Name:</span> {teacher.name}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Staff ID:</span> {teacher.staffId}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Subject:</span> {teacher.subject.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-600" />
                  Payment Period
                </h3>
                <p className="text-slate-700">
                  <span className="font-medium">Month:</span> {salaryBreakdown.month} {salaryBreakdown.year}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Leave Days:</span> {salaryBreakdown.leaveDays} days
                </p>
              </div>
            </div>

            <div className="space-y-2 border-b pb-4 mb-4 border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Salary Breakdown</h3>
              <div className="flex justify-between text-slate-700">
                <span>Base Salary:</span>
                <span className="font-medium">₹{salaryBreakdown.baseSalary.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Monthly Bonus:</span>
                <span className="font-medium text-green-600">
                  + ₹{salaryBreakdown.monthlyBonus.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Leave Deduction:</span>
                <span className="font-medium text-red-600">
                  - ₹{salaryBreakdown.leaveDeduction.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-300 mt-2">
                <span>Net Payable:</span>
                <span>₹{salaryBreakdown.netPayable.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-orange-600" />
                UPI Payment Details
              </h3>
              <div>
                <Label htmlFor="upiId" className="text-sm font-medium text-slate-700">
                  UPI ID *
                </Label>
                <Input
                  id="upiId"
                  value={upiId}
                  onChange={handleUpiIdChange}
                  onBlur={() => validateUpiId(upiId)}
                  required
                  className="mt-1 bg-white border-slate-300"
                  placeholder="e.g., teachername@bank"
                />
                {upiIdError && <p className="text-red-500 text-xs mt-1">{upiIdError}</p>}
              </div>

              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
                  Amount (₹) *
                </Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="pl-10 bg-white border-slate-300"
                    readOnly // Amount is calculated, not manually editable here
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="remarks" className="text-sm font-medium text-slate-700">
                  Remarks (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="mt-1 bg-white border-slate-300"
                  rows={3}
                  placeholder="Add a note for the payment"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="border-slate-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={loading || !!upiIdError || !salaryBreakdown}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Payment...
                    </>
                  ) : (
                    "Send Payment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

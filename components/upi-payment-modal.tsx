"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IndianRupee, CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react"
import { addPaymentTransaction } from "@/lib/data"

interface UpiPaymentModalProps {
  open: boolean
  onClose: () => void
  teacherId: string
  teacherName: string
  salary: number
}

export function UpiPaymentModal({ open, onClose, teacherId, teacherName, salary }: UpiPaymentModalProps) {
  const [upiId, setUpiId] = useState("")
  const [amount, setAmount] = useState(salary.toString())
  const [remarks, setRemarks] = useState(`Monthly salary payment for ${teacherName}`)
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failed" | null>(null)
  const [upiIdError, setUpiIdError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setAmount(salary.toString())
      setRemarks(`Monthly salary payment for ${teacherName}`)
      setUpiId("")
      setPaymentStatus(null)
      setUpiIdError(null)
    }
  }, [open, salary, teacherName])

  const validateUpiId = (id: string) => {
    // Basic UPI ID format validation (e.g., username@bankname)
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
      validateUpiId(e.target.value) // Re-validate on change if there was an error
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
        teacherId,
        amount: Number.parseFloat(amount),
        upiId,
        remarks: remarks || undefined,
        status: "success",
      })
      setPaymentStatus("success")
    } else {
      addPaymentTransaction({
        teacherId,
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
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Pay Salary to {teacherName}
          </DialogTitle>
        </DialogHeader>

        {paymentStatus === "success" && (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-16 h-16 text-green-600 mb-4 animate-bounce" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-700">
              ₹{amount} sent to {upiId}
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

        {!paymentStatus && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                disabled={loading || !!upiIdError}
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
        )}
      </DialogContent>
    </Dialog>
  )
}

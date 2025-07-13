import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { CreditCard, Lock, Check, X } from 'lucide-react'
import { GlassCard } from './UI'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

interface PaymentFormProps {
  amount: number
  description: string
  onSuccess?: (paymentIntent: any) => void
  onError?: (error: string) => void
}

function PaymentForm({ amount, description, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage('')

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setIsProcessing(false)
      return
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (paymentMethodError) {
        setErrorMessage(paymentMethodError.message || 'Payment method creation failed')
        setPaymentStatus('error')
        onError?.(paymentMethodError.message || 'Payment method creation failed')
        setIsProcessing(false)
        return
      }

      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          description,
          payment_method: paymentMethod.id,
        }),
      })

      const { client_secret } = await response.json()

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret)

      if (confirmError) {
        setErrorMessage(confirmError.message || 'Payment confirmation failed')
        setPaymentStatus('error')
        onError?.(confirmError.message || 'Payment confirmation failed')
      } else {
        setPaymentStatus('success')
        onSuccess?.(paymentIntent)
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred')
      setPaymentStatus('error')
      onError?.('An unexpected error occurred')
    }

    setIsProcessing(false)
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ef4444',
      },
    },
  }

  if (paymentStatus === 'success') {
    return (
      <GlassCard className="p-6 md:p-8 text-center">
        <div className="text-green-400 mb-4">
          <Check size={48} className="mx-auto" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Payment Successful!</h3>
        <p className="text-gray-300">Thank you for your payment. You should receive a confirmation email shortly.</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="text-cyan-400" size={24} />
        <h3 className="text-xl md:text-2xl font-bold text-white">Secure Payment</h3>
        <Lock className="text-green-400" size={20} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">{description}</span>
          <span className="text-white font-bold text-xl">${amount.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <CardElement options={cardElementOptions} />
        </div>

        {paymentStatus === 'error' && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            <X size={20} />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
            isProcessing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-cyan-500/50'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center space-x-1">
          <Lock size={12} />
          <span>Secured by Stripe • Your payment information is encrypted</span>
        </p>
      </div>
    </GlassCard>
  )
}

export function StripePayment({ amount, description, onSuccess, onError }: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        amount={amount} 
        description={description} 
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  )
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  description 
}: { 
  isOpen: boolean
  onClose: () => void
  amount: number
  description: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <StripePayment
          amount={amount}
          description={description}
          onSuccess={() => {
            setTimeout(() => onClose(), 2000)
          }}
          onError={(error) => {
            console.error('Payment error:', error)
          }}
        />
      </div>
    </div>
  )
}
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import payments from '../lib/stripe'

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription>()

  useEffect(() => {
    if (!user) return

    // listener for subscription event
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0]
      )
      console.log(subscription)
    })
    // returning the subscription of the user
  }, [user])
  return subscription
}

export default useSubscription

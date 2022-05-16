import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from './firebase'

const payments = getStripePayments(app, {
  productsCollection: 'plans',
  customersCollection: 'customers',
})

// changes made in webhook of stripe web will update firebase collection
const loadCheckout = async (priceId: string) => {
  // navigating to the strip checkout url automatically
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

const goToBillingPortal = async () => {
  const instance = getFunctions(app, 'us-central1')
  // returns a reference to the http url that is used to redirect.
  const functionRef = httpsCallable(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  )

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  }).then(({ data }: any) => {
    window.location.assign(data.url)
  }).catch((error) => console.log(error.message))
}

export { loadCheckout, goToBillingPortal }
export default payments

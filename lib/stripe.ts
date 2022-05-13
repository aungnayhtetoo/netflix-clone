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
        cancel_url: window.location.origin
    }).then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

export {loadCheckout}
export default payments
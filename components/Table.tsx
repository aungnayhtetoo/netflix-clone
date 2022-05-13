import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
interface Props {
  products: Product[]
  selectedPlan: Product | null
}
function Table({ products, selectedPlan }: Props) {
  return (
    <table>
      <thead></thead>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableTitle">Monthly Price</td>
          {products.map(({ prices, id }) => (
            <td
              key={id}
              className={`tableDataFeature ${
                selectedPlan?.id === id ? 'text-[#e50914]' : 'text-[gray]'
              }`}
            >
              {prices[0].currency.toUpperCase()} ${prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableTitle">Video Quality</td>
          {products.map(({ metadata, id }) => (
            <td
              key={id}
              className={`tableDataFeature ${
                selectedPlan?.id === id ? 'text-[#e50914]' : 'text-[gray]'
              }`}
            >
              {metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableTitle">Resolution</td>
          {products.map(({ metadata, id }) => (
            <td
              key={id}
              className={`tableDataFeature ${
                selectedPlan?.id === id ? 'text-[#e50914]' : 'text-[gray]'
              }`}
            >
              {metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map(({ metadata, id }) => (
            <td
              key={id}
              className={`tableDataFeature ${
                selectedPlan?.id === id ? 'text-[#e50914]' : 'text-[gray]'
              }`}
            >
              {metadata.anyDevices === 'true' ? (
                <CheckIcon className=" inline-block h-7 w-7" />
              ) : (
                <XIcon className=" inline-block h-7 w-7" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table

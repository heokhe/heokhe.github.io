import Console from '../../components/Console'
import { evalExpression } from '@hkh12/node-calc'

export default function NodeCalc() {
  return (
    <Console
      evaluate={(input) => {
        try {
          return evalExpression(input)
        } catch (error) {
          return error.message
        }
      }}
    />
  )
}

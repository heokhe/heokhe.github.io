import Console from '../../components/Console'
import unreadable from '@hkh12/unreadable'

export default function Unreadable() {
  return (
    <Console
      evaluate={(input) => {
        try {
          return unreadable(input)
        } catch (error) {
          return error.message
        }
      }}
    />
  )
}

import { useMemo, useState } from 'preact/hooks'

export default function Console({
  evaluate,
}: {
  evaluate: (input: string) => string
}) {
  const [input, setInput] = useState('')
  const output = useMemo(() => evaluate(input), [input])

  return (
    <div class="border-t-neutral-700 border-t mt-3 pt-3 font-mono">
      <div class="flex align-center">
        <div class="text-neutral-500 flex-shrink-0">&gt;</div>
        <input
          type="text"
          class="border-none appearance-none outline-none ml-3 placeholder:text-neutral-500 flex-grow"
          style="font: inherit; background: none"
          placeholder="type here..."
          value={input}
          onChange={(event: Event) =>
            setInput((event.target as HTMLInputElement).value)
          }
        />
      </div>
      <div class="flex align-center mt-2">
        <div class="text-blue-500 flex-shrink-0">&lt;</div>
        <div class="flex-grow ml-3">output appears here</div>
      </div>
    </div>
  )
}

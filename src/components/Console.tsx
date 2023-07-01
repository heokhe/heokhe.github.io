import { useMemo, useState } from 'preact/hooks'

export default function Console({
  evaluate,
}: {
  evaluate: (input: string) => string
}) {
  const [input, setInput] = useState('')
  const output = useMemo(() => evaluate(input), [input])

  return (
    <div class="mt-2 font-mono">
      <div class="align-center flex">
        <div class="flex-shrink-0 text-neutral-500">&gt;</div>
        <input
          type="text"
          class="ml-3 flex-grow appearance-none border-none outline-none placeholder:text-neutral-500"
          style="font: inherit; background: none"
          placeholder="type here..."
          value={input}
          onInput={(event: Event) =>
            setInput((event.target as HTMLInputElement).value)
          }
        />
      </div>
      <div class="align-center mt-2 flex">
        <div class="flex-shrink-0 text-blue-500">&lt;</div>
        <div class="ml-3 flex-grow">{output}</div>
      </div>
    </div>
  )
}

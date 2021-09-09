import unreadable from '@hkh12/unreadable'

const playground = document.querySelector('#unreadable-playground')
const input = playground.querySelector('.input')
const output = playground.querySelector('output')

function update() {
  try {
    output.textContent = unreadable(input.textContent)
  } catch (error) {
    output.textContent = error.message
  }
}

update()
input.addEventListener('input', update)

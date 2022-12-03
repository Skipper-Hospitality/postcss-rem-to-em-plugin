const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

/* Write tests here */

const basicPxInput = `a {
  font-size: 10rem;
  line-height: 10px;
}`

const basicPxOutput = `a {
  font-size: 10em;
  line-height: 10px;
}`

const basicEmInput = `b {
  font-size: 12em;
  line-height: 9rem;
}`

const basicEmOutput = `b {
  font-size: 12em;
  line-height: 9em;
}`

const pxMediaQueryInput = `@media (max-width: 1250px) {
  a {
    font-size: 2rem;
    line-height: 1em;
  }
}`

const pxMediaQueryOutput = `@media (max-width: 1250px) {
  a {
    font-size: 2em;
    line-height: 1em;
  }
}`

const remMediaQueryInput = `@media (max-width: 1250rem) {
  a {
    font-size: 2rem;
    line-height: 1em;
  }
}`

const remMediaQueryOffOutput = `@media (max-width: 1250rem) {
  a {
    font-size: 2em;
    line-height: 1em;
  }
}`

const remMediaQueryOnOutput = `@media (max-width: 1250em) {
  a {
    font-size: 2em;
    line-height: 1em;
  }
}`



it('transforms rem to em and leaves px untouched', async () => {
  await run(basicPxInput, basicPxOutput, { })
})

it('transforms rem to em and leaves em untouched', async () => {
  await run(basicEmInput, basicEmOutput, { })
})

it('transforms rem to em and leaves media px untouched', async () => {
  await run(pxMediaQueryInput, pxMediaQueryOutput, { })
})

it('leaves media rem untouched when "media" option is off and transforms rem to em', async () => {
  await run(remMediaQueryInput, remMediaQueryOffOutput, { transformMediaQuery: false })
})

it('transforms media rem when "media" option is on and transforms rem to em', async () => {
  await run(remMediaQueryInput, remMediaQueryOnOutput, { transformMediaQuery: true })
})

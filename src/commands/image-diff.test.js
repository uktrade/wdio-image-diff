import imageDiff from './image-diff'

describe('Image diff', () => {
  test('Compare baseline image with no difference', async () => {
    const result = await imageDiff('test1')
    expect(result).toEqual(0)
  })
})

import User from 'App/Models/User'
import test from 'japa'

test.group('Users - Unit', () => {
  const testUser = {
    email: 'test-unit@gmail.com',
    password: '123456',
    name: 'Test',
  }
  test('should create a hash password on db', async (assert) => {
    const user = await User.create(testUser)

    assert.notEqual(user.password, testUser.password)
    assert.isTrue(await user.comparePassword(testUser.password))
  })
})

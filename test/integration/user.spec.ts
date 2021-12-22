import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Users - Integration', () => {
  let token = ''
  const testUser = {
    email: 'test@gmail.com',
    password: '123456',
    name: 'Test',
  }
  test('should create a user', async (assert) => {
    await supertest(BASE_URL)
      .post('/user')
      .send(testUser)
      .then((res) => {
        const data = res.body

        assert.equal(res.statusCode, 200)
        assert.exists(data.name)
        assert.equal(data.name, testUser.name)
        assert.exists(data.email)
        assert.equal(data.email, testUser.email)
        assert.exists(data.token.token)
      })
  })
  test('should login user', async (assert) => {
    await supertest(BASE_URL)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password })
      .then((res) => {
        const data = res.body

        assert.exists(data.name)
        assert.equal(data.name, testUser.name)
        assert.exists(data.email)
        assert.equal(data.email, testUser.email)
        token = data.token.token
      })
  })
  test('should get the logged user', async (assert) => {
    await supertest(BASE_URL)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        const data = res.body

        assert.exists(data.name)
        assert.equal(data.name, testUser.name)
        assert.exists(data.email)
        assert.equal(data.email, testUser.email)
      })
  })
})

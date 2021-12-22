import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Github - Integration', (group) => {
  const searchBy = 'wilsonLeonardo'
  let token = ''
  const testUser = {
    email: 'test-github@gmail.com',
    password: '123456',
    name: 'Test',
  }
  group.before(async () => {
    await supertest(BASE_URL)
      .post('/user')
      .send(testUser)
      .then((res) => {
        token = res.body.token.token
      })
  })
  test('should find a user on github', async (assert) => {
    await supertest(BASE_URL)
      .get(`/github/${searchBy}`)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        const data = res.body

        assert.equal(res.statusCode, 200)
        assert.exists(data.username)
        assert.exists(data.name)
        assert.exists(data.repositories)
        assert.isTrue(data.repositories.length > 1)
      })
  })
})

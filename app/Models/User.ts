import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, beforeUpdate } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  @beforeUpdate()
  public static async addHash(user: User) {
    if (user.$dirty.password) {
      const pass = await Hash.make(user.password)
      user.password = pass
    }
  }

  public async comparePassword(password: string) {
    return Hash.verify(this.password, password)
  }
}

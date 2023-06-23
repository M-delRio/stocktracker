import { Body, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ObjectId } from "mongodb"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
// import { IUser } from "./interfaces/user.interface"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(@Body() createUserDto: CreateUserDto) {
    console.log(JSON.stringify(createUserDto))

    const user = new User()
    user.userName = createUserDto.userName
    user.password = createUserDto.password
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    this.usersRepository.save(user)

    // const user = new User()
    // user.userName = createUserDto.userName
    // user.firstName = createUserDto.firstName
    // user.lastName = createUserDto.lastName
    // this.usersRepository.save(user)

    return "User created!"
    // todo return hashed id?
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User | null> {
    const objectId = new ObjectId(id)

    return this.usersRepository.findOneBy({ _id: objectId })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: string): Promise<void> {
    const objectId = new ObjectId(id)

    await this.usersRepository.delete(objectId)
  }
}

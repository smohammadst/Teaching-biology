import { isMongoId } from "class-validator";
import { ICourse } from "../course/model/course.model";
import { SpotPlayerDto } from "./dto/spotplayer.dto";
import { IDataSpotPlayer, ISpotPlayer } from "./model/spotpalyer.model";
import createHttpError from "http-errors";
import { AuthService } from "../auth/auth.service";
import { AuthEnumMethod } from "../auth/enum/method.enum";
import axios from "axios";
import { Model } from "mongoose";

export class SpotPlayerService {
    constructor(
        private spotPlayerRepository = Model<ISpotPlayer>,
        private dataSpotPlayerRepository = Model<IDataSpotPlayer>,
        private courseRepository = Model<ICourse>,
        private authService = new AuthService()
    ) { }

    async requestApiSpotPlayer(spotDto: SpotPlayerDto): Promise<void> {
        const { courseID, userID } = spotDto;
        const findUser = await this.authService.userExist(AuthEnumMethod.id, userID)
        const listCourse = await this.validateCoursesID(courseID);
        if (listCourse) throw createHttpError.NotFound("سبد خرید خالی میباشد")
        let dataForRequest = JSON.stringify({
            "course": listCourse,
            "name": `${findUser.first_name} ${findUser.last_name}`,
            "watermark": {
                "texts": [
                    {
                        "text": findUser.phone
                    }
                ]
            }
        })
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://panel.spotplayer.ir/license/edit/',
            headers: {
                '$API': process.env.API_SPOTPLAYER,
                '$LEVEL': '-1',
                'Content-Type': 'application/json'
            },
            data: dataForRequest
        }
        const { data } = await axios.request(config)
        const { spotPlayer, dataSpotPlayer } = await this.findOrCreateSpotPlayer(userID)
        await dataSpotPlayer.updateOne({
            $set: {
                token: data.token,
                courseID: courseID,
                url: data.url,
                userID: userID,
            }
        });
        await dataSpotPlayer.save();
        await spotPlayer.updateOne({
            $push: {
                spotPlayer: dataSpotPlayer._id
            }
        })
    }

    async findOrCreateSpotPlayer(userID: string): Promise<{ spotPlayer: ISpotPlayer, dataSpotPlayer: IDataSpotPlayer }> {
        const findSpotPlayer: ISpotPlayer = await this.spotPlayerRepository.findOne({ user: userID })
        let createSpotPlayer: ISpotPlayer
        let createDataSpotPlayer: IDataSpotPlayer
        if (!findSpotPlayer) {
            createSpotPlayer = await this.spotPlayerRepository.create({ user: userID })
            createDataSpotPlayer = await this.dataSpotPlayerRepository.create({ idSpotPlayer: createSpotPlayer._id })
        }
        if (createDataSpotPlayer && createSpotPlayer) {
            return { spotPlayer: createSpotPlayer, dataSpotPlayer: createDataSpotPlayer }
        }
        createDataSpotPlayer = await this.dataSpotPlayerRepository.create({ idSpotPlayer: findSpotPlayer._id })
        return { spotPlayer: findSpotPlayer, dataSpotPlayer: createDataSpotPlayer }
    }

    async validateCoursesID(courses: Array<string>): Promise<ICourse[]> {
        let listCourse = []
        for (var i = 0; i < courses.length; i++) {
            if (!isMongoId(courses[i])) delete courses[i]
            const course = await this.courseRepository.findOne({ _id: courses[i] })
            if (course) listCourse.push(course)
        }
        return listCourse
    }

    async getTokenSpotPlayerUser(userID: string): Promise<Array<string>> {
        const spotPlayer = await this.spotPlayerRepository.find({ user: userID }).populate({
            path: "spotPlayer",
            model: "dataspotPlayer",
            select: "token"
        }).exec()
        if (!spotPlayer) throw createHttpError.NotFound("شما دوره ایی خریداری نکرده ایید")
        const tokens: string[] = [];
        for (const player of spotPlayer) {
            const populatedSpotPlayers = player.spotPlayer as unknown as IDataSpotPlayer[];
            for (const sp of populatedSpotPlayers) {
                tokens.push(sp.token);
            }
        }
        return tokens
    }
}
import { DataSpotPlayerModel, IDataSpotPlayer, ISpotPlayer, SpotPlayerModel } from "./model/spotpalyer.model";

class SpotPlayerService {
    constructor(
        private spotPlayerRepository = SpotPlayerModel<ISpotPlayer>,
        private dataSpotPlayerRepository = DataSpotPlayerModel<IDataSpotPlayer>
    ) { }

    async requestApiSpotPlayer() {

    }
}
import Task from './Task';
import { fetchHistoryData } from "../../../api/geo";

class ReviewDuplicatePlacesTask extends Task {
    constructor() {
        super('POSSIBLE_MERGE', 'Review duplicate places', false, 0);
    }

    fetchData({ startDate, endDate }) {
        return fetchHistoryData({ requestFilter: this.id, startDate, endDate });
    }

    fetchDataTiled({tileId}) {
        return fetchHistoryData({requestFilter: this.id, tileId});
    }
}

export default ReviewDuplicatePlacesTask;
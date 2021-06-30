import Task from './Task';
import { fetchHistoryData } from "../../../api/geo";

class ReviewDuplicatePlacesTask extends Task {
    constructor() {
        super('POSSIBLE_MERGE', 'Review closed places', false, 0);
    }

    fetchData({ startDate, endDate }) {
        return fetchHistoryData({ requestFilter: this.id, startDate, endDate });
    }
}

export default ReviewDuplicatePlacesTask;
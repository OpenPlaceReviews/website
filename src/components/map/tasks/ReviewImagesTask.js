import Task from './Task';
import { fetchHistoryData } from "../../../api/geo";

class ReviewImagesTask extends Task {
    constructor() {
        super('REVIEW_IMAGES', 'Review new images', false, 0);
    }

    fetchData({ startDate, endDate }) {
        return fetchHistoryData({ requestFilter: this.id, startDate, endDate });
    }

    fetchDataTiled({tileId}) {
        return fetchHistoryData({requestFilter: this.id, tileId});
    }
}

export default ReviewImagesTask;

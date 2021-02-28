import Task from './Task';
import { fetchHistoryData } from "../../../api/geo";

class ReviewImagesTask extends Task {
    constructor() {
        super('REVIEW_IMAGES', 'Review new images', false, 0);
    }

    fetchData({ date }) {
        let startDate = new Date();
        let endDate = new Date();
        if (date) {
            startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        return fetchHistoryData({ requestFilter: this.id, startDate, endDate });
    }
}

export default ReviewImagesTask;

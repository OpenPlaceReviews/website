import Task from './Task';

class ReviewTripAdvisorTask extends Task {
    constructor() {
        super('REVIEW_TRIPADVISOR', 'Review missing TripAdvisor', false, 0);
    }
}

export default ReviewTripAdvisorTask;
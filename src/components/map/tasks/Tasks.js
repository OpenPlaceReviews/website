import ReviewDuplicatePlacesTask from './ReviewDuplicatePlacesTask';
import ReviewImagesTask from './ReviewImagesTask';
import ReviewTripAdvisorTask from "./ReviewTripAdvisorTask";

const tasks = [new ReviewDuplicatePlacesTask(), new ReviewImagesTask(), new ReviewTripAdvisorTask()];

const getTasks = () => {
    return tasks;
};

const getTaskById = (taskId) => {
    for (let i in tasks) {
        const task = tasks[i];
        if (task.id === taskId) {
            return task;
        }
    }
    return null;
};

export default {
    getTasks,
    getTaskById,
}


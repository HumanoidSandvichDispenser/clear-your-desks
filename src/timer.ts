export default class Timer {
    private timer: number = -1;

    public time: number;

    private initialTime: number;

    private startTime: number;

    constructor(initialTime?: number) {
        this.startTime = new Date().getTime();
        this.time = this.initialTime = initialTime ?? 0;
    }

    public start() {
        this.startTime = new Date().getTime();
        this.initialTime = this.time;
        this.timer = window.setInterval(() => {
            this.time--;
        }, 1000);
    }

    /**
     * Stops the timer.
     * @return the change in time from when the timer started to when the timer
     * stopped.
     */
    public stop(): number {
        window.clearInterval(this.timer);
        this.timer = -1;
        let dt = (new Date().getTime() - this.startTime) / 1000;
        this.time = this.initialTime - dt;
        return dt;
    }
}

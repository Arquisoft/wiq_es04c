class ProgressBar {
    constructor(totalTime) {
      this.totalTime = totalTime;
      this.remainingTime = totalTime;
      this.intervalId = null;
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          clearInterval(this.intervalId);
        }
      }, 1000);
    }
  
    getProgress() {
      return (this.remainingTime / this.totalTime) * 100;
    }
  
    restart() {
      clearInterval(this.intervalId);
      this.remainingTime = this.totalTime;
    }
  }
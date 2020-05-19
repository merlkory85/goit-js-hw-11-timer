class CountdownTimer {
	constructor({ selector, targetDate }) {
		this.timerId = selector;
		this.finalDate = targetDate;
		this.creatingFaceClock();
		this.createTitelDate();
		this.timerStart();
	}

	getTimeRemaining() {
		const time = this.finalDate - Date.now();
		const days = Math.floor(time / (1000 * 60 * 60 * 24));
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((time % (1000 * 60)) / 1000);
		return {
			time,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	creatingFaceClock() {
		const days = document.querySelector('[data-value="days"]');
		const hours = document.querySelector('[data-value="hours"]');
		const minutes = document.querySelector('[data-value="mins"]');
		const seconds = document.querySelector('[data-value="secs"]');

		days.textContent = String(this.getTimeRemaining().days).padStart(2, '0');
		hours.textContent = String(this.getTimeRemaining().hours).padStart(2, '0');
		minutes.textContent = String(this.getTimeRemaining().minutes).padStart(2, '0');
		seconds.textContent = String(this.getTimeRemaining().seconds).padStart(2, '0');
	}

	createTitelDate() {
		const newDiv = document.createElement('h1');
		const titleDate = document.getElementById('timer-1');
		document.body.insertBefore(newDiv, titleDate);

		if (this.finalDate <= new Date()) {
			newDiv.innerHTML = 'Finally, this day has come!!!!';
		} else {
			newDiv.innerHTML = `We are waiting for ${this.finalDate.toDateString()}`;
		}
	}

	timerStart() {
		const deadLine = Date.parse(this.finalDate) <= Date.parse(new Date());

		this.startForTimer = setInterval(() => {
			if (deadLine) {
				clearInterval(this.startForTimer);
				return;
			}
			this.creatingFaceClock();
		}, 1000);
	}
}

const timer = new CountdownTimer({
	selector: '#timer-1',
	targetDate: new Date('1 Sep 2020'),
});

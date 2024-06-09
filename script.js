document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.querySelector('.booking-footer form');
    const bookingConfirmation = document.getElementById('booking-confirmation');
    const bookWithUsSection = document.querySelector('.booking-section');
    const makeAnotherReservationButton = document.getElementById('make-another-reservation');
    const activityFields = document.getElementById('activity-fields');
    const activitiesDropdown = document.getElementById('activities');
    const activityConfirmation = document.getElementById('activities-confirmation');
    const instructorConfirmation = document.getElementById('instructors-confirmation');
    const activityDatesConfirmation = document.getElementById('activity-dates-confirmation');
    const hoursConfirmation = document.getElementById('hours-confirmation');

    activitiesDropdown.addEventListener('change', function () {
        while (activityFields.firstChild) {
            activityFields.removeChild(activityFields.firstChild);
        }

        if (activitiesDropdown.value === 'none') {
            activityFields.style.display = 'none';
        } else {
            activityFields.style.display = 'block';
            const setsCount = activitiesDropdown.value === 'services' ? 3 : activitiesDropdown.value.split('+').length;

            for (let i = 0; i < setsCount; i++) {
                const setId = `activity-set-${i + 1}`;

                const card = document.createElement('div');
                card.classList.add('accordion-item');

                const cardHeader = document.createElement('h2');
                cardHeader.classList.add('accordion-header');
                cardHeader.id = `heading-${setId}`;

                const cardButton = document.createElement('button');
                cardButton.classList.add('accordion-button', 'collapsed');
                cardButton.type = 'button';
                cardButton.dataset.bsToggle = 'collapse';
                cardButton.dataset.bsTarget = `#collapse-${setId}`;
                cardButton.setAttribute('aria-expanded', 'false');
                cardButton.setAttribute('aria-controls', `collapse-${setId}`);
                cardButton.textContent = `Activity Set ${i + 1}`;

                cardHeader.appendChild(cardButton);
                card.appendChild(cardHeader);

                const cardCollapse = document.createElement('div');
                cardCollapse.id = `collapse-${setId}`;
                cardCollapse.classList.add('accordion-collapse', 'collapse');
                cardCollapse.setAttribute('aria-labelledby', `heading-${setId}`);
                cardCollapse.dataset.bsParent = '#activity-fields';

                const cardBody = document.createElement('div');
                cardBody.classList.add('accordion-body');

                const instructorLabel = document.createElement('label');
                instructorLabel.setAttribute('for', `instructors-${setId}`);
                instructorLabel.innerHTML = '<i class="icon">🧑‍🏫</i> <b>Instructor</b>';

                const instructorSelect = document.createElement('select');
                instructorSelect.classList.add('form-select');
                instructorSelect.id = `instructors-${setId}`;
                instructorSelect.innerHTML = `
                    <option value="" selected disabled>Select an instructor</option>
                    <option value="hiking_leaders">Hiking Leaders</option>
                    <option value="v-ball_instruc">Volleyball Instructors</option>
                    <option value="zipline_adven">Zipline Adventure Guides</option>
                    <option value="none">None</option>
                `;

                const dateTimeLabel = document.createElement('label');
                dateTimeLabel.setAttribute('for', `date-time-${setId}`);
                dateTimeLabel.innerHTML = '<i class="icon">⏰</i> <b>Date/Time</b>';

                const dateTimeInput = document.createElement('input');
                dateTimeInput.type = 'datetime-local';
                dateTimeInput.id = `date-time-${setId}`;
                dateTimeInput.classList.add('form-control');

                const groupSizeLabel = document.createElement('label');
                groupSizeLabel.setAttribute('for', `group-size-${setId}`);
                groupSizeLabel.innerHTML = '<i class="icon">👩‍👧‍👦</i> <b>Group Size (max 10)</b>';

                const groupSizeSelect = document.createElement('select');
                groupSizeSelect.classList.add('form-select');
                groupSizeSelect.id = `group-size-${setId}`;
                groupSizeSelect.innerHTML = `
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                `;

                cardBody.appendChild(instructorLabel);
                cardBody.appendChild(instructorSelect);
                cardBody.appendChild(dateTimeLabel);
                cardBody.appendChild(dateTimeInput);
                cardBody.appendChild(groupSizeLabel);
                cardBody.appendChild(groupSizeSelect);

                cardCollapse.appendChild(cardBody);
                card.appendChild(cardCollapse);
                activityFields.appendChild(card);
            }
        }
    });

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve form data
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const campground = document.getElementById('campground').value;
        const activities = document.getElementById('activities').value;
        const bookingNumber = Math.floor(Math.random() * 1000000000); // Generate a random booking number

        // Update confirmation section with form data
        document.getElementById('booking-number').textContent = bookingNumber;
        document.getElementById('confirm-campground').textContent = document.querySelector('#campground option:checked').textContent;

        if (activities === 'none') {
            activityConfirmation.style.display = 'none';
            instructorConfirmation.style.display = 'none';
            activityDatesConfirmation.style.display = 'none';
            hoursConfirmation.style.display = 'none';
        } else {
            document.getElementById('confirm-activities').textContent = activities;
            const selectedInstructors = [];
            const selectedDates = [];
            const selectedTimes = [];
            for (let i = 0; i < activities.split('+').length; i++) {
                const setId = `activity-set-${i + 1}`;
                selectedInstructors.push(document.querySelector(`#instructors-${setId} option:checked`).textContent);
                const dateTime = document.getElementById(`date-time-${setId}`).value.split('T');
                selectedDates.push(dateTime[0]);
                selectedTimes.push(dateTime[1]);
            }
            document.getElementById('confirm-instructors').textContent = selectedInstructors.join(', ');
            document.getElementById('confirm-activity-dates').textContent = selectedDates.join(', ');
            document.getElementById('confirm-hours').textContent = selectedTimes.join(', ');

            activityConfirmation.style.display = 'block';
            instructorConfirmation.style.display = 'block';
            activityDatesConfirmation.style.display = 'block';
            hoursConfirmation.style.display = 'block';
        }

        document.getElementById('confirm-stay-dates').textContent = `From: ${startDate} To: ${endDate}`;

        // Hide "book with us" section and show "booking confirmation" section
        bookWithUsSection.style.display = 'none';
        bookingConfirmation.style.display = 'block';
    });

    makeAnotherReservationButton.addEventListener('click', function () {
        // Hide "booking confirmation" section and show "book with us" section
        bookingConfirmation.style.display = 'none';
        bookWithUsSection.style.display = 'block';
    });

    const links = document.querySelectorAll('header nav ul li a, header nav ul li button a');

    for (const link of links) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    }

    const searchButton = document.getElementById('search-button');
    const campgroundDropdown = document.getElementById('campground-dropdown');
    const activitiesDropdown2 = document.getElementById('activities-dropdown');

    searchButton.addEventListener('click', function () {
        const selectedCampground = campgroundDropdown.value;
        const selectedActivity = activitiesDropdown2.value;

        // Remove previously selected class
        const previouslySelected = document.querySelector('.offerings-grid .card.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }

        if (selectedCampground === 'services' && selectedActivity === 'services') {
            window.scrollTo({
                top: document.getElementById('services').offsetTop,
                behavior: 'smooth'
            });
        } else if (selectedCampground !== 'services') {
            const cards = document.querySelectorAll('.offerings-grid .card');
            cards.forEach(card => {
                if (card.textContent.includes(selectedCampground)) {
                    card.scrollIntoView({ behavior: 'smooth' });
                    card.classList.add('selected');
                }
            });
        } else if (selectedActivity !== 'services') {
            const cards = document.querySelectorAll('.offerings-grid .card');
            cards.forEach(card => {
                if (card.textContent.includes(selectedActivity)) {
                    card.scrollIntoView({ behavior: 'smooth' });
                    card.classList.add('selected');
                }
            });
        }
    });
});

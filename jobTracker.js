
/** My thinking stage of this project <==> Problem Solving Stage of This Project   
 
 * Stage: 1 ==> dashboard calculate
 * Stage: 2 ==> toggle style applied into 3 different buttons tab
 * Stage: 3 ==> hidden all card when clicked others tab 
 * Stage: 4 ==> applied default display on between interview & rejected tab
 * Stage: 5 ==> modified the status
 * Stage: 6 ==> The dashboard is adding 1 each time you click the button
 * Stage: 7 ==> Assigning the same card from one box to another
 * Stage: 8 ==> If there is anything in the list, this function will be called.
 * Stage: 9 ==> re-render the filtered section after replace the job card
 * Stage: 10 ==> update jobs count, calculate the length of clicked filtered section

*/


let interviewList = [];
let rejectedList = [];
let currentStatus = null;

const mainContainer = document.querySelector('main');
const allJobCards = document.getElementById('all-job-cards');

const filterSection = document.getElementById('filtered-section');

let jobsCount = document.getElementById('jobs-count');
jobsCount.textContent = allJobCards.children.length;

let total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectCount = document.getElementById('rejectCount');

// Stage: 1 ==> dashboard calculate

function calculateCount(id) {
    total.textContent = allJobCards.children.length;
    interviewCount.textContent = interviewList.length;
    rejectCount.textContent = rejectedList.length;
}

calculateCount();


function toggleStyle(id) {
    currentStatus = id;

    // Stage: 2 ==> toggle style applied into 3 different buttons tab

    // access 3 different buttons tab
    const allFilterBtn = document.getElementById('all-filter-btn');
    const interviewFilterBtn = document.getElementById('interview-filter-btn');
    const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

    // apply on all tab a common behave
    allFilterBtn.classList.remove('btn-info');
    interviewFilterBtn.classList.remove('btn-info');
    rejectedFilterBtn.classList.remove('btn-info');

    // access the special tab -- clicked button & applied a special behave
    const selected = document.getElementById(id);
    selected.classList.add('btn-info');


    // Stage: 3 ==> hidden all card when clicked others tab 

    if (id === 'interview-filter-btn') {
        allJobCards.classList.add('hidden');
        filterSection.classList.remove('hidden');

        // Stage: 4 ==> applied default display on the interview tab 

        if (interviewList.length === 0) {
            filterSection.innerHTML = '';

            const div = document.createElement('div');
            div.className = 'flex flex-col items-center gap-2';
            div.innerHTML = `
                <img src="./assests/doc-file.png" alt="">
                <h3 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h3>
                <p class="text-[#64748B] text-base font-normal">
                    Check back soon for new job opportunities
                </p>
            `;

            filterSection.appendChild(div);

        } else {
            // Stage: 8 ==> If there is anything in the list, this function will be called.

            filterSection.classList.remove('border', 'py-20', 'rounded-xl');
            renderInterview();


            // Stage: 10 ==> calculate the length of interview filtered section

            // manually
            // jobsCount.innerHTML = `${interviewList.length} of ${total.textContent}`;
            
            // call the packet
            updateJobsCount();

        }

    } else if (id === 'rejected-filter-btn') {
        allJobCards.classList.add('hidden');
        filterSection.classList.remove('hidden');

        // Stage: 4 ==> applied default display on the rejected tab

        if (rejectedList.length === 0) {
            filterSection.innerHTML = '';

            const div = document.createElement('div');
            div.className = 'flex flex-col items-center gap-2';
            div.innerHTML = `
                <img src="./assests/doc-file.png" alt="">
                <h3 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h3>
                <p class="text-[#64748B] text-base font-normal">
                    Check back soon for new job opportunities
                </p>
            `;

            filterSection.appendChild(div);

        } else {
            // Stage: 8 ==> If there is anything in the list, this function will be called.

            filterSection.classList.remove('border', 'py-20', 'rounded-xl');
            renderRejected();


            // Stage: 10 ==> calculate the length of rejected filtered section

            // manually
            // jobsCount.innerHTML = `${rejectedList.length} of ${total.textContent}`;

            // call the packet
            updateJobsCount()
        }

    } else if('all-filter-btn') {
        filterSection.classList.add('hidden');
        allJobCards.classList.remove('hidden');

        // Stage: 10 ==> calculate the length of all filtered section

        // manually 
        // jobsCount.innerHTML = `${total.textContent}`;

        // call the packet 
        updateJobsCount();
    }
}


mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const jobCard = event.target.closest('.job-card');

        const companyName = jobCard.querySelector('.companyName').innerText;
        const position = jobCard.querySelector('.position').innerText;
        const location = jobCard.querySelector('.location').innerText;
        const type = jobCard.querySelector('.type').innerText;
        const salary = jobCard.querySelector('.salary').innerText;
        const description = jobCard.querySelector('.job-description').innerText;

        // Stage: 5 ==> modified the status

        let status = jobCard.querySelector('.job-status');
        status.innerText = 'INTERVIEW';
        status.classList.remove('text-[#002C5C]', 'bg-gray-300', 'w-[150px]', 'w-[110px]', 'bg-red-500');
        status.classList.add('text-white', 'w-[130px]', 'bg-green-500', 'font-medium');

        const jobInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'INTERVIEW',
            description
        }


        // Stage: 6 ==> The dashboard is adding 1 each time you click the button

        const existJobCard = interviewList.find(job => job.companyName === jobInfo.companyName);
        if (!existJobCard) {
            interviewList.push(jobInfo);
        }

        // Stage: 7 ==> Assigning the same card from one box to another
        rejectedList = rejectedList.filter(job => job.companyName !== jobInfo.companyName);


        // Stage: 9 ==> re-render the filtered section after replace the job card 

        if (currentStatus === 'rejected-filter-btn') {
            if (rejectedList.length === 0) {
                filterSection.className = 'mt-5 space-y-5 border border-gray-200 py-20 rounded-xl';
                filterSection.innerHTML = `
                    <div class="flex flex-col items-center gap-2">
                        <img src="./assests/doc-file.png" alt="">
                        <h3 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h3>
                        <p class="text-[#64748B] text-base font-normal">
                            Check back soon for new job opportunities
                        </p>
                    </div>
                `;

                jobsCount.innerHTML = `0 of ${total.textContent}`;

            } else {
                renderRejected();
                
                // jobsCount.innerHTML = `${rejectedList.length} of ${total.textContent}`;
                updateJobsCount();
            }
        }

        calculateCount()

    } else if (event.target.classList.contains('rejected-btn')) {
        const jobCard = event.target.closest('.job-card');

        const companyName = jobCard.querySelector('.companyName').innerText;
        const position = jobCard.querySelector('.position').innerText;
        const location = jobCard.querySelector('.location').innerText;
        const type = jobCard.querySelector('.type').innerText;
        const salary = jobCard.querySelector('.salary').innerText;
        const description = jobCard.querySelector('.job-description').innerText;

        // Stage: 5 ==> modified the status

        let status = jobCard.querySelector('.job-status');
        status.innerText = 'REJECTED';
        status.classList.remove('text-[#002C5C]', 'bg-gray-300', 'w-[150px]', 'w-[130px]', 'bg-green-500');
        status.classList.add('text-white', 'w-[110px]', 'bg-red-500', 'font-medium');

        const jobInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'REJECTED',
            description
        }


        // Stage: 6 ==> The dashboard is adding 1 each time you click the button

        const existJobCard = rejectedList.find(job => job.companyName === jobInfo.companyName);
        if (!existJobCard) {
            rejectedList.push(jobInfo);
        }

        // Stage: 7 ==> Assigning the same card from one box to another
        interviewList = interviewList.filter(job => job.companyName !== jobInfo.companyName);


        // Stage: 9 ==> re-render the filtered section after replace the job card 

        if (currentStatus === 'interview-filter-btn') {
            if (interviewList.length === 0) {
                filterSection.className = 'mt-5 space-y-5 border border-gray-200 py-20 rounded-xl';
                filterSection.innerHTML = `
                    <div class="flex flex-col items-center gap-2">
                        <img src="./assests/doc-file.png" alt="">
                        <h3 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h3>
                        <p class="text-[#64748B] text-base font-normal">
                            Check back soon for new job opportunities
                        </p>
                    </div>
                `;

                jobsCount.innerHTML = `0 of ${total.textContent}`;

            } else {
                renderInterview();

                // jobsCount.innerHTML = `${interviewList.length} of ${total.textContent}`;
                updateJobsCount();
            }
        }

        calculateCount()
    }
});


function renderInterview() {
    filterSection.innerHTML = ''

    for (let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white border border-gray-300 rounded-xl p-5 flex justify-between';
        div.innerHTML = `
            <!-- main part 1 -->
            <div>
                <h3 class="companyName text-xl font-semibold text-[#002C5C]">
                    ${job.companyName}
                </h3>
                <p class="position text-[#64748B] text-base font-medium">
                    ${job.position}
                </p>

                <p class="location-type-salary mt-4 text-[#64748B] text-base font-normal">
                    <span class="location">${job.location}</span>
                    •
                    <span class="type">${job.type}</span>
                    •
                    <span class="salary">${job.salary}</span>
                </p>

                <p class="job-status text-white text-base font-medium bg-green-500 w-[130px] rounded-xl py-2 text-center mt-4">
                    ${job.status}
                </p>
                <p class="job-description mt-3">
                    ${job.description}
                </p>

                <div class="space-x-2 mt-5">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!-- main part 2 -->
            <button class="btn btn-circle text-xl">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = ''

    for (let job of rejectedList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white border border-gray-300 rounded-xl p-5 flex justify-between';
        div.innerHTML = `
            <!-- main part 1 -->
            <div>
                <h3 class="companyName text-xl font-semibold text-[#002C5C]">
                    ${job.companyName}
                </h3>
                <p class="position text-[#64748B] text-base font-medium">
                    ${job.position}
                </p>

                <p class="location-type-salary mt-4 text-[#64748B] text-base font-normal">
                    <span class="location">${job.location}</span>
                    •
                    <span class="type">${job.type}</span>
                    •
                    <span class="salary">${job.salary}</span>
                </p>
                
                <p class="job-status text-white text-base font-medium bg-red-500 w-[110px] rounded-xl py-2 text-center mt-4">
                    ${job.status}
                </p>
                <p class="job-description mt-3">
                    ${job.description}
                </p>

                <div class="space-x-2 mt-5">
                    <button class="interview-btn btn btn-outline btn-success">INTERVIEW</button>
                    <button class="rejected-btn btn btn-outline btn-error">REJECTED</button>
                </div>
            </div>

            <!-- main part 2 -->
            <button class="btn btn-circle text-xl">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        filterSection.appendChild(div);
    }
}

function updateJobsCount() {
    if(currentStatus === 'interview-filter-btn') {
        jobsCount.innerHTML = `${interviewList.length} of ${total.textContent}`;

    } else if(currentStatus === 'rejected-filter-btn') {
        jobsCount.innerHTML = `${rejectedList.length} of ${total.textContent}`;

    } else if('all-filter-btn') {
        jobsCount.innerHTML = `${total.textContent}`;
    }
}
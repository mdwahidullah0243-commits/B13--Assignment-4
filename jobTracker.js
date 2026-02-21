/**Problem Solving of This Project <==> My Stage 
 * Stage: 1 ==> dashboard calculate
 * Stage: 2 ==> toggle style applied into 3 different buttons tab
 * Stage: 3 ==> hidden all card when clicked others tab 
 * Stage: 4 ==> applied default display on between interview & rejected tab
*/


const interviewList = [];
const rejectedList = [];

const mainContainer = document.querySelector('main');
const allJobCards = document.getElementById('all-job-cards');

const filterSection = document.getElementById('filtered-section');


// Stage: 1 ==> dashboard calculate

function calculateCount() {
    const total = document.getElementById('total');
    const interviewCount = document.getElementById('interviewCount');
    const rejectCount = document.getElementById('rejectCount');

    total.textContent = allJobCards.children.length;
    interviewCount.textContent = interviewList.length;
    rejectCount.textContent = rejectedList.length;
}

calculateCount();


function toggleStyle(id) {

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
        }
    } else if (id === 'all-filter-btn') {
        filterSection.classList.add('hidden');
        allJobCards.classList.remove('hidden');
    }
}


// Stage ==>

// mainContainer.addEventListener('click', function(event) {
//     if(event.target.classList.contains('interview-btn')) {
//         console.log('Clicked!');
//     }
// });
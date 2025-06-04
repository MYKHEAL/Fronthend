
// const activity = document.querySelector('#activities-list');
// console.log(activity);

// activity.addEventListener("click", (event) => {
//     const deleteBtn = event.target.textContent;
//     if (deleteBtn === "delete") {
//         const li = event.target.parentElement;
//         activity.removeChild(li);
//     }
//     })


//     const addActivity = document.querySelector("#add-activity");
//     addActivity.addEventListener("submit", (event) => {
//         event.preventDefault();
//     let value = document.querySelector("#add-activity input").value.trim();
//           if(value != ""){
//       const liTag = document.createElement("li");
//         const valueSpan = document.createElement("span");
//         const deleteSpan = document.createElement("span");
//         valueSpan.textContent = value;
//         deleteSpan.textContent = "delete";

//         liTag.appendChild(valueSpan);
//         liTag.appendChild(deleteSpan);
//         activity.appendChild(liTag);


//             valueSpan.classList.add("name");
//         deleteSpan.classList.add("delete");
//           }
//     })


//     const searchBar = document.querySelector("#search-activitiy input");
//     searchBar.addEventListener("keyup", (event) => {
//         const searchValue = event.target.value.toLowerCase();
//         const items = activity.getElementsByTagName("li");
//         Array.from(items).forEach((n) => {
//             const title = none.firstElementChild.textContent;
//             if (title.toLowerCase().includes(searchValue)) {
//                 none.style.display = "block";
//             } else {
//                 none.style.display = "none";
//             }
//         });
//     });



    

    document.addEventListener('DOMContentLoaded', () => {
    const activitiesList = document.querySelector('#activities-list ul');
    const addForm = document.querySelector('#add-activity');
    const searchInput = document.querySelector('#searchInput');
    const viewAllButton = document.querySelector('#viewAllButton');

    // Delete functionality
    activitiesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const li = event.target.parentElement;
            activitiesList.removeChild(li);
        }
    });

    // Add functionality
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = document.querySelector('#addInput').value.trim();
        if (value !== '') {
            const li = document.createElement('li');
            const valueSpan = document.createElement('span');
            const deleteSpan = document.createElement('span');
            valueSpan.textContent = value;
            valueSpan.classList.add('name');
            deleteSpan.textContent = 'delete';
            deleteSpan.classList.add('delete');
            li.appendChild(valueSpan);
            li.appendChild(deleteSpan);
            activitiesList.appendChild(li);
            addForm.reset(); // Clear input
        }
    });

    // Search functionality
    searchInput.addEventListener('keyup', (event) => {
        const searchValue = event.target.value.toLowerCase();
        const items = activitiesList.getElementsByTagName('li');
        Array.from(items).forEach((item) => {
            const title = item.querySelector('.name').textContent.toLowerCase();
            item.style.display = title.includes(searchValue) ? 'flex' : 'none';
        });
    });

    // View all functionality
    viewAllButton.addEventListener('click', () => {
        searchInput.value = ''; // Clear search input
        const items = activitiesList.getElementsByTagName('li');
        Array.from(items).forEach((item) => {
            item.style.display = 'flex';
        });
    });
});

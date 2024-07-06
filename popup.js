document.addEventListener('DOMContentLoaded', function() {
    const saveNewButton = document.getElementById("saveNew");

    // Load existing data from storage
    chrome.storage.sync.get(["formDataList"], (result) => {
        const formDataList = result.formDataList || [];
        populateTable(formDataList);
        updateDivClass(formDataList.length);
    });

    if (saveNewButton) {
        saveNewButton.addEventListener("click", () => {
            const name = document.getElementById("name");
            const city = document.getElementById("city");
            const nin = document.getElementById("nin");
            const nss = document.getElementById("nss");
            const phone = document.getElementById("phone");

            // Check if any field is empty
            const fields = [name, city, nin, nss, phone];
            let isValid = true;

            fields.forEach(field => {
                if (!field.value) {
                    field.style.border = "1px solid #e74c3c";
                    isValid = false;
                } else {
                    field.style.border = "";
                }
            });

            if (isValid) {
                const newEntry = { name: name.value, city: city.value, nin: nin.value, nss: nss.value, phone: phone.value };

                chrome.storage.sync.get(["formDataList"], (result) => {
                    const formDataList = result.formDataList || [];
                    formDataList.push(newEntry);
                    chrome.storage.sync.set({ formDataList: formDataList }, () => {
                        populateTable(formDataList);
                        updateDivClass(formDataList.length);
                        // Clear the input fields
                        fields.forEach(field => field.value = "");
                    });
                });
            }
        });
    }
});

function populateTable(formDataList) {
    const tableBody = document.getElementById("infoTableBody");
    tableBody.innerHTML = ''; // Clear existing rows

    formDataList.forEach((entry, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        const nameSpan = document.createElement("span");
        nameSpan.textContent = entry.city;
        nameCell.appendChild(nameSpan);
        row.appendChild(nameCell);

        const phoneCell = document.createElement("td");
        const phoneSpan = document.createElement("span");
        phoneSpan.textContent = entry.phone;
        phoneCell.appendChild(phoneSpan);
        row.appendChild(phoneCell);

        const selectCell = document.createElement("td");
        const selectButton = document.createElement("button");
        selectButton.innerHTML = `<img src="images/done.svg" alt="Select" width="16" height="16">`;
        selectButton.addEventListener("click", () => {
            selectEntry(entry);
        });
        selectCell.appendChild(selectButton);
        row.appendChild(selectCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<img src="images/delete.svg" alt="Delete" width="16" height="16">`;
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this entry?")) {
                deleteEntry(index);
            }
        });
        deleteCell.appendChild(deleteButton);
        
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

function selectEntry(entry) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "autofill", data: entry }, (response) => {
            console.log("Autofill completed");
        });
    });
}

function deleteEntry(index) {
    chrome.storage.sync.get(["formDataList"], (result) => {
        const formDataList = result.formDataList || [];
        formDataList.splice(index, 1);
        chrome.storage.sync.set({ formDataList: formDataList }, () => {
            populateTable(formDataList);
            updateDivClass(formDataList.length);
        });
    });
}

function updateDivClass(recordCount) {
    const div = document.querySelector('.center');
    if (recordCount > 0) {
        div.classList.add('has-records');
        div.classList.remove('no-records');
    } else {
        div.classList.add('no-records');
        div.classList.remove('has-records');
    }
}
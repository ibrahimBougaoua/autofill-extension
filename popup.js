document.addEventListener('DOMContentLoaded', function() {
    const saveNewButton = document.getElementById("saveNew");

    // Load existing data from storage
    chrome.storage.sync.get(["formDataList"], (result) => {
        const formDataList = result.formDataList || [];
        populateTable(formDataList);
    });

    if (saveNewButton) {
        saveNewButton.addEventListener("click", () => {
            const name = document.getElementById("name").value;
            const city = document.getElementById("city").value;
            const nin = document.getElementById("nin").value;
            const nss = document.getElementById("nss").value;
            const phone = document.getElementById("phone").value;
            const newEntry = { name,city, nin, nss, phone };

            chrome.storage.sync.get(["formDataList"], (result) => {
                const formDataList = result.formDataList || [];
                formDataList.push(newEntry);
                chrome.storage.sync.set({ formDataList: formDataList }, () => {
                    populateTable(formDataList);
                });
            });
        });
    }
});

function populateTable(formDataList) {
    const tableBody = document.getElementById("infoTableBody");
    tableBody.innerHTML = ''; // Clear existing rows

    formDataList.forEach((entry) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = entry.city;
        row.appendChild(nameCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = entry.phone;
        row.appendChild(phoneCell);

        const actionCell = document.createElement("td");
        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.addEventListener("click", () => {
            selectEntry(entry);
        });
        actionCell.appendChild(selectButton);
        row.appendChild(actionCell);

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

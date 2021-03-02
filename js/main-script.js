$(function () {
    // clear local storage on page reload
    localStorage.clear();

    // Button click handlers
    $("#load-locastorage-btn").on("click", function () {
        $.ajax("../data/vaccine_doses.json")
            .then(function (data) {
                saveListToLocalStorage(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    $("#display-list-btn").on("click", function () {
        const listOfKeys = retrieveListFromLocalStorage();
        const listItemsUI = buildUIList(listOfKeys);

        console.log(listItemsUI);

        $("#records-list").empty();
        $("#records-list").append(listItemsUI);
    });

    // click handlers for list item
    $("body").on("click", ".list-item", function (event) {
        const key = $(event.target).text();
        const selectedRecord = JSON.parse(localStorage.getItem(key));

        console.log(selectedRecord);

        let detailsContent = `
            <p>Report date: ${selectedRecord.report_date}</p>
            <p>Previous day doses: ${selectedRecord.previous_day_doses_administered}</p>
            <p>Total doses: ${selectedRecord.total_doses_administered}</p>
            <p>Total doses in fully vaccinated individuals: ${selectedRecord.total_doses_in_fully_vaccinated_individuals}</p>
            <p>Total individuals fully vaccinated: ${selectedRecord.total_individuals_fully_vaccinated}</p>
        `;

        $("#record-details").empty().append(detailsContent);
    });

    function saveListToLocalStorage(listOfRecords) {
        listOfRecords.forEach((record, index) => {
            const covidRecord = new CovidRecord(
                index + 1,
                record.report_date,
                record.previous_day_doses_administered,
                record.total_doses_administered,
                record.total_doses_in_fully_vaccinated_individuals,
                record.total_individuals_fully_vaccinated
            );

            covidRecord.saveToLocalStorage();
        });
    }

    function retrieveListFromLocalStorage() {
        let listOfItems = Object.entries(localStorage);
        listOfItems = listOfItems.map((item) => item[0]);
        return listOfItems;
    }

    function buildUIList(listOfKeys) {
        let lis = "";
        listOfKeys.forEach((key) => {
            lis += `<li class="list-item">${key}</li>`;
        });

        return lis;
    }
});

class CovidRecord {
    constructor(
        id,
        report_date,
        previous_day_doses_administered,
        total_doses_administered,
        total_doses_in_fully_vaccinated_individuals,
        total_individuals_fully_vaccinated
    ) {
        this.id = id;
        this.report_date = report_date;
        this.previous_day_doses_administered = previous_day_doses_administered;
        this.total_doses_administered = total_doses_administered;
        this.total_doses_in_fully_vaccinated_individuals = total_doses_in_fully_vaccinated_individuals;
        this.total_individuals_fully_vaccinated = total_individuals_fully_vaccinated;
    }

    saveToLocalStorage() {
        localStorage.setItem(this.report_date, JSON.stringify(this));
    }
}

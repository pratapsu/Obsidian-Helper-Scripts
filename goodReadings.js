/*
*
* Count the number of readings that are less than 125/85. 
*
*/



function goodReadings() {
	const { DateTime } = dv.luxon
	const begin = DateTime.fromString("Jan 1, 2025", "LLL d, yyyy")
    const end = DateTime.fromString("Dec 31, 2025", "LLL d, yyyy")
	let p = dv.pages('"Health"')
		.filter(q => ((begin <= q.file.ctime) && (q.file.ctime <= end)))

    let numGoodSystolicValues = 0
	let numGoodDiastolicValues = 0;
	p.forEach((page) => {
		if (page.systolic != null) {
			numGoodSystolicValues += (page.systolic.sort((a, b) => a - b)[2] < 125)
		} 
		if (page.diastolic != null) {
			numGoodDiastolicValues += (page.diastolic.sort((a, b) => a - b)[2] < 85)
		} 
	})

    dv.header(6, "Number of good systolic values in 2025: " + numGoodSystolicValues);
    dv.header(6, "Number of good diastolic values in 2025: " + numGoodDiastolicValues);
}

goodReadings()
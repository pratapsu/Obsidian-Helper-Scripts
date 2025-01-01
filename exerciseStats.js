/*
*
* Find the total number of hours you have exercised, in 2024. 
*
*/

function exerciseStats() {
    const { DateTime } = dv.luxon
	const begin = DateTime.fromString("Jan 1, 2025", "LLL d, yyyy")
	const end = DateTime.fromString("Dec 31, 2025", "LLL d, yyyy")
	let p = dv.pages('"Health"')
		.filter(q => ((begin <= q.file.ctime) && (q.file.ctime <= end)))
	let totalMins = 0;
	p.forEach((page, index) => {
		totalMins += parseInt(page.Exercise)
	})
	dv.header(6, "Total hours exercised in 2025: " + Math.floor(totalMins/60))
}


exerciseStats()